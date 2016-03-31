var React = require('react');

var SmsCharacterCounter =  React.createClass({
  componentWillReceiveProps: function(nextProps) {
    var text = nextProps.text;
    var characterCount = text.length;
    var credits = [160, 306, 459, 612].findIndex(function (item) {
      return characterCount <= item; 
    }) + 1;
    this.setState({
      text: text,
      credits: credits,
      characterCount: characterCount 
    });
  },
  getInitialState: function() {
    return { characterCount: 0, credits: 0 };
  },
  render: function() {
    return (
      <div>
        <div className="box">
          <div className="box-label">Character Count</div>
          <div className="box-value">{this.state.characterCount}</div>
        </div>
        <div className="box">
          <div className="box-label">Credits</div>
          <div className="box-value">{this.state.credits}</div>
        </div>
      </div>
    );
  }
});

module.exports = SmsCharacterCounter;