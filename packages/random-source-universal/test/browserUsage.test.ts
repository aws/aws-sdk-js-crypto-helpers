import 'mocha';
import * as sinon from 'sinon';

import * as browserRandom from '@aws-crypto/random-source-browser';
import * as nodeRandom from '@aws-crypto/random-source-node';
import * as crypto from 'crypto';
const cryptoRandom = sinon.stub(crypto, 'randomBytes').value(false);

try {
  // @ts-ignore reset the module
  delete require.cache[require.resolve('../src/')]
} catch {}

import {randomValues} from '../src/';

// done with this...
cryptoRandom.restore();

describe('implementation selection', () => {
  after(() => sinon.restore());

  it(
    'should use the browser implementation when the crypto module is not defined',
    async () => {
      const node = sinon.spy(nodeRandom, 'randomValues');
      const browser = sinon.stub(browserRandom, 'randomValues');
      browser.resolves(new Uint8Array(1))

      await randomValues(1);

      sinon.assert.calledOnce(browser)
      sinon.assert.notCalled(node)
    }
  );
});
