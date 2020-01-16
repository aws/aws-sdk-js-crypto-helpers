import { expect } from "chai";
import "mocha";
import { hashTestVectors } from "../src/knownHashes.fixture";
import { RawSha256 } from "../src/RawSha256";

describe("Hash", () => {
  let idx = 0;
  for (const [input, result] of hashTestVectors) {
    it("should match known hash calculations: " + idx++, () => {
      const hash = new RawSha256();
      hash.update(input);
      expect(hash.digest()).to.deep.equal(result);
    });
  }
});
