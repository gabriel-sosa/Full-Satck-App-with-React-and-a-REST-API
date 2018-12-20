import React from 'react';
import { Redirect } from 'react-router'

export default () => {
	localStorage.removeItem('currentUser');
	return (<Redirect to='/' />);
};