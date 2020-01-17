import { expect } from "chai";
import "mocha";
import { Sha256 } from "../src/";
import { Hash } from "@aws-sdk/hash-node";

import * as sinon from "sinon";
import * as crypto from "crypto";

describe("implementation selection", () => {
  before(() => sinon.stub(crypto, "createHash"));
  after(() => sinon.restore());
  it("should use the node implementation when the crypto module is defined", () => {
    const sha256 = new Sha256();
    expect((sha256 as any).hash).to.be.instanceof(Hash);
  });
});
