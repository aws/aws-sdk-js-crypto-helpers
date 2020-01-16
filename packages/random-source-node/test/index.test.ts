import { expect } from "chai";
import "mocha";
import { randomValues } from "../src";
import * as crypto from "crypto";
import * as sinon from "sinon";

describe("randomValues", () => {
  it("should return a promise fulfilled with random bytes", async () => {
    const cryptoRandom = sinon.stub(crypto, "randomBytes");
    cryptoRandom.callsArgWith(1, undefined, new Uint8Array(10));
    const rand = await randomValues(10);
    expect(rand.byteLength).to.eql(10);
    cryptoRandom.restore();
  });

  it("should reject the promise when the Node crypto source is unavailable", async () => {
    const cryptoRandom = sinon.stub(crypto, "randomBytes");
    cryptoRandom.callsArgWith(1, new Error("Not on my watch!"));

    await randomValues(10).then(
      () => {
        throw new Error("The promise should have been rejected");
      },
      () => {
        /* promise rejected, just as expected */
      }
    );
  });
});
