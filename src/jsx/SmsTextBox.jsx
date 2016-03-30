var React = require('react');
var SmsCharacterCounter = require('./SmsCharacterCounter.jsx');
var template = require('./../js/template');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { text: '', fields: [] };
  },
  handleChange: function() {
    var fields = _.chain(_.toArray(this.refs))
      .map((x, index) => { return { type: x.type, value: x.value, name: _.keys(this.refs)[index] } })
      .reject(x => x.type === 'textarea')
      .value();
    console.log(fields);
    var state = template(this.refs.textarea.value, fields);
    this.setState(state);
  },
  render: function() {
    return (
      <div>
        <code>{this.state.text}</code>
        <textarea onChange={this.handleChange} ref="textarea" />
        {this.state.fields.map((item, index) => {
          return <div key={index}>
            <label>{item.name}</label> <input key={index} type="text" ref={item.name} defaultValue={item.value} onChange={this.handleChange} />
          </div>
        })}
        <SmsCharacterCounter text={this.state.text} />
      </div>
    );
  }
});