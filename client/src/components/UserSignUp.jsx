//Import react and react components
import React, { Component } from 'react';

class UserSignIn extends Component {
  
  state = {
    //variable to handle wheter the data is still loading
    loading: false,
    //variable to save any errors returned by the server
    error: ''
  }

  componentDidMount(){
    if (this.props.currentUser)
      this.props.history.push('/');
  }

  handleSubmit = e => {
    const body = JSON.stringify({
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      emailAddress: this.emailAddress.value,
      password: this.password.value
    });
    const info = {
      method: 'POST', 
      body: body, 
      headers: {
        'Content-Type': 'application/json'
      }
    };
    e.preventDefault();
    //fetch call to the user POST route only if both passwords match
    if (this.password.value === this.password2.value){
      this.setState({loading: true});
      fetch('http://localhost:5000/api/users', info)
        //return the data if the server status is not ok
        .then(data => data.ok ? false : data.json())
        // if there is an error is thrown to the error handler else the user is redirected to the '/signin' route
        .then(error => {
          if (error)
            throw error;
          else
            this.props.history.push('/signin');
        })
        //display the errors to the user
        .catch(err => this.setState({error: err.message, loading: false}));
    } else
      this.setState({error: `passwords don't match`});
  }

	render(){

  //display the error if there is any
  const error = this.state.error ? (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            <li>{this.state.error}</li>
          </ul>
        </div>
      </div>
    ) : undefined;

    //once the data has finished loading the data is displayed
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