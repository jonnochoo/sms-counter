const test = require('tape');
const sut = require('./../src/js/fieldDictionary.js');

test('date', function(t) {
  var result = sut('appointmentDate');
  t.equal(result, 'Wednesday, 21st September 2016');
  t.end();
});

test('make', function(t) {
  var result = sut('make');
  t.equal(result, 'vehicle');
  t.end();
});

test('rego', function(t) {
  var result = sut('rego');
  t.equal(result, 'TEST001');
  t.end();
});

test('name', function(t) {
  var result = sut('name');
  t.equal(result, 'Sir/Madam');
  t.end();
});