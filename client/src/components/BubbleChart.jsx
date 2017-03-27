import d3BubbleChart  from '../d3BubbleChart';
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';


var BubbleChart = React.createClass({
  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    d3BubbleChart.create(el, this.props.data, this.props.explanations);
  },
  render: function() {
    return (
      <div className="chart"></div>
    );
  }
});

export default BubbleChart