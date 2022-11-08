import { Sha1 as WebCryptoSha1 } from "./webCryptoSha1";
import { Hash, SourceData } from "@aws-sdk/types";
import { supportsWebCrypto } from "@aws-crypto/supports-web-crypto";
import { locateWindow } from "@aws-sdk/util-locate-window";

export class Sha1 implements Hash {
  private readonly hash: Hash;

  constructor(secret?: SourceData) {
    if (supportsWebCrypto(locateWindow())) {
      this.hash = new WebCryptoSha1(secret);
    } else {
      throw new Error("SHA1 not supported");
    }
  }

  update(data: SourceData, encoding?: "utf8" | "ascii" | "latin1"): void {
    this.hash.update(data, encoding);
  }

  digest(): Promise<Uint8Array> {
    return this.hash.digest();
  }
}
