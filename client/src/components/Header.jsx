import React from 'react';

export default ({currentUser}) => {

	let display;

	if (Object.keys(currentUser).length)
		display = (<nav><a className="signup" href="/">Welcome</a><a className="signin" href="/signout">Sign Out</a></nav>);
	else
		display = (<nav><a className="signup" href="/signup">Sign Up</a><a className="signin" href="/signin">Sign In</a></nav>);

	return (
		<div className="header">
	    <div className="bounds">
	      <h1 className="header--logo">Courses</h1>
	      {display}
	    </div>
	  </div>
	);
}