import { expect } from "chai";
import "mocha";
import { Sha1 } from "../src/crossPlatformSha1";
import { Sha1 as Ie11Sha1 } from "../src/ie11Sha1";
import { Sha1 as WebCryptoSha1 } from "../src/webCryptoSha1";
import { locateWindow } from "@aws-sdk/util-locate-window";
import * as sinon from "sinon";

import * as ie11Detection from "@aws-crypto/ie11-detection";
import * as webCrypto from "@aws-crypto/supports-web-crypto";
import {convertToBuffer} from "@aws-crypto/util";

describe("Sha1", () => {
  afterEach(() => sinon.restore());

  it("should use the WebCrypto implementation where supported", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(true);

    const sha1 = new Sha1();
    expect((sha1 as any).hash).to.be.instanceof(WebCryptoSha1);
  });

  it("should use the IE 11 implementation when in IE 11", () => {
    sinon.stub(ie11Detection, "isMsWindow").returns(true);

    // Ensure Ie11Sha1 is able to refer to the symbols guaranteed by a
    // `true` response from `isMsWindow`
    (locateWindow() as any).msCrypto = { subtle: { digest: sinon.fake() } };

    const sha1 = new Sha1();
    expect((sha1 as any).hash).to.be.instanceof(Ie11Sha1);
  });

  it("should prefer the WebCrypto implementation over the IE 11 one", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(true);
    sinon.stub(ie11Detection, "isMsWindow").returns(true);

    const sha1 = new Sha1();
    expect((sha1 as any).hash).to.be.instanceof(WebCryptoSha1);
  });

  it("should fall back on the SJCL when WebCrypto and IE 11 WebCrypto are not available", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(false);
    sinon.stub(ie11Detection, "isMsWindow").returns(false);

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
    sinon.stub(ie11Detection, "isMsWindow").returns(false);
    const sha1 = new Sha1();
    const hashMock = {
      reset: sinon.fake(),
    };
    (sha1 as any).hash = hashMock;
    sha1.reset();
    sinon.assert.calledOnce(hashMock.reset);
  })
});
