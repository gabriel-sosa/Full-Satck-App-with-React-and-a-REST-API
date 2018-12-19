//Import react and react components
import React, { Component } from 'react';

class CourseDetail extends Component {

	state = {
		course: {}
	}

	componentDidMount() {
    fetch('http://localhost:5000/api/courses/57029ed4795118be119cc441')
      .then(data => data.json())
      .then(data => this.setState({course: data}))
      //.then(() => console.log(this.state.course))
      .catch(err => console.log(err));
  }

	render(){
		return (
			<div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By Joe Smith</p>
            </div>
            <div className="course--description">
              <p>{this.state.course.description}</p>
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
                  <ul>
                    <li>{this.state.course.materialsNeeded}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
		);
	}
}

export default CourseDetail;