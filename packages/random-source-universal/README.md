# @aws-crypto/crypto-random-source-universal

Access to a secure random source in either a browser or NodeJs.
See @aws-crypto/crypto-random-source-browser and @aws-crypto/crypto-random-source-node

## Usage

```
import {randomValues} from '@aws-crypto/crypto-random-source-node'

const seedData = await randomValues(16);

```

## Test

`npm test`
