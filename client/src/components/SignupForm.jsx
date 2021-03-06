import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      username: '',
      password: '',
      email: '',
      status: false,
      error: false,
      errorMessage: ''
    }

    this.updateFormValue = this.updateFormValue.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  updateFormValue(e) {
    const name = e.target.name
    this.setState({[name]: e.target.value});
  }

  sendForm(event) {
    event.preventDefault();
    s.serverPost('signup', this.state).then(e => {
      if (e.data.username) {
        this.props.update(e.data.username);
      }
      if (e.data.error) {
        this.setState({
          error: true,
          errorMessage: e.data.error
        });
      }
    }).catch(e => {
      this.setState({
        error: true,
        errorMessage: 'There was a server error. Please wait then try again.'
      })
    }); 
  }

  render () {
    return (
      <div>
      <h2>Sign Up</h2>
      <p>{this.state.error && this.state.errorMessage}</p>
      <form onSubmit={this.sendForm}>
        <label>
          Username:
          <input type="text" name='username' onChange={this.updateFormValue} defaultValue=''/>
        </label>
        <label>
          Password:
          <input type="password" name='password' onChange={this.updateFormValue} defaultValue=''
          />
        </label>
        <label>
          Email:
          <input type="email" name='email' onChange={this.updateFormValue} defaultValue=''/>
        </label>
        <input type="submit" className="submit" defaultValue ='submit' />
      </form>
      </div>
    )
  }
}

export default SignUpForm


