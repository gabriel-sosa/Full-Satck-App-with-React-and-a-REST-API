import React from 'react';

export default ({currentUser}) => {

	//based on wheter there is a current user shows the sign in and sign up buttons or the sign out button
	const display= currentUser ? 
		(<nav><a className="signup" href="/">Welcome {currentUser.name}</a><a className="signin" href="/signout">Sign Out</a></nav>) 
		: (<nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>);

	return (
		<div className="header">
	    <div className="bounds">
	      <h1 className="header--logo">Courses</h1>
	      {display}
	    </div>
	  </div>
	);
}