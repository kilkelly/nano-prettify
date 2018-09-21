var test = require('tape')
var nanoPrettify = require('./dist/index').nanoPrettify

test('Handle incorrect type', function (t) {
  t.plan(1)
  t.equal(nanoPrettify(235580100176034320859259343606608761791), 'NANO_PRETTIFY_ERROR_NOT_A_STRING')
})

test('Handle non-valid raw value', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('abc10017603432defg59343606608761791'), 'NANO_PRETTIFY_ERROR_NOT_VALID_RAW_VALUE')
})

test('Prettify amount (default unit: Mnano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791'), '235,580,100.176034')
})

test('Prettify amount, no commas (default unit: Mnano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { commas: false }), '235580100.176034')
})

test('Prettify amount, no decimal places (default unit: Mnano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { decimals: false }), '235,580,100')
})

test('Prettify amount, no commas, no decimal places (default unit: Mnano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { commas: false, decimals: false }), '235580100')
})

test('Prettify amount, 10 decimal places (default unit: Mnano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { decimalPlaces: 10 }), '235,580,100.1760343208')
})

test('Prettify amount, all decimal places (default unit: Mnano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { decimalPlaces: 0 }), '235,580,100.176034320859259343606608761791')
})

test('Prettify amount, no commas, all decimal places (default unit: Mnano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { commas: false, decimalPlaces: 0 }), '235580100.176034320859259343606608761791')
})

test('Prettify amount (unit: raw)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { unit: 'raw' }), '235,580,100,176,034,320,859,259,343,606,608,761,791')
})

test('Prettify amount, no commas (unit: raw)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { commas: false, unit: 'raw' }), '235580100176034320859259343606608761791')
})

test('Prettify amount (unit: unano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { unit: 'unano' }), '235,580,100,176,034,320,859.259343')
})

test('Prettify amount (unit: mnano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { unit: 'mnano' }), '235,580,100,176,034,320.859259')
})

test('Prettify amount (unit: nano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { unit: 'nano' }), '235,580,100,176,034.320859')
})

test('Prettify amount (unit: knano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { unit: 'knano' }), '235,580,100,176.034320')
})

test('Prettify amount (unit: Gnano)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('235580100176034320859259343606608761791', { unit: 'Gnano' }), '235,580.100176')
})

test('Prettify amount (leading zeros after decimal point)', function (t) {
  t.plan(1)
  t.equal(nanoPrettify('9083915172772997892689', { unit: 'knano', decimals: true, decimalPlaces: 16, commas: false }), '0.0000090839151727')
})

