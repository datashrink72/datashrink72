import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js';

class TwitterSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      name: '',
      context: 'twitter',
      private: false
    }
    this.updateFormValue = this.updateFormValue.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }


  updateFormValue(e) {
    const name = e.target.name
    this.setState({[name]: e.target.value});
  }

  sendForm(event) {
    event.preventDefault()
    console.log(this.state)
    s.serverPost('twitterProfile', this.state)
    .then(e => {
      window.location.href = e.request.responseURL;
    }).catch(e => {
    })
  }

  render () {
    return (
      <div>
      <h2>Enter your own input to analyze</h2>
      <form onSubmit={(e) => this.props.click === undefined ? this.sendForm(e) : this.props.click(e, this.state)}>
        <label>
          Analyze tweets from: 
          <input type='text' name='name' onChange={this.updateFormValue} defaultValue='@'/>
        </label>
        <input className="submit" type="submit" defaultValue ='submit'/>
      </form>
      </div>
    )
  }
}


export default TwitterSearch;