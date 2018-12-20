import React from 'react';

export default ({courseId}) => (
	<div className="actions--bar">
    <div className="bounds">
      <div className="grid-100">
      	<span>
      		<a className="button" href={`/courses/${courseId}/update`}>Update Course</a>
      		<a className="button" href="#">Delete Course</a>
      	</span>
      	<a className="button button-secondary" href="/">Return to List</a></div>
    </div>
  </div>
);