import { expect } from "chai";
import "mocha";
import { Sha256 } from "../src/jsSha256";
import { RawSha256 } from "../src/RawSha256";
import { hashTestVectors, hmacTestVectors } from "../src/knownHashes.fixture";
import * as sinon from "sinon";

describe("Sha256", () => {
  it("should create an instance of RawSha256 by default", () => {
    const sha256 = new Sha256();
    expect((sha256 as any).hash).to.be.instanceof(RawSha256);
  });

  it("should create an outer hash if a secret is present", () => {
    const sha256 = new Sha256("foo");
    expect((sha256 as any).hash).to.be.instanceof(RawSha256);
    expect((sha256 as any).outer).to.be.instanceof(RawSha256);
  });

  it("should accept ArrayBufferView secrets", () => {
    const sha256 = new Sha256(Uint8Array.from([0xde, 0xad]));
  });

  it("should accept ArrayBuffer secrets", () => {
    const sha256 = new Sha256(Uint8Array.from([0xde, 0xad]).buffer);
  });

  it("should call update when given data", () => {
    const sha256 = new Sha256();
    const spy = sinon.spy((sha256 as any).hash, "update");

    sha256.update("data");
    sinon.assert.calledOnce(spy);
  });

  it("should not call update when given empty data", () => {
    const sha256 = new Sha256();
    const spy = sinon.spy((sha256 as any).hash, "update");

    sha256.update(new ArrayBuffer(0));
    sinon.assert.notCalled(spy);
  });

  it("should trap update errors", async () => {
    const sha256 = new Sha256();
    sinon.stub((sha256 as any).hash, "update").throws(new Error("PANIC"));

    sha256.update("foo");

    await sha256.digest().then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  it("should trap finalization errors", async () => {
    const sha256 = new Sha256();
    sinon.stub((sha256 as any).hash, "digest").throws(new Error("PANIC"));

    await sha256.digest().then(
      () => {
        throw new Error("The promise should have been rejected.");
      },
      () => {
        /* Promise rejected, just as expected */
      }
    );
  });

  let idx = 0;
  for (const [input, result] of hashTestVectors) {
    it("should match known hash calculations: " + idx++, async () => {
      const hash = new Sha256();
      hash.update(input);
      expect(await hash.digest()).to.deep.equal(result);
    });
  }

  idx = 0;
  for (const [key, data, result] of hmacTestVectors) {
    it("should match known hash calculations: " + idx++, async () => {
      const hash = new Sha256(key);
      hash.update(data);
      expect(await hash.digest()).to.deep.equal(result);
    });
  }
});
