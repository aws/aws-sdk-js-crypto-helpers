import { expect } from "chai";
import "mocha";
import * as browser from "../src/";

describe("exported symbols", () => {
  it("should export each implementation as a stable symbol", () => {
    expect(typeof browser.Sha1).to.eql("function");
    expect(typeof browser.WebCryptoSha1).to.eql("function");
  });
});
