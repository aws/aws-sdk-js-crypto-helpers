import { randomValues as webCryptoRandomValues } from "./webCryptoRandomValues";
import {
  supportsWebCrypto,
  supportsSecureRandom
} from "@aws-crypto/supports-web-crypto";
import { locateWindow } from "@aws-sdk/util-locate-window";

export function testableRandomValues(
  supports: typeof supportsWebCrypto
) {
  return function randomValues(byteLength: number): Promise<Uint8Array> {
    // Find the global scope for this runtime
    const globalScope = locateWindow();
  
    if (supports(globalScope)) {
      return webCryptoRandomValues(byteLength);
    }
  
    return Promise.reject(new Error(`Unable to locate a secure random source.`));
  }
}

export const randomValues = testableRandomValues(supportsWebCrypto);
export const randomValuesOnly = testableRandomValues(supportsSecureRandom);
