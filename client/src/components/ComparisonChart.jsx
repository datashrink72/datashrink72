import d3ComparisonChart from '../d3ComparisonChart';
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';


var ComparisonChart = React.createClass({
  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    d3ComparisonChart.create(el, this.props.data, this.props.data2);
  },

  componentDidUpdate: function() {
    d3.select('.comparisonChart').remove();
    var el = ReactDOM.findDOMNode(this);
    d3ComparisonChart.create(el, this.props.data, this.props.data2);
  },

  render: function() {
    return (
      <div className="chart"></div>
    );
  }
});

export default ComparisonChart