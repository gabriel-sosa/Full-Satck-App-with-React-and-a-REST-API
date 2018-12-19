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
            <Route exact path='/create' render={() => (<CreateCourse />)} />
            <Route exact path="/course/:courseId" render={() => (<CourseDetail />)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
