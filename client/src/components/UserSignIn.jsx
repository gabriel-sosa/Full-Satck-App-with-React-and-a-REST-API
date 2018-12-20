//Import react and react components
import React, { Component } from 'react';

class UserSignIn extends Component {

	state = {
		loading: false,
		error: ''
	}

	handleSubmit = event => {
		this.setState({loading: true})
		event.preventDefault();
		const authorization = 'Basic ' + btoa(`${this.email.value}:${this.password.value}`);
		const info = {
			headers: {
				Authorization: authorization
			}
		};
		fetch('http://localhost:5000/api/users', info)
			.then(data => {
				if (data.ok)
					return;
				else
					throw new Error('user or password are incorrect');
			})
			.then(() => this.props.setUser(info.headers))
			.then(() => this.props.history.push('/'))
			.catch(err => {
				this.setState({loading: false, error: err.message});
			});
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