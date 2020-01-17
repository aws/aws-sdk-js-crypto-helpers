import { expect } from "chai";
import "mocha";
import { Sha256 } from "../src/ie11Sha256";
import { MsWindow } from "@aws-crypto/ie11-detection";
import { SHA_256_HMAC_ALGO } from "../src/constants";
import { flushPromises } from "./testUtils.fixture";
import * as sinon from "sinon";

import * as utf8Browser from "@aws-sdk/util-utf8-browser";
import { locateWindow } from "@aws-sdk/util-locate-window";

describe("Sha256", () => {
  beforeEach(() => {
    const hash = {
      process: sinon.stub(),
      finish: sinon.stub()
    };
    const hmac = {
      process: sinon.stub(),
      finish: sinon.stub()
    };

    (locateWindow() as any).msCrypto = {
      subtle: {
        digest: sinon.stub().returns(hash),
        importKey: sinon.stub(),
        sign: sinon.stub().returns(hmac)
      }
    };

    sinon.stub(utf8Browser, "fromUtf8").returns(new Uint8Array(0));
  });

  afterEach(() => sinon.restore());

  it("should create a hash object by default", () => {
    const sha256 = new Sha256();

    const { digest } = (locateWindow() as any).msCrypto.subtle;
    sinon.assert.calledOnce(digest);
    expect((<sinon.SinonStub>digest).firstCall.args).to.deep.equal(["SHA-256"]);
  });

  it("should immediately import a secret as a SubtleCrypto key when supplied", async () => {
    const secret = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);
    const { importKey } = (locateWindow() as MsWindow).msCrypto.subtle;

    const sha256 = new Sha256(secret);
    await flushPromises();

    sinon.assert.calledOnce(importKey as sinon.SinonStub);
    const [
      type,
      key,
      algorithm,
      exportable,
      permittedUses
    ] = (importKey as sinon.SinonStub).firstCall.args;

    expect(type).to.eql("raw");
    expect(key).to.deep.equal(secret);
    expect(algorithm).to.deep.equal(SHA_256_HMAC_ALGO);
    expect(exportable).to.eql(false);
    expect(permittedUses).to.deep.equal(["sign"]);
  });

  it("should import ArrayBuffer secrets", async () => {
    const secret = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);
    const { importKey } = (locateWindow() as MsWindow).msCrypto.subtle;

    const sha256 = new Sha256(secret.buffer);
    await flushPromises();

    sinon.assert.calledOnce(importKey as sinon.SinonStub);
    const [_, key] = (importKey as sinon.SinonStub).firstCall.args;

    expect(key).to.deep.equal(secret);
  });

  it("should import string secrets via the browser UTF-8 decoder", async () => {
    const sha256 = new Sha256("secret");
    await flushPromises();
    sinon.assert.calledOnce(<sinon.SinonStub>utf8Browser.fromUtf8);
  });

  it("should trap UTF-8 errors", async () => {
    const sha256 = new Sha256("secret");
    await flushPromises();

    await sha256.digest().then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should trap key import errors", async () => {
    const secret = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);
    const keyOperation = {} as any;
    const { importKey } = (locateWindow() as MsWindow).msCrypto.subtle;
    (importKey as sinon.SinonStub).returns(keyOperation);

    const sha256 = new Sha256(secret);
    await flushPromises();

    sinon.assert.calledOnce(importKey as sinon.SinonStub);
    keyOperation.onerror();

    await sha256.digest().then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should trap errors where the key neither imports nor invokes an error handler", async () => {
    const secret = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]).buffer;
    const keyOperation = {} as any;
    const { importKey } = (locateWindow() as MsWindow).msCrypto.subtle;
    (importKey as sinon.SinonStub).returns(keyOperation);

    const sha256 = new Sha256(secret);
    await flushPromises();

    sinon.assert.calledOnce(importKey as sinon.SinonStub);
    keyOperation.oncomplete();

    await sha256.digest().then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should not create a signing operation until the key has been imported", async () => {
    const secret = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);
    const keyOperation = {} as any;
    const { importKey, sign } = (locateWindow() as MsWindow).msCrypto.subtle;
    (importKey as sinon.SinonStub).returns(keyOperation);

    const sha256 = new Sha256(secret);
    await flushPromises();

    sinon.assert.calledOnce(importKey as sinon.SinonStub);
    sinon.assert.notCalled(sign as sinon.SinonStub);

    keyOperation.result = "KEY";
    keyOperation.oncomplete();
    await flushPromises();

    sinon.assert.calledOnce(sign as sinon.SinonStub);
    const [_, key] = (sign as sinon.SinonStub).lastCall.args;

    expect(key).to.eql("KEY");
  });

  it("should not process any data until the key has been imported", async () => {
    const secret = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);
    const keyOperation = {} as any;
    const { importKey, sign } = (locateWindow() as MsWindow).msCrypto.subtle;
    (importKey as sinon.SinonStub).returns(keyOperation);

    const sha256 = new Sha256(secret);
    await flushPromises();

    sinon.assert.calledOnce(importKey as sinon.SinonStub);
    sinon.assert.notCalled(sign as sinon.SinonStub);

    sha256.update(secret);

    sinon.assert.notCalled(sign as sinon.SinonStub);
    keyOperation.result = "KEY";
    keyOperation.oncomplete();
    const { process } = (sign as any)();
    sinon.assert.notCalled(process as sinon.SinonStub);

    await flushPromises();

    sinon.assert.calledOnce(process as sinon.SinonStub);
  });

  it("should not call process if empty data is received", async () => {
    const sha256 = new Sha256();

    const { digest } = (locateWindow() as any).msCrypto.subtle;
    const { process } = digest();

    await flushPromises();

    sinon.assert.notCalled(process as sinon.SinonStub);

    sha256.update(new ArrayBuffer(0));
    await flushPromises();
    sinon.assert.notCalled(process as sinon.SinonStub);
  });

  it("should trap processing errors", async () => {
    const sha256 = new Sha256();

    const { digest } = (locateWindow() as any).msCrypto.subtle;
    const operation = digest();

    sha256.update(new ArrayBuffer(4));
    await flushPromises();
    operation.onerror();

    await sha256.digest().then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should trap finalization errors", async () => {
    const sha256 = new Sha256();

    const { digest } = (locateWindow() as any).msCrypto.subtle;
    const operation = digest();

    sha256.update(new ArrayBuffer(4));
    const promise = sha256.digest();
    await flushPromises();
    operation.onerror();

    await promise.then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should trap errors when no result is available nor any error handler invoked", async () => {
    const sha256 = new Sha256();

    const { digest } = (locateWindow() as any).msCrypto.subtle;
    const operation = digest();

    sha256.update(new ArrayBuffer(4));
    const promise = sha256.digest();
    await flushPromises();
    operation.oncomplete();

    await promise.then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should resolve the promise with the value returned by WebCrypto", async () => {
    const sha256 = new Sha256();

    const { digest } = (locateWindow() as any).msCrypto.subtle;
    const operation = digest();

    sha256.update(new ArrayBuffer(4));
    const promise = sha256.digest();
    await flushPromises();
    const result = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);
    operation.result = result.buffer;
    operation.oncomplete();

    const test = await promise;
    expect(test).to.deep.equal(result);
  });
});
