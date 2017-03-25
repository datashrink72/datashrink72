import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      username: '',
      password: '',
      status: ''
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
    s.serverPost('login', this.state).then(e => {
      this.setState({status: e.data});
      this.render();
    }).catch(e => {
      this.setState({status: e.data});
      this.render();
      //tell user the info is correct or server is down
    })
  }



  render () {
    return (
      <div>
      <h2>Log In</h2>
      <p>{this.state.status}</p>
      <form onSubmit={this.sendForm}>
        <label>
          Username:
        </label>
        <input type="text" name='username' onChange={this.updateFormValue} defaultValue=''/>
        <label>
          Password:
        </label>
          <input type="text" name='password' onChange={this.updateFormValue} defaultValue=''
          />
        <input id="button" type="submit" defaultValue ='submit' />
      </form>
      </div>
    )
  }
}


export default LoginForm


