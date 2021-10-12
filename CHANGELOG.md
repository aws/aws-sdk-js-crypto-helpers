# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.2.2](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v1.2.1...v1.2.2) (2021-10-12)


### Bug Fixes

* **crc32c:** ie11 does not support Array.from ([#221](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/221)) ([5f49547](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/5f495472ab8988cf203e0f2a70a51f7e1fcd7e60))





## [1.2.1](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v1.2.0...v1.2.1) (2021-09-17)


### Bug Fixes

* better pollyfill check for Buffer ([#217](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/217)) ([bc97da2](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/bc97da29aaf473943e4407c9a29cc30f74f15723))





# [1.2.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v1.1.1...v1.2.0) (2021-09-17)


### Bug Fixes

* Adding ie11-detection dependency to sha1-browser ([#213](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/213)) ([138750d](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/138750d96385b8cc479b6f54c500ee1b5380648c))


* feat!: Remove support for old version of Node.js (#210) ([eb9100d](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/eb9100d296d2fbc27a922cbfcde80535db3e8940)), closes [#210](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/210)


### Features

* add @aws-crypto/util ([8f489cb](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/8f489cbe4c0e134f826bac66f1bf5172597048b9))
* Add AwsCrc32 Hash ([f5d7e81](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/f5d7e815fcbe0f8da1edb855fea3bd33eb1edc15))
* Add AwsCrc32C Hash ([4840c83](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/4840c83bdd7c461dded777ebc45a8f99258ba21c))
* Add SHA1 ([#208](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/208)) ([45c50ff](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/45c50ffa3acc9e3bf4039ab59a0102e4d40455ec))


### BREAKING CHANGES

* Removing Node.Js 8 and 10 from CI
