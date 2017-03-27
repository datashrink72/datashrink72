import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js';
import BubbleChart from './BubbleChart.jsx';
import BarChart from './BarChart.jsx';
import ComparisonChart from './ComparisonChart.jsx';
import * as globalData from '../sampledata'
import Public from './Public.jsx'
import Create from './Create.jsx'
import UserAnalyses from './UserAnalyses.jsx'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Analyses extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      dataLoaded: false,
      data: '',
      explanations: globalData.explanations,
      secondDataSet: false,
      data2: '',
      error: false,
      errorMessage: ''
    }
    this.existingDataClick = this.existingDataClick.bind(this);
    this.customFormClick = this.customFormClick.bind(this);
    this.otherTwitterClick = this.otherTwitterClick.bind(this);
  }

  componentWillMount() {
    this.props.toggleSpinner()
    s.analysesGet(this.props.nativeProps.match.params.id).then(e => {
      this.props.toggleSpinner()
      this.setState({
        dataLoaded: true,
        data: e.data
      })
    })
  } 

  otherTwitterClick(event, state){
    event.preventDefault()
    this.props.toggleSpinner()
    s.serverPost('twitterProfile', state)
    .then(e => {
      this.props.toggleSpinner()
      var redirectURL = e.request.responseURL;
      var hash = redirectURL.slice(redirectURL.indexOf('analyses/') + 'analyses/'.length);
      s.analysesGet(hash).then(results => {
        this.setState({
          secondDataSet: true,
          data2: results.data
        });
      })
    }).catch(err => {
      this.props.toggleSpinner()
      console.log('failed', err)
    })
  }

  existingDataClick(e) {
    e.preventDefault();
    this.props.toggleSpinner()
    s.analysesGet(e.target.name).then(results => { 
      this.props.toggleSpinner()
      this.setState({
        secondDataSet: true,
        data2: results.data
      });
    }).catch(err => {
      this.props.toggleSpinner();

    })
  }

  customFormClick(event, state) {
    event.preventDefault();
    this.props.toggleSpinner();
    s.serverPost('customform', state)
    .then(e => {
      var redirectURL = e.request.responseURL;
      var hash = redirectURL.slice(redirectURL.indexOf('analyses/') + 'analyses/'.length);
      s.analysesGet(hash).then(results => {
        this.props.toggleSpinner();
        this.setState({
          secondDataSet: true,
          data2: results.data
        });
      })
    }).catch(err => {
      this.props.toggleSpinner()
      console.log('failed', err)
    })
  }

  render () {
    return (
      <div>
        {!this.state.dataLoaded ? null :
          <div>
          <Router>
            <div>
              Compare To:
              <ul>
                <li><Link to="/Public">Public</Link></li>
                <li><Link to="/Create">Create</Link></li>
                <li><Link to="/UserAnalyses">My Stored Analyses</Link></li>
              </ul>

              <Route path="/Public" component={() => <Public click={this.existingDataClick} />} />
              <Route path="/Create" component={() => 
                <Create 
                  customClick={this.customFormClick}
                  otherTwitterClick={this.otherTwitterClick}
                />} 
              />
              <Route path="/UserAnalyses" component={() => <UserAnalyses click={this.existingDataClick}/> }/>
            </div>
          </Router>
          {!this.state.secondDataSet ? null :
            <ComparisonChart data={this.state.data} data2={this.state.data2} /> }
          <BarChart data={this.state.data} />
          <BubbleChart data={this.state.data} explanations={this.state.explanations}/>
          </div>
        }
      </div>
    )
  }
}

export default Analyses


