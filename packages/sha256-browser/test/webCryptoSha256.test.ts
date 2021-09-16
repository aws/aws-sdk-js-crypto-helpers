import { expect } from "chai";
import "mocha";
import { Sha256 } from "../src/webCryptoSha256";
import {
  EMPTY_DATA_SHA_256,
  SHA_256_HASH,
  SHA_256_HMAC_ALGO,
} from "../src/constants";
import { flushPromises } from "./testUtils.fixture";
import * as sinon from "sinon";

import * as utf8Browser from "@aws-sdk/util-utf8-browser";
import { locateWindow } from "@aws-sdk/util-locate-window";

describe("Sha256", () => {
  beforeEach(() => {
    (locateWindow() as any).crypto = {
      subtle: {
        digest: sinon.stub().resolves(new ArrayBuffer(32)),
        importKey: sinon.stub(),
        sign: sinon.stub().resolves(new ArrayBuffer(32)),
      },
    };

    sinon.stub(utf8Browser, "fromUtf8");
  });

  afterEach(() => sinon.restore());

  it("should create a hash object by default", async () => {
    const sha256 = new Sha256();
    sha256.update(new ArrayBuffer(1));
    await sha256.digest();

    const { digest } = locateWindow().crypto.subtle;
    sinon.assert.calledOnce(digest as sinon.SinonStub);
    const [method, data] = (digest as sinon.SinonStub).firstCall.args;
    expect(method).to.deep.equal(SHA_256_HASH);
    expect(data).to.deep.equal(new Uint8Array(1));
  });

  it("should immediately import a secret as a SubtleCrypto key when supplied", async () => {
    const secret = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);
    const { importKey } = locateWindow().crypto.subtle;

    const sha256 = new Sha256(secret);
    await flushPromises();

    sinon.assert.calledOnce(importKey as sinon.SinonStub);
    const [
      type,
      key,
      algorithm,
      exportable,
      permittedUses,
    ] = (importKey as sinon.SinonStub).firstCall.args;

    expect(type).to.eql("raw");
    expect(key).to.deep.equal(secret);
    expect(algorithm).to.deep.equal(SHA_256_HMAC_ALGO);
    expect(exportable).to.eql(false);
    expect(permittedUses).to.deep.equal(["sign"]);
  });

  it("should import ArrayBufferView secrets", async () => {
    const secret = Uint8Array.from([0xde, 0xad, 0xbe, 0xef]);
    const { importKey } = locateWindow().crypto.subtle;

    const sha256 = new Sha256(secret);
    await flushPromises();

    sinon.assert.calledOnce(importKey as sinon.SinonStub);
    const [_, key] = (importKey as sinon.SinonStub).firstCall.args;

    expect(key).to.deep.equal(secret);
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
    const { importKey } = locateWindow().crypto.subtle;
    (importKey as sinon.SinonStub).rejects("No can do, sir.");

    const sha256 = new Sha256(secret);
    await flushPromises();

    sinon.assert.calledOnce(importKey as sinon.SinonStub);

    await sha256.digest().then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should not call process if empty data is received", async () => {
    const sha256 = new Sha256();

    const { digest } = locateWindow().crypto.subtle;

    await flushPromises();
    sinon.assert.notCalled(digest as sinon.SinonStub);

    sha256.update(new ArrayBuffer(0));
    await flushPromises();
    sinon.assert.notCalled(digest as sinon.SinonStub);
  });

  it("should trap processing errors for vanilla hashes", async () => {
    const sha256 = new Sha256();

    const { digest } = locateWindow().crypto.subtle;
    (digest as sinon.SinonStub).rejects("failure, failure");

    sha256.update(new ArrayBuffer(4));
    await sha256.digest().then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should trap processing errors for hmacs", async () => {
    const { importKey, sign } = locateWindow().crypto.subtle;
    (importKey as sinon.SinonStub).resolves(
      Uint8Array.from([0xde, 0xad, 0xbe, 0xef])
    );
    (sign as sinon.SinonStub).rejects("failure, failure");

    const sha256 = new Sha256(new ArrayBuffer(1));

    sha256.update(new ArrayBuffer(4));
    await sha256.digest().then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should resolve the promise with the value returned by WebCrypto for vanilla hashes", async () => {
    const sha256 = new Sha256();

    const { digest } = locateWindow().crypto.subtle;
    (digest as sinon.SinonStub).resolves(
      Uint8Array.from([0xde, 0xad, 0xbe, 0xef])
    );

    sha256.update(new ArrayBuffer(4));

    expect(await sha256.digest()).to.deep.equal(
      Uint8Array.from([0xde, 0xad, 0xbe, 0xef])
    );
  });

  it("should resolve the promise with the value returned by WebCrypto for hmacs", async () => {
    const { importKey, sign } = locateWindow().crypto.subtle;
    (importKey as sinon.SinonStub).resolves(
      Uint8Array.from([0xde, 0xad, 0xbe, 0xef])
    );
    (sign as sinon.SinonStub).resolves(
      Uint8Array.from([0xde, 0xad, 0xbe, 0xef])
    );

    const sha256 = new Sha256(new ArrayBuffer(1));

    sha256.update(new ArrayBuffer(4));

    expect(await sha256.digest()).to.deep.equal(
      Uint8Array.from([0xde, 0xad, 0xbe, 0xef])
    );
  });

  it("should skip calling WebCrypto if no data was supplied", async () => {
    const sha256 = new Sha256();

    const { digest } = locateWindow().crypto.subtle;
    (digest as sinon.SinonStub).throws(new Error("PANIC"));

    sha256.update(new ArrayBuffer(0));

    expect(await sha256.digest()).to.deep.equal(EMPTY_DATA_SHA_256);
  });
});
