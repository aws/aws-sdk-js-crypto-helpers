# @aws-crypto/crypto-random-source-node

Access to a secure random source in NodeJs.
This package exists provide a consistent interface
with @aws-crypto/crypto-random-source-browser.
Especially for @aws-crypto/crypto-random-source-universal

## Usage

```
import {randomValues} from '@aws-crypto/crypto-random-source-node'

const seedData = await randomValues(16);

```

## Test

`npm test`
