import { expect } from "chai";
import "mocha";
import { randomValues } from "../src/";
import * as sinon from "sinon";

import * as webCrypto from "@aws-crypto/supports-web-crypto";
import * as webCryptoRandom from "../src/webCryptoRandomValues";
declare var global: any;

describe("implementation selection", () => {
  beforeEach(() => {
    sinon.stub(webCryptoRandom, "randomValues");
    sinon.stub(webCrypto, "supportsWebCrypto");
  });

  afterEach(() => {
    (<sinon.SinonStub>webCryptoRandom.randomValues).restore();
    // @ts-ignore
    (<sinon.SinonStub>webCrypto.supportsWebCrypto).restore();
  });

  it("should use WebCrypto when available", async () => {
    (<sinon.SinonStub>webCrypto.supportsWebCrypto).returns(true);

    await randomValues(1);

    sinon.assert.calledOnce(<sinon.SinonStub>webCryptoRandom.randomValues);
  });

  it("should throw if WebCrypto is not available", async () => {
    try {
      await randomValues(1);
    } catch (ex) {
      expect(ex).to.be.instanceof(Error);
    }

    sinon.assert.notCalled(<sinon.SinonStub>webCryptoRandom.randomValues);
  });
});

describe("global detection", () => {
  beforeEach(() => {
    sinon.stub(webCryptoRandom, "randomValues");
    sinon.stub(webCrypto, "supportsWebCrypto");
  });

  afterEach(() => {
    (<sinon.SinonStub>webCryptoRandom.randomValues).restore();
    (<sinon.SinonStub>webCrypto.supportsWebCrypto).restore();
  });

  const _window = (global as any).window || {};
  const _self = (global as any).self || {};

  beforeEach(() => {
    (global as any).window = undefined;
    (global as any).self = undefined;
  });

  after(() => {
    (global as any).window = _window;
    (global as any).self = _self;
  });

  it("should throw if neither window nor self is defined", async () => {
    try {
      await randomValues(1);
    } catch (ex) {
      expect(ex).to.be.instanceof(Error);
      sinon.assert.notCalled(<sinon.SinonStub>webCryptoRandom.randomValues);
      return;
    }
    throw new Error("never");
  });

  it("should use `self` if window is not defined", async () => {
    (global as any).self = _self;

    try {
      await randomValues(1);
    } catch {}

    sinon.assert.calledOnce(<sinon.SinonStub>webCrypto.supportsWebCrypto);
    expect(
      (<sinon.SinonStub>webCrypto.supportsWebCrypto).firstCall.args[0]
    ).to.eql(_self);
  });
});
