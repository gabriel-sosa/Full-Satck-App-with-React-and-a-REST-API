//Import react and react components
import React, { Component } from 'react';

class UserSignIn extends Component {
  
  state = {
    error: '',
    loading: false
  }

  handleSubmit = e => {
    const body = JSON.stringify({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      emailAddress: this.emailAddress.value,
      password: this.password.value
    });
    e.preventDefault();
    if (this.password.value === this.password2.value){
      this.setState({loading: true});
      fetch('http://localhost:5000/api/users', {method: 'POST', body: body, headers: {'Content-Type': 'application/json'}})
        .then(data => data.ok ? 'user created' : data.json())
        .then(data => {
          if (data === 'user created')
            return;
          else
            throw data;
        })
        .then(() => this.props.history.push('/signin'))
        .catch(err => this.setState({error: err.message, loading: false}));
    }
  }

	render(){

  let error;
  if (this.state.error)
    error = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            <li>{this.state.error}</li>
          </ul>
        </div>
      </div>
    );


    if (this.state.loading)
      return (<h3>Loading...</h3>);
    else
  		return (
  			<div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            <div>
              {error}
              <form onSubmit={this.handleSubmit} >
                <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" ref={(input) => this.firstName = input} /></div>
                <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" ref={(input) => this.lastName = input} /></div>
                <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" ref={(input) => this.emailAddress = input} /></div>
                <div><input id="password" name="password" type="password" className="" placeholder="Password" ref={(input) => this.password = input} /></div>
                <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" ref={(input) => this.password2 = input} /></div>
                <div className="grid-100 pad-bottom">
                	<button className="button" type="submit">Sign Up</button>
                	<button className="button button-secondary">Cancel</button>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>Already have a user account? <a href="/signup">Click here</a> to sign in!</p>
          </div>
        </div>
  	  );
	}
}

export default UserSignIn;