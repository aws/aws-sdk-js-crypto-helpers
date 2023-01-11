import { Sha256 as BrowserSha256 } from "@aws-crypto/sha256-browser";
import { Checksum, SourceData } from "@aws-sdk/types";
import { convertToBuffer } from "@aws-crypto/util";
import { NodeHash } from './node_hash'

export class Sha256 implements Checksum {
  private hash: Checksum;

  constructor(secret?: SourceData) {
    if (supportsCryptoModule()) {
      this.hash = new NodeHash("sha256", secret);
    } else {
      this.hash = new BrowserSha256(secret);
    }
  }

  update(data: SourceData, encoding?: "utf8" | "ascii" | "latin1"): void {
    this.hash.update(convertToBuffer(data));
  }

  digest(): Promise<Uint8Array> {
    return this.hash.digest();
  }

  reset(): void {
    this.hash.reset();
  }
}

function supportsCryptoModule(): boolean {
  try {
    return !!require("crypto").createHash;
  } catch {
    return false;
  }
}
