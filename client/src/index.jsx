import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Create from './components/Create.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import ComparisonChart from './components/ComparisonChart.jsx'
import Analyses from './components/Analyses.jsx'
import Public from './components/Public.jsx'
import UserAnalyses from './components/UserAnalyses.jsx'
import * as s from './serverCalls.js'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Guest',
      loggedIn: false,
    }
    this.updateLoggedIn = this.updateLoggedIn.bind(this);
  }

  componentWillMount() {
    console.log('HELLO WORLD IN componentWillMount IN INDEX.JSX');
    s.serverGet('session').then((e) => {
      console.log(e.data);
      if (e.data.username) {
        this.setState({
          user: e.data.username,
          loggedIn: true
        })
      }
    });
  }

  //the Create style is for illustrative purposes
    //to pass in props:
    // <Route path="/Create" render={() => <Create {...this.state} /> } />
  updateLoggedIn(username) {
    username = username;
    this.setState({
      user: username,
      loggedIn: true
    });
  }

  render () {

    return (
      <Router>
        <div>
          <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">datashrink</a>
              </div>
              <div id="navbar" className="navbar-collaspe">
                <ul className="nav navbar-nav">
                  <li><Link to="/Home">Home</Link></li>
                  {!this.state.loggedIn && <li><Link to="/LoginForm">Log In</Link></li> }
                  {!this.state.loggedIn && <li><Link to="/SignUpForm">Sign Up</Link></li> }
                  {this.state.loggedIn && <li><a href='\logout'>Logout</a></li> }
                  <li><Link to="/Create">Create Analysis</Link></li>
                  <li><Link to="/Public">Public Analyses</Link></li>
                  <li><Link to="/User">My Stored Analyses</Link></li>
                </ul>
                <div className="credit-photos">
                  powered by: 
                  <img id="footer-images" src={"/images/IBM-Watson-image.png"} />
                  <img id="footer-images" src={"/images/twitterLogo.png"} />
                </div>
              </div>
            </div>
          </nav>
          <img id="datashrink" src={"/images/datashrink_360.jpg"} />
          <div className="container">
            <h1>datashrink</h1>
            <p className="welcome">Welcome, {this.state.user}</p>
            <Route path="/Home" />
            {!this.state.loggedIn && <Route path="/LoginForm" component={() => <LoginForm update={this.updateLoggedIn} />} />}
            {!this.state.loggedIn && <Route path="/SignUpForm" component={() => <SignupForm update={this.updateLoggedIn} />} />}
            <Route path="/Create" render={() => <Create ownTwitter={true} {...this.state} /> } />
            <Route path="/Public" component={Public}/>          
            <Route path="/User" component={UserAnalyses}/>
            <Route path="/analyses/:id" component={Analyses} />
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//need to fix how far down the current analysis goes down
//left justified
//logo on the upper right of the page

 // <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                //   <span className="sr-only">Toggle Navigation</span>
                //   <span className="icon-bar"></span>
                //   <span className="icon-bar"></span>
                //   <span className="icon-bar"></span>
                // </button>
            // Datashrink interacts with Watson and Twitter to give you an in-depth personality analysis of yourself. 
            // Datashrink operates by obtainnig all of a user's tweets from Twitter, these tweets are sent to Watson 
            // which does an in-depth personality analysis, which is displayed to you in a histogram.  
          // <footer id="footer" className="panel-footer">
           
          // </footer>