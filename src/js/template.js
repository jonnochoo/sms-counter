const fieldDictionary =  require('./fieldDictionary');
const _  = require('lodash');

module.exports = function(template, fields) {
  var regex = /#{[^}]+}/g;
  var text = template;
  var match = '';
  while(match = regex.exec(template)){
    var m = match[0];
    var fieldName = m.replace('#{', '').replace('}', '').replace('record.', '');
    var field = _.find(fields, x => { return x.name === fieldName; });
    var newValue = field ? field.value : fieldDictionary(fieldName);
    if(!field) {
      fields.push({ name: fieldName, value: newValue });
    }    
    text = text.replace(m, newValue);
  }
  return {
      template: template, 
      text: text,
      fields: fields
    }
}