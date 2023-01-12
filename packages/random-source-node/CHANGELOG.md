# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v2.0.2...v3.0.0) (2023-01-12)

- feat!: replace Hash implementations with Checksum interface (#492) ([da43dc0](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/da43dc0fdf669d9ebb5bfb1b1f7c79e46c4aaae1)), closes [#492](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/492)

### BREAKING CHANGES

- All classes that implemented `Hash` now implement `Checksum`.

## [2.0.2](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v2.0.1...v2.0.2) (2022-09-07)

### Bug Fixes

- **#337:** update @aws-sdk/types ([#373](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/373)) ([b26a811](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/b26a811a392f5209c7ec7e57251500d4d78f97ff)), closes [#337](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/337)

# [2.0.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/v1.2.2...v2.0.0) (2021-10-25)

**Note:** Version bump only for package @aws-crypto/random-source-node

# [1.1.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/@aws-crypto/random-source-node@1.0.0...@aws-crypto/random-source-node@1.1.0) (2021-01-13)

### Bug Fixes

- remove package lock ([6002a5a](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/6002a5ab9218dc8798c19dc205d3eebd3bec5b43))
- **aws-crypto:** export explicit dependencies on [@aws-types](https://github.com/aws-types) ([6a1873a](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/6a1873a4dcc2aaa4a1338595703cfa7099f17b8c))

# [1.0.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/@aws-crypto/random-source-node@1.0.0-alpha.0...@aws-crypto/random-source-node@1.0.0) (2020-10-22)

### Bug Fixes

- replace `sourceRoot` -> `rootDir` in tsconfig ([#169](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/169)) ([d437167](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/d437167b51d1c56a4fcc2bb8a446b74a7e3b7e06))

# [1.0.0-alpha.0](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/@aws-crypto/random-source-node@0.1.0-preview.4...@aws-crypto/random-source-node@1.0.0-alpha.0) (2020-02-07)

### Bug Fixes

- update function definition ([42a6861](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/42a6861bf2ab251fe211f2eb89aebd1e95e648c3))

# [0.1.0-preview.4](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/@aws-crypto/random-source-node@0.1.0-preview.2...@aws-crypto/random-source-node@0.1.0-preview.4) (2020-01-16)

### Bug Fixes

- Changed package.json files to point to the right Git repo ([#9](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/9)) ([028245d](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/028245d72e642ca98d82226afb300eb154503c4a)), closes [#8](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/8)
- lerna version maintains package-lock ([#14](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/14)) ([2ef29e1](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/2ef29e13779703a5c9b32e93d18918fcb33b7272)), closes [#13](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/13)

# [0.1.0-preview.3](https://github.com/aws/aws-sdk-js-crypto-helpers/compare/@aws-crypto/random-source-node@0.1.0-preview.2...@aws-crypto/random-source-node@0.1.0-preview.3) (2019-11-15)

### Bug Fixes

- Changed package.json files to point to the right Git repo ([#9](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/9)) ([028245d](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/028245d72e642ca98d82226afb300eb154503c4a)), closes [#8](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/8)
- lerna version maintains package-lock ([#14](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/14)) ([2ef29e1](https://github.com/aws/aws-sdk-js-crypto-helpers/commit/2ef29e13779703a5c9b32e93d18918fcb33b7272)), closes [#13](https://github.com/aws/aws-sdk-js-crypto-helpers/issues/13)

# [0.1.0-preview.2](https://github.com/aws/aws-javascript-crypto-helpers/compare/@aws-crypto/random-source-node@0.1.0-preview.1...@aws-crypto/random-source-node@0.1.0-preview.2) (2019-10-30)

### Bug Fixes

- remove /src/ from .npmignore (for sourcemaps) ([#5](https://github.com/aws/aws-javascript-crypto-helpers/issues/5)) ([ec52056](https://github.com/aws/aws-javascript-crypto-helpers/commit/ec52056))
