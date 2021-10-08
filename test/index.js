import path from 'path';
import fs from 'fs';
import assert from 'assert';
import { transformSync } from '@babel/core';
import plugin from '../src';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

describe('', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(`should ${caseName.split('-').join(' ')}`, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const actualPath = path.join(fixtureDir, 'actual.js');

      const rawInput = fs.readFileSync(actualPath, 'utf-8');
      const actual = transformSync(rawInput, {
        plugins: [[plugin, {}]],
        parserOpts: {
          plugins: ['jsx']
        },
        filename: '/fake/path/to/file',
      }).code;

      const expected = fs.readFileSync(
          path.join(fixtureDir, 'expected.js')
      ).toString();

      assert.equal(trim(actual), trim(expected));
    });
  });
});
