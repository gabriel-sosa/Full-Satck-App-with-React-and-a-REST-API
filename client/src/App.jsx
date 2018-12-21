//Import react and react components
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

//Import my components
import Header from './components/Header.jsx';
import Courses from './components/Courses.jsx';
import CourseDetail from './components/CourseDetail.jsx';
import CreateCourse from './components/CreateCourse.jsx';
import UserSignIn from './components/UserSignIn.jsx';
import UserSignUp from './components/UserSignUp.jsx';
import UpdateCourse from './components/UpdateCourse.jsx';
import UserSignOut from './components/UserSignOut.jsx';

import NotFound from './components/NotFound.jsx';
import Forbidden from './components/Forbidden.jsx';
import UnhandledError from './components/UnhandledError.jsx';

//Import stylesheet
import './global.css';

class App extends Component {

  state = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || false
  }

  setCurrentUser = UserAuthInfo => {
    this.setState({currentUser: UserAuthInfo}, () => localStorage.setItem( 'currentUser', JSON.stringify(UserAuthInfo)));
  }

  componentDidMount(){
    this.setState({currentUser: JSON.parse(localStorage.getItem('currentUser')) || false});
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header currentUser={this.state.currentUser} />
          <hr/>
          <Switch>
            <Route exact path='/' render={() => (<Courses />)} />
            <Route exact path='/signin' render={({history}) => (<UserSignIn setUser={this.setCurrentUser} history={history} />)} />
            <Route exact path='/signup' render={({history}) => (<UserSignUp history={history} />)} />
            <Route exact path='/signout' render={() => (<UserSignOut />)} />
            <Route exact path='/courses/create' render={({history}) => (this.state.currentUser ? <CreateCourse history={history} currentUser={this.state.currentUser} /> : <Redirect to='/signin' />)} />
            <Route exact path="/courses/:courseId" render={({match, history}) => (<CourseDetail courseId={match.params.courseId} history={history} currentUser={this.state.currentUser} />)} />
            <Route exact path="/courses/:courseId/update" render={({match, history}) => (<UpdateCourse courseId={match.params.courseId} history={history} currentUser={this.state.currentUser} />)} />
            <Route exact path="/forbidden" render={() => (<Forbidden />)} />
            <Route exact path="/error" render={() => (<UnhandledError />)} />
            <Route exact path="/notfound" render={() => (<NotFound />)} />
            <Route render={() => (<Redirect to='/notfound' />)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
