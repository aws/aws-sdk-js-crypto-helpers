import { expect } from "chai";
import "mocha";
import { Sha256 } from "../src/crossPlatformSha256";
import { Sha256 as Ie11Sha256 } from "../src/ie11Sha256";
import { Sha256 as JsSha256 } from "@aws-crypto/sha256-js";
import { Sha256 as WebCryptoSha256 } from "../src/webCryptoSha256";
import { locateWindow } from "@aws-sdk/util-locate-window";
import * as sinon from "sinon";

import * as ie11Detection from "@aws-crypto/ie11-detection";
import * as webCrypto from "@aws-crypto/supports-web-crypto";
import { convertToBuffer } from "@aws-crypto/util";

describe("Sha256", () => {
  afterEach(() => sinon.restore());

  it("should use the WebCrypto implementation where supported", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(true);

    const sha256 = new Sha256();
    expect((sha256 as any).hash).to.be.instanceof(WebCryptoSha256);
  });

  it("should use the IE 11 implementation when in IE 11", () => {
    sinon.stub(ie11Detection, "isMsWindow").returns(true);

    // Ensure Ie11Sha256 is able to refer to the symbols guaranteed by a
    // `true` response from `isMsWindow`
    (locateWindow() as any).msCrypto = { subtle: { digest: sinon.fake() } };

    const sha256 = new Sha256();
    expect((sha256 as any).hash).to.be.instanceof(Ie11Sha256);
  });

  it("should prefer the WebCrypto implementation over the IE 11 one", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(true);
    sinon.stub(ie11Detection, "isMsWindow").returns(true);

    const sha256 = new Sha256();
    expect((sha256 as any).hash).to.be.instanceof(WebCryptoSha256);
  });

  it("should fall back on the SJCL when WebCrypto and IE 11 WebCrypto are not available", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(false);
    sinon.stub(ie11Detection, "isMsWindow").returns(false);

    const sha256 = new Sha256();
    expect((sha256 as any).hash).to.be.instanceof(JsSha256);
  });

  it("should proxy method calls to underlying implementation", () => {
    const sha256 = new Sha256();
    const hashMock = {
      update: sinon.fake(),
      digest: sinon.fake()
    };
    (sha256 as any).hash = hashMock;

    sha256.update("foo", "utf8");
    sinon.assert.calledOnce(hashMock.update);
    expect(hashMock.update.firstCall.args).to.deep.equal([convertToBuffer("foo")]);

    const promise = sha256.digest();
    sinon.assert.calledOnce(hashMock.digest);
  });

  it("hash should be reset when reset is called", () => {
    sinon.stub(webCrypto, "supportsWebCrypto").returns(true);
    sinon.stub(ie11Detection, "isMsWindow").returns(false);
    const sha256 = new Sha256();
    const hashMock = {
      reset: sinon.fake(),
    };
    (sha256 as any).hash = hashMock;
    sha256.reset();
    sinon.assert.calledOnce(hashMock.reset);
  })
});
