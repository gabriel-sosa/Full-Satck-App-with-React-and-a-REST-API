//Import react and react components
import React, { Component } from 'react';

class CourseDetail extends Component {

  state = {
    error: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    const body = {
      title: this.title.value,
      description: this.description.value,
      estimatedTime: this.estimatedTime.value,
      materialsNeeded: this.estimatedTime.value
    };
    const info = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.props.currentUser.auth
      },
      body: JSON.stringify(body)
    };
    fetch('http://localhost:5000/api/courses', info)
      .then(data => data.ok ? false : data.json())
      .then(error => {
        if (error)
          throw error;
        else
          this.props.history.push('/');
      })
      .catch(err => this.setState({error: err.message}));
  }

	render(){

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