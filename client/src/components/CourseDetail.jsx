//Import react and react components
import React, { Component } from 'react';

//Import my components
import ActionBar from './ActionsBar.jsx'

class CourseDetail extends Component {

	state = {
		course: {},
    loading: true
	}

	componentDidMount() {
    this.setState({loading: true});
    fetch(`http://localhost:5000/api/courses/${this.props.courseId}`)
      .then(data => data.json())
      .then(data => this.setState({course: data, loading: false}))
      .catch(err => console.log(err));
  }

	render(){
    if (this.state.loading)
      return(<h3>loading</h3>);
    else
  		return (
        <div>
          <ActionBar courseId={this.props.courseId} />
    			<div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{this.state.course.title}</h3>
                <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
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
        </div>
  		);
	}
}

export default CourseDetail;