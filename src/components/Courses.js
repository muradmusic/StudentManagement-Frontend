import React, { useState, useEffect } from 'react'

import $ from 'jquery';


export const Courses = () => {

  const [courses, setCourses] = useState([])

  const [instructors, setInstructors] = useState([])

  const [instructor, setInstructor] = useState(1)

  const [courseId, setCourseId] = useState(0)

  const [name, setName] = useState('')

  const [description, setDescription] = useState('')

  const [duration, setDuration] = useState('')

  const [buttonName, setButtonName] = useState('Save')

  const [formTitle, setFormTitle] = useState('Add Student Form')

  let courseID = 0;


  useEffect(() => {

    fetchAllCourses();

    fetchAllInstructors();  

  }, [])


  const fetchAllInstructors = async () => {

    const url = 'http://localhost:8080/api/instructors';

    let data = await fetch(url);

    let parsedData = await data.json();

    setInstructors(parsedData)

  }

  const fetchAllCourses = async () => {

    const url = 'http://localhost:8080/api/courses';

    let data = await fetch(url);

    let parsedData = await data.json();

    setCourses(parsedData)

  }


  const showStudentRegistrationForm = async () => {

    setButtonName('Save');

    setFormTitle('Course Details Form');

    window.$('#studentModel').modal('show');

  }


  const saveOrUpdate = async () => {

    console.log('Instructor ID', instructor);

    console.log('Course ID', courseID);

    console.log('Course Id', courseId);

    if (courseId > 0) {

      // Update student code goes here

      console.log('Updating course with id ' + courseId);

      const requestOptions = {

        method: 'PUT',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({

          //courseId: courseId,

          name: name,

          description: description,

          duration: duration,

          instructorId: instructor

        })

      };

      fetch(`http://localhost:8080/api/courses/${courseId}`, requestOptions)

        .then(response => {

          var resp = 'Course updated';

          var responseReceived = response;

          if (resp.localeCompare(responseReceived)) {

            console.log('Course updated successfully');

            $('#studentModel').hide();

            fetchAllCourses();

            window.location.reload(true)

          }

          else {

            console.log('Course not updated');

          }

        })


    } else {

      // Add student code goes here

      // POST request using fetch inside 

      console.log('Adding Course');

      const requestOptions = {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({

          courseId: 29,

          name: name,

          description: description,

          duration: duration,

          instructorId: instructor

        })

      };

      fetch('http://localhost:8080/api/courses', requestOptions)

        .then(response => {

          var resp = 'Course created';

          var responseReceived = response;

          if (resp.localeCompare(responseReceived)) {

            console.log('Course created successfully');

            $('#studentModel').hide();

            fetchAllCourses();

            window.location.reload(true)

          }

          else {

            console.log('Course not created');

          }

        })

    }

  }

  const deleteCourse = async (id) => {

    const requestOptions = {

      method: 'DELETE',

      headers: { 'Content-Type': 'application/json' },

    };

    fetch(`http://localhost:8080/api/courses/${id}`, requestOptions)

      .then(response => {

        var resp = 'Course with this ID does not exist';

        var responseReceived = response.toString();

        if (responseReceived.includes('Student with this')) {

          console.log(resp);

        }

        else {

          console.log('Course created successfully');

          $('#studentModel').hide();

          fetchAllCourses();

          window.location.reload(true)

        }

      })

  }

  const editCourse = async (id) => {

    findById(id);

    window.$('#studentModel').modal('show');

  }



  const findById = async (id) => {

    const requestOptions = {

      method: 'GET',

      headers: { 'Content-Type': 'application/json' },

    };

    let data = await fetch(`http://localhost:8080/api/courses/${id}`, requestOptions);

    let course = await data.json();

    console.log('Selected course ',course);

    courseID = id;

    setCourseId(id);

    setName(course.name);

    setDescription(course.description);

    setDuration(course.duration);

    setInstructor(course.instructor.instructorId)

    setButtonName('Update');

    setFormTitle('Update Course Details');

    console.log('Update Course Details with id: ' + courseID);

  }


  let instructorsList = instructors.length > 0

    && instructors.map((item, i) => {

      return (

        <option

          defaultValue={item.instructorId === instructor}

        key={i} value={item.instructorId}>{item.firstName}</option>

      )

    });

  return (

    <>

      <div className="modal fade" id="studentModel" tabIndex="-1" aria-labelledby="studentModelLabel" aria-hidden="true">

        <div className="modal-dialog">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="modal-title" id="studentModelLabel">{formTitle}</h5>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>

            <div className="modal-body">

              <div className="mb-3">

                <label htmlFor="firstName" className="form-label">Name</label>

                <input id="firstName" type="text" name="name" className="form-control" required

                  value={name || ''}

                  onChange={(event) => {

                    setName(event.target.value);

                  }}

                />

              </div>

              <div className="mb-3 ">

                <label htmlFor="lastName" className="form-label">Description:</label>

                <input id="lastName" type="text" name="description" className="form-control" required

                  value={description || ''}

                  onChange={(event) => {

                    setDescription(event.target.value);

                  }}

                />

              </div>

              <div className="mb-3 ">

                <label htmlFor="level" className="form-label">Duration:</label>

                <input id="level" type="text" name="duration" className="form-control" required

                  value={duration || ''}

                  onChange={(event) => {

                    setDuration(event.target.value);

                  }}

                />

              </div>

              <div className="mb-3 ">

                <label htmlFor="instructor" className="form-label">Instructor:</label>

                <select className="form-select"

                  value={instructor}

                  onChange={(event) => {

                    console.log('OnChange', event.target.value);

                    setInstructor(event.target.value);

                  }}

                >

                  {instructorsList}

                </select>


              </div>

            </div>

            <div className="modal-footer">

              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

              <button type="button" className="btn btn-primary" onClick={() => saveOrUpdate()}>{buttonName}</button>

            </div>

          </div>

        </div>

      </div>

        <div>

        <br />

          <button type="button" className="btn btn-primary"

            onClick={showStudentRegistrationForm}

            style={{ marginLeft: '800px' }}

          >

            Add Course

          </button>

        </div>

        <br /><br />

          <div className="row">

            <table className="table table-striped table-bordered">

              <thead>

                <tr>

                  <th> Course ID</th>

                  <th> Name</th>

                  <th> Description</th>

                  <th> Duration</th>

                  <th> Instructor</th>

                  <th> Actions</th>

                </tr>

              </thead>

              <tbody>

                {

                  courses.map((course) => {

                    return (

                      <tr key={course.id}>

                        <td> {course.id}</td>

                        <td> {course.name} </td>

                        <td> {course.description} </td>

                        <td> {course.duration}</td>

                        <td> {course.instructor.firstName}</td>

                        <td>

                          <button style={{ marginLeft: "10px" }} onClick={() => deleteCourse(course.id)} className="btn btn-danger">Delete </button>

                          <button style={{ marginLeft: "10px" }} onClick={() => editCourse(course.id)} className="btn btn-info">Update </button>

                        </td>

                      </tr>

                    );

                  })

                }

              </tbody>

            </table>

          </div>

    </>

  )

}

