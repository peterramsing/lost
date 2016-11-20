'use strict'

var expect = require('chai').expect;

var check = require('./check');

describe('lost-gutter', () => {
  it('replaces $lost-gutter with global', () => {
    check(
      `div { padding: $lost-gutter; }`,
      `div { padding: 30px; }`
    );
    check(
      `div { margin: 25px $lost-gutter; }`,
      `div { margin: 25px 30px; }`
    );
    check(
      `div { margin: 25px $lost-gutter $lost-gutter; }`,
      `div { margin: 25px 30px 30px; }`
    );
    check(
      `div { padding: $lost-gutter; lost-column: 1/3 3 40px; }`,
      `div { padding: 30px; width: calc(99.9% * 1/3 - (40px - 40px * 1/3)); }\n`+
      `div:nth-child(1n) { float: left; margin-right: 40px; clear: none; }\n`+
      `div:last-child { margin-right: 0; }\n`+
      `div:nth-child(3n) { margin-right: 0; float: right; }\n`+
      `div:nth-child(3n + 1) { clear: both; }`
    );
  });
  it('replaces $lost-gutter with global when global is not default', () => {
    check(
      `@lost gutter 40px; div { padding: $lost-gutter; }`,
      `div { padding: 40px; }`
    );
  });
});


describe('lost-local-gutter', () => {
  it('replaces $lost-local-gutter', () => {
    check(
      `div { padding: $lost-local-gutter; lost-column: 1/3; lost-column-gutter: 50px; }`,
      `div { padding: 40px; width: calc(99.9% * 1/3 - (40px - 40px * 1/3)); }\n`+
      `div:nth-child(1n) { float: left; margin-right: 40px; clear: none; }\n`+
      `div:last-child { margin-right: 0; }\n`+
      `div:nth-child(3n) { margin-right: 0; float: right; }\n`+
      `div:nth-child(3n + 1) { clear: both; }`
    );
  });
  it('replaces the local gutter with an shortcutted gutter', () => {
    check(
      `div { padding: $lost-local-gutter; lost-column: 1/3 3 70px;}`,
      `div { padding: 40px; width: calc(99.9% * 1/3 - (40px - 40px * 1/3)); }\n`+
      `div:nth-child(1n) { float: left; margin-right: 40px; clear: none; }\n`+
      `div:last-child { margin-right: 0; }\n`+
      `div:nth-child(3n) { margin-right: 0; float: right; }\n`+
      `div:nth-child(3n + 1) { clear: both; }`
    );
  })
});
