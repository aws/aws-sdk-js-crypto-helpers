import { expect } from 'chai';
import 'mocha';
import {Sha256} from '../src/';
import {Sha256 as BrowserSha256} from '@aws-crypto/sha256-browser';

import * as sinon from 'sinon';
import * as crypto from 'crypto';

describe('implementation selection', () => {
  before(() => sinon.stub(crypto, 'createHash').value(false));
  after(() => sinon.restore());

  it(
    'should use the browser implementation when the crypto module is not defined',
    () => {
      const sha256 = new Sha256();
      expect((sha256 as any).hash).to.be.instanceof(BrowserSha256);
    }
  );
});
