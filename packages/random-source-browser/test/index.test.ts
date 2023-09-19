import { expect } from "chai";
import "mocha";
import { testableRandomValues } from "../src/";
import * as sinon from "sinon";

import * as webCryptoRandom from "../src/webCryptoRandomValues";
declare var global: any;

describe("implementation selection", () => {
    beforeEach(() => {
      sinon.stub(webCryptoRandom, "randomValues");
  });

  afterEach(() => {
    (<sinon.SinonStub>webCryptoRandom.randomValues).restore();
  });

  it("should use WebCrypto when available", async () => {
    const supports = sinon.stub()
    supports.returns(true)

    await testableRandomValues(supports)(1);

    sinon.assert.calledOnce(<sinon.SinonStub>webCryptoRandom.randomValues);
  });

  it("should throw if WebCrypto is not available", async () => {
    const doesNotSupport = sinon.stub()
    doesNotSupport.returns(false)

    try {
      await testableRandomValues(doesNotSupport)(1);
    } catch (ex) {
      expect(ex).to.be.instanceof(Error);
    }

    sinon.assert.notCalled(<sinon.SinonStub>webCryptoRandom.randomValues);
  });
});

describe("global detection", () => {
  beforeEach(() => {
    sinon.stub(webCryptoRandom, "randomValues");
  });

  afterEach(() => {
    (<sinon.SinonStub>webCryptoRandom.randomValues).restore();
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
    const doesNotSupport = sinon.stub()
    doesNotSupport.returns(false)

    try {
      await testableRandomValues(doesNotSupport)(1);
    } catch (ex) {
      expect(ex).to.be.instanceof(Error);
      sinon.assert.notCalled(<sinon.SinonStub>webCryptoRandom.randomValues);
      return;
    }
    throw new Error("never");
  });

  it("should use `self` if window is not defined", async () => {
    (global as any).self = _self;

    const supports = sinon.stub()
    supports.returns(true)

    try {
      await testableRandomValues(supports)(1);
    } catch {}

    sinon.assert.calledOnce(<sinon.SinonStub>supports);
    expect(
      (<sinon.SinonStub>supports).firstCall.args[0]
    ).to.eql(_self);
  });
});
