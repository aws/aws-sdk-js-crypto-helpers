import "mocha";
import { expect } from "chai";
import { Crc32c, AwsCrc32c } from "../src";
import { fromUtf8 } from "@aws-sdk/util-utf8-browser";

type TestVector = [Uint8Array, number];

const emptyVector: TestVector = [new Uint8Array(0), 0];

// @ref https://reveng.sourceforge.io/crc-catalogue/17plus.htm#crc.cat.crc-32c
// @ref https://datatracker.ietf.org/doc/html/rfc7143#appendix-A.4

const ascendingVector: TestVector = [fromUtf8("123456789"), 0xe3069283];
const phraseVector: TestVector = [
  fromUtf8("The quick brown fox jumps over the lazy dog"),
  0x22620404,
];
const phraseVectorNew: TestVector = [
  fromUtf8("Sphinx of black quartz, judge my vow."),
  0xbcb02b65,
];

const incrementalVectors: Array<TestVector> = [
  [fromUtf8("The "), 0x92fe8395],
  [fromUtf8("quick "), 0xfcca5898],
  [fromUtf8("brown "), 0x3bf9991e],
  [fromUtf8("fox "), 0x46675bb9],
  [fromUtf8("jumps "), 0x5d497653],
  [fromUtf8("over "), 0x0b5e117a],
  [fromUtf8("the "), 0xe17ccce8],
  [fromUtf8("lazy "), 0xb62d88c9],
  [fromUtf8("dog"), 0x22620404],
];

const testVectors = new Map<Uint8Array, number>([
  emptyVector,
  ascendingVector,
  phraseVector,
  phraseVectorNew,
]);

describe("Crc32c", () => {
  // @ts-ignore
  for (const [buffer, expected] of testVectors) {
    it(`should derive a CRC-32C of ${expected} for an input of ${buffer.toString()}`, () => {
      expect(new Crc32c().update(buffer).digest()).to.eql(expected);
    });
  }

  it("should allow incremental digest calculation", () => {
    const instance = new Crc32c();
    expect(instance.digest()).to.eql(0);

    for (const [data, expectedCrc32c] of incrementalVectors) {
      expect(instance.update(data).digest()).to.eql(expectedCrc32c);
    }
  });

  it("should create a new crc32c instance when reset is called ", () => {
    const awsCrc32c = new AwsCrc32c();
    const oldInstance = (awsCrc32c as any).crc32c;
    awsCrc32c.reset();
    const newInstance = (awsCrc32c as any).crc32c;
    expect(oldInstance).to.not.equal(newInstance); // compare by reference
  })
});
