import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


class CustomForm extends React.Component {
  constructor(props) {
    super(props)
    console.log(this)
    this.state = { 
      name: '',
      text: '',
      context: 'text',
      private: true
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
    s.serverPost('customform', this.state)
    .then(e => {
      window.location.href = e.request.responseURL;
    }).catch(e => {
    })
  }

  render () {
    return (
      <div>
      <h2>Enter your own input to analyze</h2>
      <form className="custom" onSubmit={(e) => this.props.click === undefined ? this.sendForm(e) : this.props.click(e, this.state)}>
        <label>
          Name your input
          <p></p>
          <input type="text" name='name' onChange={this.updateFormValue} defaultValue=''/>          
          <p></p>
        </label>
        <textarea rows='30' cols='60' name='text' className="custom-form" onChange={this.updateFormValue} defaultValue=''/>
        <input type="submit" className="submit" defaultValue ='submit'/>
      </form>
      </div>
    )
  }
}


export default CustomForm

