//Import react and react components
import React, { Component } from 'react';

class UserSignIn extends Component {
	render(){
		return (
			<div class="bounds">
        <div class="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form>
              <div><input id="firstName" name="firstName" type="text" class="" placeholder="First Name" /></div>
              <div><input id="lastName" name="lastName" type="text" class="" placeholder="Last Name" /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" class="" placeholder="Email Address" /></div>
              <div><input id="password" name="password" type="password" class="" placeholder="Password" /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" class="" placeholder="Confirm Password" /></div>
              <div class="grid-100 pad-bottom">
              	<button class="button" type="submit">Sign Up</button>
              	<button class="button button-secondary">Cancel</button>
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