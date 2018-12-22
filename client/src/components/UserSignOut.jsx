//import react and react components
import React from 'react';
import { Redirect } from 'react-router'

export default () => {
	//remove the user from the local storage
	localStorage.removeItem('currentUser');
	return (<Redirect to='/' />);
};