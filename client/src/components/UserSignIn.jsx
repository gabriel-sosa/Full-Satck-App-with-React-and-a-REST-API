//Import react and react components
import React, { Component } from 'react';

class UserSignIn extends Component {

	state = {
		//variable to handle wheter the data is still loading
		loading: false,
		//variable to save any errors returned by the server
		error: ''
	}

	handleSubmit = event => {
		this.setState({loading: true})
		event.preventDefault();
		const email = this.email.value;
		const password = this.password.value
		const authorization = 'Basic ' + btoa(`${email}:${password}`);
		const info = {
			headers: {
				Authorization: authorization
			}
		};
		//fetch call to the user GET route
		fetch('http://localhost:5000/api/users', info)
			//if the server status is ok continues else throws an error
			.then(data => {
				if (data.ok)
					return data.json();
				else
					throw new Error('wrong email or password');
			})
			//save the current user
			.then(user => this.props.signIn(`${user.firstName} ${user.lastName}`, user.emailAddress, password))
			//return to the previous page
			.then(() => this.props.history.goBack())
			//display the errors to the user
			.catch(err => {
				this.setState({loading: false, error: err.message});
			});
	}

	render(){

		//display the error if there is any
		const error = this.state.error ?(
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
			      <h1>Sign In</h1>
			      <div>
			      	{error}
			        <form onSubmit={this.handleSubmit}>
			          <div>
			          	<input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" ref={element => {this.email = element}}/>
			          </div>
			          <div>
			          	<input id="password" name="password" type="password" className="" placeholder="Password" ref={element => {this.password = element}} />
			          </div>
			          <div className="grid-100 pad-bottom">
			          	<button className="button" type="submit">Sign In</button>
			          	<a className="button button-secondary" href='/'>Cancel</a>
			          </div>
			        </form>
			      </div>
			      <p>&nbsp;</p>
			      <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
			    </div>
		    </div>
		  );
	}
}

export default UserSignIn;