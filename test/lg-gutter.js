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


describe('lost-gutter-local', () => {
  it('replaces $lost-gutter-local', () => {
    check(
      `div { padding: $lost-gutter-local; lost-column: 1/3; lost-column-gutter: 50px; }`,
      `div { padding: 50px; width: calc(99.9% * 1/3 - (50px - 50px * 1/3)); }\n`+
      `div:nth-child(1n) { float: left; margin-right: 50px; clear: none; }\n`+
      `div:last-child { margin-right: 0; }\n`+
      `div:nth-child(3n) { margin-right: 0; float: right; }\n`+
      `div:nth-child(3n + 1) { clear: both; }`
    );
    check(
      `div { padding: $lost-gutter-local; lost-column: 1/3; lost-column-gutter: 0; }`,
      `div { padding: 0; width: calc(99.9% * 1/3); }\n`+
      `div:nth-child(1n) { float: left; margin-right: 0; clear: none; }\n`+
      `div:last-child { margin-right: 0; }\n`+
      `div:nth-child(3n) { margin-right: 0; float: right; }\n`+
      `div:nth-child(3n + 1) { clear: both; }`
    );
  });
  it('works on shortcut lost-column', () => {
    check(
      `div { padding: $lost-gutter-local; lost-column: 1/3 3 70px;}`,
      `div { padding: 70px; width: calc(99.9% * 1/3 - (70px - 70px * 1/3));}\n`+
      `div:nth-child(1n) { float: left; margin-right: 70px; clear: none;}\n`+
      `div:last-child { margin-right: 0;}\n`+
      `div:nth-child(3n) { margin-right: 0; float: right;}\n`+
      `div:nth-child(3n + 1) { clear: both;}`
    );
  });
  it('works on shortcut lost-waffle', () => {
    check(
      `div { padding: $lost-gutter-local; lost-waffle: 1/3 3 20px;}`,
      `div { padding: 20px; width: calc(99.9% * 1/3 - (20px - 20px * 1/3)); height: calc(99.9% * 1/3 - (20px - 20px * 1/3));}\n`+
      `div:nth-child(1n) { float: left; margin-right: 20px; margin-bottom: 20px; clear: none;}\n` +
      `div:last-child { margin-right: 0; margin-bottom: 0;}\n` +
      `div:nth-child(3n) { margin-right: 0;}\n` +
      `div:nth-child(3n + 1) { clear: both;}\n` +
      `div:nth-last-child(-n + 3) { margin-bottom: 0;}`
    );
  });
  it('works on shortcut lost-offset', () => {
    check(
      `div { padding: $lost-gutter-local; lost-offset: 1/3 3 100px;}`,
      `div { padding: 100px; margin-left: calc(99.9% * (-1/3 * -1) - (100px - 100px * (-1/3 * -1)) + 100px) !important;}`
    );
  });
  it('works on shortcut lost-center', () => {
    check(
      `div { padding: $lost-gutter-local; lost-center: 400px 60px;}`,
      `div { padding: 60px; max-width: 400px; margin-left: auto; margin-right: auto; padding-left: 60px; padding-right: 60px;}\n` +
      `div:before { content: ''; display: table;}\n` +
      `div:after { content: ''; display: table; clear: both;}`
    );
  });
  it('works on shortcut lost-masonry-wrap', () => {
    check(
      `div { padding: $lost-gutter-local; lost-masonry-wrap: flex 60px;}`,
      `div { padding: 60px; display: flex; flex-flow: row wrap; margin-left: -30px; margin-right: -30px;}`
    );
  });
  it('works on shortcut lost-masonry-column', () => {
    check(
      `div { padding: $lost-gutter-local; lost-masonry-column: 1/3 15px;}`,
      `div { padding: 15px; float: left; width: calc(99.9% * 1/3 - 15px); margin-left: 7.5px; margin-right: 7.5px;}`
    );
  });
  it('works on shortcut lost-row', () => {
    check(
      `div { padding: $lost-gutter-local; lost-row: 1/3 70px;}`,
      `div { padding: 70px; width: 100%; height: calc(99.9% * 1/3 - (70px - 70px * 1/3)); margin-bottom: 70px;}\n` +
      `div:last-child { margin-bottom: 0;}`
    );
  });
  it('takes global if no local one is given', () => {
    check(
      `div { padding: $lost-gutter-local; lost-column: 1/3;}`,
      `div { padding: 30px; width: calc(99.9% * 1/3 - (30px - 30px * 1/3));}\n` +
      `div:nth-child(1n) { float: left; margin-right: 30px; clear: none;}\n` +
      `div:last-child { margin-right: 0;}\n` +
      `div:nth-child(3n) { margin-right: 0; float: right;}\n` +
      `div:nth-child(3n + 1) { clear: both;}`
    );
  });
  it('allows for multiple uses of the variable', () => {
    check(
      `div { padding: $lost-gutter-local; lost-column: 1/3 3 20px; margin-top: $lost-gutter-local;}`,
      `div { padding: 20px; width: calc(99.9% * 1/3 - (20px - 20px * 1/3)); margin-top: 20px;}\n` +
      `div:nth-child(1n) { float: left; margin-right: 20px; clear: none;}\n` +
      `div:last-child { margin-right: 0;}\n` +
      `div:nth-child(3n) { margin-right: 0; float: right;}\n` +
      `div:nth-child(3n + 1) { clear: both;}`
    );
  });
});
