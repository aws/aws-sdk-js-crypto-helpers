import { MsWindow } from "@aws-crypto/ie11-detection";
interface IRandomValues {
  (byteLength: number): Promise<Uint8Array>;
}
import { locateWindow } from "@aws-sdk/util-locate-window";

/**
 * @implements {IRandomValues}
 */
export function randomValues(byteLength: number): Promise<Uint8Array> {
  return new Promise(resolve => {
    const randomBytes = new Uint8Array(byteLength);
    (locateWindow() as MsWindow).msCrypto.getRandomValues(randomBytes);

    resolve(randomBytes);
  });
}
