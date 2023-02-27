## AWS SDK JS Crypto Helpers

AWS Cryptographic Helpers for Javascript and Node.js

[Security issue notifications](./CONTRIBUTING.md#security-issue-notifications)

## Scope

This repository collects cryptographic helper packages. We have designed it to gather packages that implement simple primitives for the browser or Node.js. More information about AWS Crypto Tools can be found [here](https://docs.aws.amazon.com/aws-crypto-tools/index.html?id=docs_gateway#lang/en_us)

## Project Status

This project is still in its early stages. Please send us your feedback. We might make breaking changes in future releases while the SDK is still in developer preview.

## Getting started

Let’s walk through setting up a project that requires a cryptographically secure random value. The following steps use npm as an example. They assume you have node.js and npm already installed.

1. Create a new node.js project.
2. In the project, run: `npm install --save @aws-crypto/random-source-node@preview`
3. Create a new file called index.js, require the function, and then use it to get a random value.

```javascript
const { randomValues } = require("@aws-crypto/random-source-node");
async function example() {
  try {
    const rand = await randomValues(32);
    console.log(rand.length);
  } catch (err) {
    console.error(err);
  }
}
example();
```

## Crypto Helper Package Index

Each package has readme details.

- [crc32](packages/crc32)
- [ie11-detection](packages/ie11-detection)
- [random-source-browser](packages/random-source-browser)
- [random-source-node](packages/random-source-node)
- [random-source-universal](packages/random-source-universal)
- [sha256-browser](packages/sha256-browser)
- [sha256-js](packages/sha256-js)
- [sha256-universal](packages/sha256-universal)
- [supports-web-crypto](packages/supports-web-crypto)

## Testing

To run the tests in every package.

```
npm install
npm test
```

## Feedback

We welcome your feedback! If you have comments, questions, or suggestions, open a GitHub issue.
We are actively monitoring issues and will respond to feedback as we prepare for our GA launch.

## Contributing

We welcome your contributions! To fix a problem, or add to an existing package: create a pull request.
You must submit all pull requests under the Apache 2.0 license. They will be reviewed by a team member prior to merging.
We would appreciate, but do not require, unit tests for all significant contributions. See [Contributing](CONTRIBUTING.md) for more information.

## License

This library is licensed under the Apache 2.0 License...
