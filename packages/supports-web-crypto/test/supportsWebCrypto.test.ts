import { expect } from "chai";
import "mocha";
import { supportsWebCrypto } from "../src/supportsWebCrypto";

const fakeWindow: Window = {
  crypto: {
    getRandomValues: () => {},
    subtle: {
      decrypt(alg: any, key: any) {
        return {} as any;
      },
      digest(alg: any) {
        return {} as any;
      },
      encrypt(alg: any, key: any) {
        return {} as any;
      },
      exportKey(format: any, key: any) {
        return {} as any;
      },
      generateKey(alg: any) {
        return {} as any;
      },
      importKey(format: any, keyData: any, alg: any) {
        return {} as any;
      },
      sign(alg: any, key: any) {
        return {} as any;
      },
      verify(alg: any, key: any, signature: any) {
        return {} as any;
      }
    }
  }
} as any;

describe("supportsWebCrypto", () => {
  it("should return false if an object does not fulfill the WebCrypto interface", () => {
    expect(supportsWebCrypto({} as any)).to.eql(false);
  });

  it("should return true if an object fulfills the WebCrypto interface", () => {
    expect(supportsWebCrypto(fakeWindow)).to.eql(true);
  });
});
