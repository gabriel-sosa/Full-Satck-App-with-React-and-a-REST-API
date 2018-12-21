import React from 'react';

export default ({courseId, showUpdateandDeleteButtons, handleDelete}) => {
  const buttons = showUpdateandDeleteButtons ? (
      <span>
        <a className="button" href={`/courses/${courseId}/update`}>Update Course</a>
        <button className="button" onClick={handleDelete}>Delete Course</button>
      </span>
      ) : undefined;
  return (
  	<div className="actions--bar">
      <div className="bounds">
        <div className="grid-100">
        	{buttons}
        	<a className="button button-secondary" href="/">Return to List</a></div>
      </div>
    </div>
  );
}