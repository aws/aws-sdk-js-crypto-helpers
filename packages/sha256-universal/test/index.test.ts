import { expect } from "chai";
import "mocha";
import { Sha256 } from "../src/";
import * as sinon from "sinon";
import { convertToBuffer } from "@aws-crypto/util";

describe("Sha256", () => {
  it("should proxy method calls to underlying implementation", () => {
    const sha256 = new Sha256();
    const hashMock = {
      update: sinon.stub(),
      digest: sinon.stub()
    };
    (sha256 as any).hash = hashMock;

    sha256.update("foo", "utf8");
    sinon.assert.calledOnce(hashMock.update);
    expect(hashMock.update.firstCall.args).to.deep.equal([convertToBuffer("foo")]);

    sha256.digest();
    sinon.assert.calledOnce(hashMock.digest);
  });

  it("hash should be reset when reset is called", () => {
    const sha256 = new Sha256();
    const hashMock = {
      reset: sinon.fake(),
    };
    (sha256 as any).hash = hashMock;
    sha256.reset();
    sinon.assert.calledOnce(hashMock.reset);
  })
});
