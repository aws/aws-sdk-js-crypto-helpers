// Copyright Amazon.com Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { expect } from "chai";
import "mocha";
import { uint32ArrayFrom } from "../src/uint32ArrayFrom";

describe("uint32ArrayFrom", () =>{
  it("When given an empty array, should return an empty array", () => {
    expect(uint32ArrayFrom(Array.of(0)))
      .to
      .eql(Uint32Array.of(0))
  })

  it("Given a populated array, returns a valid Uint32 Array", () => {
    expect(uint32ArrayFrom(Array.of(0x00000000, 0xF26B8303, 0xE13B70F7)))
      .to
      .eql(Uint32Array.of(0, 4067132163, 3778769143))
  })


})
