import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js'

class CustomForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      name: '',
      text: ''
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
    s.serverPost('analyze', this.state)
    .then(e => {
      //render the data somewhere
      console.log(e, 'yo');
    }).catch(e => {
      console.log(e);
      //tell user they done messed up
    })
  }

  render () {
    return (
      <div>
      <h2>Enter your own input to analyze</h2>
      <form onSubmit={this.sendForm}>
        <label>
          Name your input
          <p></p>
          <input type="text" name='name' onChange={this.updateFormValue} defaultValue=''/>          
          <p></p>
        </label>
        <textarea rows='30' cols='60' name='text' onChange={this.updateFormValue} defaultValue=''/>
        <input type="submit" defaultValue ='submit'/>
      </form>
      </div>
    )
  }
}


export default CustomForm

