import React from 'react';
import TwitterSearch from './TwitterSearch.jsx';
import CustomForm from './CustomForm.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

var Create = function(props) {
 return (
  <Router>
    <div className="link-list">
    {!props.ownTwitter ? null : 
      <div>
        <a href="\twitter"><img className="list-pic" src={"/images/you.jpg"} />My Twitter Account</a> 
        <br />
      </div>
    }
    <Link to="/TwitterSearch"><img className="list-pic" src={"/images/anyone.png"} />Public Twitter Account</Link>
    <br />
    <Link to="/CustomForm"><img className="list-pic" src={"/images/whatever.jpg"} />Custom Input</Link>
    <Route path="/TwitterSearch" component={() => <TwitterSearch click={props.otherTwitterClick}/>} />
    <Route path="/CustomForm" component={() => <CustomForm click={props.customClick} /> }/>
    </div>
  </Router>
 )
}

export default Create   