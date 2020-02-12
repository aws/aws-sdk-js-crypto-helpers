# @aws-crypto/random-source-browser

Access to a secure random source in a browser.
`Math.random` is not acceptable for cryptographic operations.
This module exports a consistent interface for modern browsers
and IE11.

## Usage

```
import {randomValues, randomValuesOnly} from '@aws-crypto/random-source-browser'

const seedData2 = await randomValues(16);
const seedData1 = await randomValuesOnly(16);

```

## randomValues vs randomValuesOnly

Some browsers only implement `crypto.getRandomValues` and not `crypto.subtle`.
If you need to have access to both, you should use `randomValues`. But if
you want to use some cryptographic fallback like MSRCrypto `randomValuesOnly`
is the preferred function.

## Test

`npm test`
