//Import react and react components
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

//Import my components
import ActionBar from './ActionsBar.jsx'

class CourseDetail extends Component {

	state = {
    //currently displayed course
		course: {},
    //variable to handle wheter the data is still loading
    loading: true,
    //variable to handle if the current user is the creator of the course
    allowAuthorAccess: false
	}

	componentDidMount() {
    this.setState({loading: true});
    //fetch call to the course GET route
    fetch(`http://localhost:5000/api/courses/${this.props.courseId}`)
      //if the server status is ok continues else throws an error
      .then(data => {
        if (data.ok)
          return data.json();
        else
          throw new Error('course not found')
      })
      //check if the current user is the creator
      .then(course => {
        if (course.user.emailAddress === this.props.currentUser.email)
          this.setState({allowAuthorAccess: true})
        return course;
      })
      //save course in the the state and finish loading
      .then(course => this.setState({course: course, loading: false}))
      //handle the error
      .catch(err => {
        if (err.message === 'course not found')
          this.props.history.push('/notfound');
        else
          this.props.history.push('/error');
      });
  }

  handleCourseDelete = () => {
    const info = {
      method: 'DELETE',
      headers: this.props.currentUser.auth
    }
    //fetch call to the course DELETE route
    fetch(`http://localhost:5000/api/courses/${this.props.courseId}`, info)
      //if the server status is ok and redirects to the '/' courses routes else throws an error
      .then(data => {
        if (data.ok) 
          this.props.history.push('/');
        else
          throw new Error();
      })
      //handle the error
      .catch(err => alert('course could not be deleted'));
  }

	render(){
    //once the data has finished loading the course is displayed
    if (this.state.loading)
      return(<h3>loading</h3>);
    else
  		return (
        <div>
          <ActionBar courseId={this.props.courseId} showUpdateandDeleteButtons={this.state.allowAuthorAccess} handleDelete={this.handleCourseDelete}/>
    			<div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{this.state.course.title}</h3>
                <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
              </div>
              <div className="course--description">
                <ReactMarkdown source={this.state.course.description} />
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{this.state.course.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ReactMarkdown source={this.state.course.materialsNeeded} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  		);
	}
}

export default CourseDetail;