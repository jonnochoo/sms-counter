var React = require('react');
var SmsCharacterCounter = require('./SmsCharacterCounter.jsx');
var template = require('./../js/template');
var _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return { text: '', fields: [] };
  },
  update: function() {
    var state = template(this.refs.textarea.value, this.state.fields);
    this.setState(state);
  },
  handleInputChange: function(e) {
    var field = _.find(this.state.fields, item => {
      return item.name === e.target.getAttribute('name');
    });
    field.value = e.target.value;
    this.update();
  },
  render: function() {
    return (
      <div className="row">
        <div className="columns large-6">
          <textarea rows="4" onChange={this.update} ref="textarea" />
          {this.state.fields.map((item) => {
            return <div key={item.name}>
              <label>{item.name}</label> <input key={item.name} type="text" name={item.name} ref={item.name} 
                defaultValue={item.value} onChange={this.handleInputChange} />
            </div>
          })}
        </div>
        <div className="columns large-6">
        { this.state.text.length > 0 ? <p className="wording">{this.state.text}</p> : null }
        <SmsCharacterCounter text={this.state.text} />
        </div>
      </div>
    );
  }
});