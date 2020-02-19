# @aws-crypto/sha256-universal

A consistent interface for SHA256 across browsers and NodeJs

## Usage

```
import {Sha256} from '@aws-crypto/sha256-universal'

const hash = new Sha256();
hash.update('some data');
const result = await hash.digest();

```

## Test

`npm test`
