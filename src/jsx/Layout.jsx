var React = require('react');
var SmsTextBox = require('./SmsTextBox.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h3>SMS Counter</h3>
        <SmsTextBox />
      </div>
    );
  }
});