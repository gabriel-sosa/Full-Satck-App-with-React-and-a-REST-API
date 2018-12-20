//Import react and react components
import React, { Component } from 'react';

//Import my components
import ActionBar from './ActionsBar.jsx'

class UpdateCourse extends Component {

	state = {
		course: {},
    loading: true
	}

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState(prevState => {
      prevState.course[name] = value;
      return {course: prevState.course}
    });
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
      return (<h3>Loading...</h3>);
    else
  		return (
        <div>
          <ActionBar courseId={this.props.courseId} />
    			<div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
              <form>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleInputChange} value={this.state.course.title} /></div>
                    <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleInputChange} value={this.state.course.description}></textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.handleInputChange} value={this.state.course.estimatedTime} /></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.handleInputChange} value={this.state.course.materialsNeeded}></textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">Update Course</button>
                  <button className="button button-secondary">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
  		);
	}
}

export default UpdateCourse;