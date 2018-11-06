import 'mocha';

import * as sinon from 'sinon';

import * as browserRandom from '@aws-crypto/random-source-browser';
import * as nodeRandom from '@aws-crypto/random-source-node';

try {
  // @ts-ignore reset the module
  delete require.cache[require.resolve('../src/')]
} catch {}
import {randomValues} from '../src/';

describe('implementation selection', () => {
  after(() => sinon.restore());
  
  it(
    'should use the node implementation when the crypto module is defined',
    async () => {
      const node = sinon.spy(nodeRandom, 'randomValues');
      const browser = sinon.spy(browserRandom, 'randomValues');

      await randomValues(1);

      sinon.assert.calledOnce(node);
      sinon.assert.notCalled(browser);
    }
  );
});
