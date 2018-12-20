//Import react and react components
import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

//Import my components
import Header from './components/Header.jsx';
import Courses from './components/Courses.jsx';
import CourseDetail from './components/CourseDetail.jsx';
import CreateCourse from './components/CreateCourse.jsx';
import UserSignIn from './components/UserSignIn.jsx';
import UserSignUp from './components/UserSignUp.jsx';
import UpdateCourse from './components/UpdateCourse.jsx';

import NotFound from './components/NotFound.jsx';

//Import stylesheet
import './global.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <hr/>
          <Switch>
            <Route exact path='/' render={() => (<Courses />)} />
            <Route exact path='/signin' render={() => (<UserSignIn />)} />
            <Route exact path='/signup' render={() => (<UserSignUp />)} />
            <Route exact path='/signout' render={() => (<h3>On work</h3>)} />
            <Route exact path='/courses/create' render={() => (<CreateCourse />)} />
            <Route exact path="/courses/:courseId" render={({match}) => (<CourseDetail courseId={match.params.courseId} />)} />
            <Route exact path="/courses/:courseId/update" render={({match}) => (<UpdateCourse courseId={match.params.courseId} />)} />
            <Route render={() => (<NotFound />)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
