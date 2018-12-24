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
import PrivateRoute from './components/PrivateRoute.jsx';
//import error handling components
import NotFound from './components/NotFound.jsx';
import Forbidden from './components/Forbidden.jsx';
import UnhandledError from './components/UnhandledError.jsx';

class App extends Component {

  state = {
    //checks the current user saved in the local storage
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || false
  }

  //function to save the current user in the app state and in local storage
  signIn = (name, email, password) => {
    const info = {
      name: name,
      email: email,
      auth: {
        Authorization: 'Basic ' + btoa(`${email}:${password}`)
      }
    };
    this.setState({currentUser: info}, () => localStorage.setItem( 'currentUser', JSON.stringify(info)));
  }

  //retrieve the saved user if there is any
  componentDidMount(){
    this.setState({currentUser: JSON.parse(localStorage.getItem('currentUser')) || false});
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/*Header component were sign in, sign up and sign out links are displayed*/}
          <Header currentUser={this.state.currentUser} />
          <hr/>
          <Switch>
            {/*'/' index route, shows all the courses*/}
            <Route exact path='/' render={({history}) => (<Courses history={history} />)} />

            {/*sign in route*/}
            <Route exact path='/signin' render={({history}) => (<UserSignIn signIn={this.signIn} history={history} />)} />

            {/*sign up route*/}
            <Route exact path='/signup' render={({history}) => (<UserSignUp signIn={this.signIn} history={history} currentUser={this.state.currentUser} />)} />

            {/*sign out route*/}
            <Route exact path='/signout' render={() => (<UserSignOut />)} />

            {/*create course route, only available if there is a current user, else redirects to the sign in page*/}
            <PrivateRoute exact path='/courses/create' currentUser={this.state.currentUser} render={({history}) => (<CreateCourse history={history} currentUser={this.state.currentUser} />)} />

            {/*course details route, if the current user is the creator will show the update and delete course button*/}
            <Route exact path="/courses/:courseId" render={({match, history}) => (<CourseDetail courseId={match.params.courseId} history={history} currentUser={this.state.currentUser} />)} />

            {/*update course route, only available if the current user is the creator*/}
            <PrivateRoute exact path="/courses/:courseId/update" currentUser={this.state.currentUser} render={({match, history}) => (<UpdateCourse courseId={match.params.courseId} history={history} currentUser={this.state.currentUser} />)} />

            {/*forbidden route, if the user tries to access to the update route of a course they did not create, the user will be redirected to this route*/}
            <Route exact path="/forbidden" render={() => (<Forbidden />)} />

            {/*error route, if the server returns any unexpected errors the user will be redirected to this page*/}
            <Route exact path="/error" render={() => (<UnhandledError />)} />

            {/*not found route, if the server can't find the requested course, the user will be redirected to this page*/}
            <Route exact path="/notfound" render={() => (<NotFound />)} />

            {/*default route, redirects to the not found route*/}
            <Route render={() => (<Redirect to='/notfound' />)} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
