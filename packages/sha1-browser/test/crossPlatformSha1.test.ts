import { expect } from "chai";
import "mocha";
import { Sha1 } from "../src/crossPlatformSha1";
import { Sha1 as WebCryptoSha1 } from "../src/webCryptoSha1";
import { locateWindow } from "@aws-sdk/util-locate-window";
import * as sinon from "sinon";

import * as webCrypto from "@aws-crypto/supports-web-crypto";
import {convertToBuffer} from "@aws-crypto/util";

describe("Sha1", () => {
  afterEach(() => sinon.restore());

  it("should use the WebCrypto implementation where supported", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(true);

    const sha1 = new Sha1();
    expect((sha1 as any).hash).to.be.instanceof(WebCryptoSha1);
  });

  it("should fall back on the SJCL when WebCrypto is not available", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(false);

    expect(() => new Sha1()).to.throw();
  });

  it("should proxy method calls to underlying implementation", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(true);

    const sha1 = new Sha1();
    const hashMock = {
      update: sinon.fake(),
      digest: sinon.fake(),
    };
    (sha1 as any).hash = hashMock;

    sha1.update("foo", "utf8");
    sinon.assert.calledOnce(hashMock.update);
    expect(hashMock.update.firstCall.args).to.deep.equal([convertToBuffer("foo")]);

    const promise = sha1.digest();
    sinon.assert.calledOnce(hashMock.digest);
  });

  it("hash should be reset when reset is called", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(true);
    const sha1 = new Sha1();
    const hashMock = {
      reset: sinon.fake(),
    };
    (sha1 as any).hash = hashMock;
    sha1.reset();
    sinon.assert.calledOnce(hashMock.reset);
  })
});
