var _ = require('lodash');

module.exports = function(fieldName) {
  var values = {
    'date' : 'Wednesday, 21st September 2016',
    'rego' : 'TEST001',
    'make' : 'vehicle'
  };
  var field = _.find(_.keys(values), item => {
    return fieldName.toLowerCase().includes(item); 
  });
  
  return field ? values[field] : 'Sir/Madam';
}