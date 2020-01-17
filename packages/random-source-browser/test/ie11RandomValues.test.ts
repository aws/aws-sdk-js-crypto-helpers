import { expect } from "chai";
import "mocha";
import * as ie11Random from "../src/ie11RandomValues";
import { locateWindow } from "@aws-sdk/util-locate-window";

describe("randomValues", () => {
  it("should call the random source built into IE 11", async () => {
    (locateWindow() as any).msCrypto = {
      getRandomValues(toFill: Uint8Array) {
        const view = new DataView(toFill.buffer);
        for (let i = 0; i < toFill.byteLength; i++) {
          view.setUint8(i, 0x00);
        }
      }
    };

    expect(await ie11Random.randomValues(4)).to.deep.equal(
      Uint8Array.from([0, 0, 0, 0])
    );
  });

  it("should convert a failed random generation into a promise rejection", async () => {
    (locateWindow() as any).msCrypto = {
      getRandomValues(toFill: Uint8Array) {
        throw new Error("PANIC PANIC");
      }
    };

    try {
      await ie11Random.randomValues(12);
    } catch (ex) {
      expect(ex).to.be.instanceof(Error);
      return;
    }
    throw new Error("never");
  });
});
