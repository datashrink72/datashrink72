import d3BarChart from '../d3BarChart';
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';


var BarChart = React.createClass({
  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    d3BarChart.create(el, this.props.data);
  },

  // componentDidUpdate: function() {
  //   d3.select('svg' ).remove();
  //   var el = ReactDOM.findDOMNode(this);
  //   d3BarChart.create(el, this.props.data);
  // },

  render: function() {
    return (
      <div className="chart"></div>
    );
  }
});

export default BarChart