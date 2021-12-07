import { expect } from "chai";
import "mocha";
import { isEmptyData } from "../src/isEmptyData";

describe("isEmptyData", () => {
  it("should return true for an empty string", () => {
    expect(isEmptyData("")).to.eql(true);
  });

  it("should return false for a non-empty string", () => {
    expect(isEmptyData("foo")).to.eql(false);
  });

  it("should return true for an empty ArrayBuffer", () => {
    expect(isEmptyData(new ArrayBuffer(0))).to.eql(true);
  });

  it("should return false for a non-empty ArrayBuffer", () => {
    expect(isEmptyData(new ArrayBuffer(1))).to.eql(false);
  });

  it("should return true for an empty ArrayBufferView", () => {
    expect(isEmptyData(new Uint8Array(0))).to.eql(true);
  });

  it("should return false for a non-empty ArrayBufferView", () => {
    expect(isEmptyData(Uint8Array.from([0]))).to.eql(false);
  });
});
