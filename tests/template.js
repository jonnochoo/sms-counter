const test = require('tape');
const sut = require('./../src/js/template.js');

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