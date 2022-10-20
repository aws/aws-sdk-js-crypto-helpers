# @aws-crypto/sha256-universal

A consistent interface for SHA256 across browsers and NodeJs

## Usage

- To hash "some data"
```
import {Sha256} from '@aws-crypto/sha256-universal'

const hash = new Sha256();
hash.update('some data');
const result = await hash.digest();

```

- To hmac "some data" with "a key"
```
import {Sha256} from '@aws-crypto/sha256-universal'

const hash = new Sha256('a key');
hash.update('some data');
const result = await hash.digest();

```

## Test

`npm test`
