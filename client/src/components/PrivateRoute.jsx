import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

export default ({exact, path, render, currentUser}) => {
	if (currentUser){
		return (<Route exact={exact} path={path} render={render} />);
	} else
		return (<Redirect to='/signin' />);
};