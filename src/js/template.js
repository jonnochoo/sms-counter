 const fieldDictionary =  require('./fieldDictionary');
const _  = require('lodash');

module.exports = function(template, fields) {
  var match;
  var regex = /#{[^#}]+}/g;
  var text = template;
  var newFields = [];
  while(match = regex.exec(template)){
    var m = match[0];
    var fieldName = m.replace('#{', '').replace('}', '').replace('record.', '');
    var field = _.find(fields, x => { return x.name === fieldName; });
    var newValue = field ? field.value : fieldDictionary(fieldName);
    newFields.push({ name: fieldName, value: newValue });
    text = text.replace(m, newValue);
  }
  return {
      template: template, 
      text: text,
      fields: newFields
    }
}