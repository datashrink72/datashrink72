import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js';
import * as globalData from '../sampledata'


class UserAnalyses extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      dataLoaded: false,
      data: '',
    }
  }

  componentWillMount() {
    s.serverGet('user').then(e => {
      console.log(e);
      this.setState({
        dataLoaded: true,
        data: e.data
      })
    })
  } 

  render () {
    return (
      <div>
        {!this.state.dataLoaded ? <div>Please sign up or log in to see saved analyses</div> :
          <div className="link-list">
          {this.state.data.length === 0 ? <div>You have no saved analyses.</div> : 
            this.state.data.map(e => {
              return this.props.click ? 
                (<div key={e._id}><a name={e._id} onClick={this.props.click} >{e.person}</a></div>) :
                (<div key={e._id}><a href={`analyses/${e._id}`} >{e.person}</a></div>)
            })}
          </div>
        }
      </div>
    )
  }
}

export default UserAnalyses


