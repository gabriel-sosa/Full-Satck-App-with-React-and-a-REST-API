//Import react and react components
import React, { Component } from 'react';

class CourseDetail extends Component {

  state = {
    //variable to handle wheter the data is still loading
    loading: false,
    //variable to save any errors returned by the server
    error: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    const body = {
      title: this.title.value,
      description: this.description.value,
      estimatedTime: this.estimatedTime.value,
      materialsNeeded: this.materialsNeeded.value
    };
    const info = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.props.currentUser.auth
      },
      body: JSON.stringify(body)
    };
    this.setState({loading: true})
    //fetch call to the course POST route
    fetch('http://localhost:5000/api/courses', info)
      //return the data if the server status is not ok
      .then(data => data.ok ? false : data.json())
      // if there is an error is thrown to the error handler else the user is redirected to the '/' index route
      .then(error => {
        if (error)
          throw error;
        else
          this.props.history.push('/');
      })
      //display the errors to the user
      .catch(err => this.setState({error: err.message, loading: false}));
  }

	render(){
    
    //display the error if there is any
    const error = this.state.error ? (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            <li>{this.state.error}</li>
          </ul>
        </div>
      </div>
      ) : undefined;

    //once the data has finished loading the course is displayed
    if (this.state.loading)
      return (<h3>Loading...</h3>);
    else
  		return (
  			<div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            {error}
            <form onSubmit={this.handleSubmit} >
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                  	<input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." ref={input => this.title = input} />
                  </div>
                  <p>By {this.props.currentUser.name}</p>
                </div>
                <div className="course--description">
                  <div>
                  	<textarea id="description" name="description" className="" placeholder="Course description..." ref={input => this.description = input} ></textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                      	<input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" ref={input => this.estimatedTime = input} />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                      	<textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." ref={input => this.materialsNeeded = input} ></textarea>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid-100 pad-bottom">
              	<button className="button" type="submit">Create Course</button>
              	<a className="button button-secondary" href='/'>Cancel</a>
              </div>
            </form>
          </div>
        </div>
  		);
	}
}

export default CourseDetail;