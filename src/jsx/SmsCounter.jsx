var React = require('react');

var SmsCounter =  React.createClass({
  getInitialState: function() {
    return { characterCount: 0, credits: 0 };
  },
  handleChange: function() {
    var characterCount = this.refs.textarea.value.length;
    var credits = [160, 306].findIndex(function (item) {
      return characterCount <= item; 
    }) + 1;
    this.setState({ 
      credits: credits,
      characterCount: characterCount 
    });
  },
  render: function() {
    return (
      <div>
        <h3>SMS Counter</h3>
        <textarea onChange={this.handleChange} ref="textarea" />
        <div>Character Count: {this.state.characterCount} | Credits: {this.state.credits}</div>
      </div>
    );
  }
});

module.exports = SmsCounter;
