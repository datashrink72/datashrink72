import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import CustomForm from './components/CustomForm.jsx';

import * as s from './serverCalls.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }

    this.facebookLogin = this.facebookLogin.bind(this)
  }

  componentDidMount() {
  }

  facebookLogin() {
    console.log('yo')
    s.serverGet('facebook');
    //promise needs to be chained
  }

  twitterLogin() {
    s.serverGet('twitter');
    //promise needs to be chained
  }


  /* formSubmit is a placeholder for functions that we will need to pass down
    to render data in a prespecified area */

  render () {
    return (
      <div>
        <h2>logo, menu, powered by watson</h2>
        <LoginForm formSubmit={this.formSubmit}/>
        <SignupForm formSubmit={this.formSubmit}/>
        <h4>description stuff, choose method below</h4>
        <h5>tabbed logins for fb, twitter, custom</h5>
        <a href="\facebook">yo</a>
        <button onClick={this.facebookLogin}>facebook login</button>
        <button onClick={this.twitterLogin}>twitter login</button>
        <CustomForm formSubmit={this.formSubmit} />
      </div>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));