const test = require('tape');
const sut = require('./../src/js/template.js');

test('test that #{name does not appear as field', function(t) {
  var template = 'Dear #{name, this is a #{apptDate}';
  var result = sut(template, []);
  t.deepEqual(result, { 
    fields: [ { name: 'apptDate', value: 'Wednesday, 21st September 2016' } ], 
    template: 'Dear #{name, this is a #{apptDate}', text: 'Dear #{name, this is a Wednesday, 21st September 2016'
  })
  t.end();
});

test('no fields', function(t) {
  var template = 'Dear #{name}, this is a #{apptDate}';
  var result = sut(template, []);
  t.deepEqual(result, { 
    fields: [ { name: 'name', value: 'Sir/Madam' }, { name: 'apptDate', value: 'Wednesday, 21st September 2016' } ], 
    template: 'Dear #{name}, this is a #{apptDate}', text: 'Dear Sir/Madam, this is a Wednesday, 21st September 2016'
  })
  t.end();
});

test('with fields', function(t) {
  var template = 'Dear #{name}, this is a #{apptDate}';
  var result = sut(template, [ { name: 'name', value: 'Valued Customer' } ]);
  t.deepEqual(result, { 
    fields: [ { name: 'name', value: 'Valued Customer' }, { name: 'apptDate', value: 'Wednesday, 21st September 2016' } ], 
    template: 'Dear #{name}, this is a #{apptDate}', text: 'Dear Valued Customer, this is a Wednesday, 21st September 2016'
  })
  t.end();
});


test('with fields', function(t) {
  var template = 'Dear #{name}, this is a #{apptDate}';
  var result = sut(template, [ { name: 'apptDate', value: 'Thursday, 21st September 2016' } ]);
  t.deepEqual(result, { 
    fields: [ { name: 'name', value: 'Sir/Madam' }, { name: 'apptDate', value: 'Thursday, 21st September 2016' } ], 
    template: 'Dear #{name}, this is a #{apptDate}', text: 'Dear Sir/Madam, this is a Thursday, 21st September 2016'
  })
  t.end();
});

test('with fields that have been removed', function(t) {
  var template = 'this is a #{apptDate}';
  var result = sut(template, [ { name: 'name', value: 'Valued Customer' } ]);
  t.deepEqual(result, { 
    fields: [ { name: 'apptDate', value: 'Wednesday, 21st September 2016' } ], 
    template: 'this is a #{apptDate}', text: 'this is a Wednesday, 21st September 2016'
  })
  t.end();
});