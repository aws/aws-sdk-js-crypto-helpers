// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { expect } from "chai";
import "mocha";
import { convertToBuffer } from "../src/convertToBuffer";

describe("convertToBuffer", () => {
  it("should return the same Uint8Array", () => {
    const data = new Uint8Array(5);
    const test = convertToBuffer(data);

    expect(test).to.equal(data);
  });

  it("should return a utf8 encoded Uint8Array", () => {
    const data = "asdf";
    const test = convertToBuffer(data);

    expect(test).to.deep.equal(new Uint8Array([97, 115, 100, 102]));
  });

  it("should return an empty ArrayBuffer for an empty string", () => {
    const data = "";
    const test = convertToBuffer(data);

    expect(test).to.deep.equal(new Uint8Array(0));
  });

  it("should return a Uint8Array with the same buffer", () => {
    const data = new Uint8Array(5).fill(1);
    const test = convertToBuffer(data.buffer);

    expect(test.buffer).to.equal(data.buffer);
  });

  it("", () => {
    const data = new Uint8Array(10).fill(2);
    const view = new DataView(
      new Uint8Array(data.buffer, 3, 5).fill(1).buffer,
      3,
      5
    );
    const test = convertToBuffer(view);

    expect(test).to.deep.equal(new Uint8Array([1, 1, 1, 1, 1]));
  });
});
