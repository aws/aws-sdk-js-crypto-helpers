# @aws-crypto/random-source-universal

Access to a secure random source in either a browser or NodeJs.
See @aws-crypto/random-source-browser and @aws-crypto/random-source-node

## Usage

```
import {randomValues} from '@aws-crypto/random-source-universal'

const seedData = await randomValues(16);

```

## Test

`npm test`
