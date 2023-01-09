import { Checksum, SourceData } from "@aws-sdk/types";
import { Hash as SdkNodeHash } from "@aws-sdk/hash-node";

// TODO: remove the following when SdkNodeHash has implemented Checksum interface in aws-sdk-js-v3
export class NodeHash implements Checksum {
    private readonly secret?: SourceData;
    private nodeHash: SdkNodeHash;
    constructor(algorithmIdentifier: string, secret?: SourceData) {
        this.secret = secret;
        this.nodeHash = new SdkNodeHash("sha256", secret);
    }

    digest(): Promise<Uint8Array> {
        return this.nodeHash.digest();
    }

    reset(): void {
        this.nodeHash = new SdkNodeHash("sha256", this.secret);
    }

    update(chunk: Uint8Array): void {
        this.nodeHash.update(chunk);
    }
}