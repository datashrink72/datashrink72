import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      username: '',
      password: '',
      status: false
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
    s.serverPost('login', this.state).then(e => {
      console.log('E in sendForm in loginForm: ', e);
      if (e.data) {
        this.props.update(e.data);
      } // TODO: tell the user their login failed (when e.data === false)
    }).catch(e => {
      this.setState({status: e.data});
      this.props.update(this.state.username);
    }).catch(e => {
      console.log(e);
      //tell user the info is correct or server is down
    })
  }

  render () {
    return (
      <div>
      <h2>Log In</h2>
        <form onSubmit={this.sendForm}>
          <label>
            Username:
            <input type="text" name='username' refs='username' onChange={this.updateFormValue} defaultValue=''/>
          </label>
          <label>
            Password:
            <input type="password" name='password' refs='password' onChange={this.updateFormValue} defaultValue=''
            />
          </label>
          <input type="submit" className="submit" defaultValue ='submit' />
        </form>
      </div>
    );
  }
}

export default LoginForm


