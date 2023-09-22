# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.1.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v5.0.0...v5.1.0) (2023-09-22)

### Bug Fixes

- Update tsc to 2.x ([#735](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/735)) ([782e0de](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/782e0de9f5fef41f694130580a69d940894b6b8c))

### Features

- Use @smithy/util-utf8 ([#730](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/730)) ([00fb851](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/00fb851ca3559d5a1f370f9256814de1210826b8)), closes [#699](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/699)

# [5.0.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v4.0.1...v5.0.0) (2023-07-13)

- feat!: drop support for IE 11 (#629) ([6c49fb6](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/6c49fb6c1b1f18bbff02dbd77a37a21bdb40c959)), closes [#629](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/629)
- chore!: Drop Node 14 Support (#678) ([4bae6e9](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/4bae6e99dd6c622c3359bba95a2a2e89956f4cf1)), closes [#678](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/678)

### BREAKING CHANGES

- Remove support for IE11

Co-authored-by: texastony <5892063+texastony@users.noreply.github.com>

- Node 14 is no longer supported nor tested.

## [4.0.1](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v4.0.0...v4.0.1) (2023-05-22)

### Bug Fixes

- correct package naming in "browser" fields ([#625](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/625)) ([24d8c2b](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/24d8c2b4b740fe2c8faa136384fe3ae8fb1ff60b))

# [4.0.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v3.0.0...v4.0.0) (2023-02-20)

- feat!: deprecate node12. ([d85ca33](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/d85ca33d1b98e2acdeb5dd8981a369630f69addf))

### BREAKING CHANGES

- Remove node12 from CI (#543)

# [3.0.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v2.0.2...v3.0.0) (2023-01-12)

### Bug Fixes

- **docs:** sha256 packages, clarify hmac support ([#455](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/455)) ([1be5043](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/1be5043325991f3f5ccb52a8dd928f004b4d442e))

- feat!: replace Hash implementations with Checksum interface (#492) ([da43dc0](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/da43dc0fdf669d9ebb5bfb1b1f7c79e46c4aaae1)), closes [#492](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/492)

### BREAKING CHANGES

- All classes that implemented `Hash` now implement `Checksum`.

## [2.0.2](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v2.0.1...v2.0.2) (2022-09-07)

### Bug Fixes

- **#337:** update @aws-sdk/types ([#373](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/373)) ([b26a811](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/b26a811a392f5209c7ec7e57251500d4d78f97ff)), closes [#337](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/337)
- **docs:** update README for packages/util ([#382](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/382)) ([f3e650e](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/f3e650e1b4792ffbea2e8a1a015fd55fb951a3a4))

## [2.0.1](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v2.0.0...v2.0.1) (2021-12-09)

### Bug Fixes

- **uint32ArrayFrom:** increment index & polyfill for Uint32Array ([#270](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/270)) ([a70d603](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/a70d603f3ba7600d3c1213f297d4160a4b3793bd))

# [2.0.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v1.2.2...v2.0.0) (2021-10-25)

- feat!: update support policy for node8 and node10 notice (#249) ([723e6d2](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/723e6d2c386a0bc395b32accd85c3544f03c1d18)), closes [#249](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/249)

### BREAKING CHANGES

- Deprecate Node8 and Node10

## [1.2.2](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v1.2.1...v1.2.2) (2021-10-12)

### Bug Fixes

- **crc32c:** ie11 does not support Array.from ([#221](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/221)) ([5f49547](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/5f495472ab8988cf203e0f2a70a51f7e1fcd7e60))

## [1.2.1](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v1.2.0...v1.2.1) (2021-09-17)

### Bug Fixes

- better pollyfill check for Buffer ([#217](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/217)) ([bc97da2](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/bc97da29aaf473943e4407c9a29cc30f74f15723))

# [1.2.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v1.1.1...v1.2.0) (2021-09-17)

### Bug Fixes

- Adding ie11-detection dependency to sha1-browser ([#213](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/213)) ([138750d](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/138750d96385b8cc479b6f54c500ee1b5380648c))

- feat!: Remove support for old version of Node.js (#210) ([eb9100d](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/eb9100d296d2fbc27a922cbfcde80535db3e8940)), closes [#210](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/210)

### Features

- add @aws-crypto/util ([8f489cb](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/8f489cbe4c0e134f826bac66f1bf5172597048b9))
- Add AwsCrc32 Hash ([f5d7e81](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/f5d7e815fcbe0f8da1edb855fea3bd33eb1edc15))
- Add AwsCrc32C Hash ([4840c83](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/4840c83bdd7c461dded777ebc45a8f99258ba21c))
- Add SHA1 ([#208](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/208)) ([45c50ff](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/45c50ffa3acc9e3bf4039ab59a0102e4d40455ec))

### BREAKING CHANGES

- Removing Node.Js 8 and 10 from CI
