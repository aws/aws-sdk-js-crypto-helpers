import { expect } from "chai";
import "mocha";
import { randomValues } from "../src/";
import * as sinon from "sinon";

import * as ie11Detection from "@aws-crypto/ie11-detection";
import * as webCrypto from "@aws-crypto/supports-web-crypto";
import * as ie11Random from "../src/ie11RandomValues";
import * as webCryptoRandom from "../src/webCryptoRandomValues";
declare var global: any;

describe("implementation selection", () => {
  beforeEach(() => {
    sinon.stub(ie11Random, "randomValues");
    sinon.stub(webCryptoRandom, "randomValues");
    sinon.stub(ie11Detection, "isMsWindow");
    sinon.stub(webCrypto, "supportsWebCrypto");
  });

  afterEach(() => {
    (<sinon.SinonStub>ie11Random.randomValues).restore();
    (<sinon.SinonStub>webCryptoRandom.randomValues).restore();
    // @ts-ignore
    (<sinon.SinonStub>ie11Detection.isMsWindow).restore();
    (<sinon.SinonStub>webCrypto.supportsWebCrypto).restore();
  });

  it("should use WebCrypto when available", async () => {
    (<sinon.SinonStub>webCrypto.supportsWebCrypto).returns(true);

    await randomValues(1);

    sinon.assert.calledOnce(<sinon.SinonStub>webCryptoRandom.randomValues);
    sinon.assert.notCalled(<sinon.SinonStub>ie11Random.randomValues);
  });

  it("should use IE 11 WebCrypto when available", async () => {
    // @ts-ignore
    (<sinon.SinonStub>ie11Detection.isMsWindow).returns(true);

    await randomValues(1);

    sinon.assert.calledOnce(<sinon.SinonStub>ie11Random.randomValues);
    sinon.assert.notCalled(<sinon.SinonStub>webCryptoRandom.randomValues);
  });

  it("should prefer standards-compliant WebCrypto over IE 11 WebCrypto", async () => {
    (<sinon.SinonStub>webCrypto.supportsWebCrypto).returns(true);
    // @ts-ignore
    (<sinon.SinonStub>ie11Detection.isMsWindow).returns(true);

    await randomValues(1);

    sinon.assert.calledOnce(<sinon.SinonStub>webCryptoRandom.randomValues);
    sinon.assert.notCalled(<sinon.SinonStub>ie11Random.randomValues);
  });

  it("should throw if neither WebCrypto nor IE 11 Crypto is available", async () => {
    try {
      await randomValues(1);
    } catch (ex) {
      expect(ex).to.be.instanceof(Error);
    }

    sinon.assert.notCalled(<sinon.SinonStub>webCryptoRandom.randomValues);
    sinon.assert.notCalled(<sinon.SinonStub>ie11Random.randomValues);
  });
});

describe("global detection", () => {
  beforeEach(() => {
    sinon.stub(ie11Random, "randomValues");
    sinon.stub(webCryptoRandom, "randomValues");
    sinon.stub(ie11Detection, "isMsWindow");
    sinon.stub(webCrypto, "supportsWebCrypto");
  });

  afterEach(() => {
    (<sinon.SinonStub>ie11Random.randomValues).restore();
    (<sinon.SinonStub>webCryptoRandom.randomValues).restore();
    // @ts-ignore
    (<sinon.SinonStub>ie11Detection.isMsWindow).restore();
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
      sinon.assert.notCalled(<sinon.SinonStub>ie11Random.randomValues);
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
