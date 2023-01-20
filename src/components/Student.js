import React, { useState, useEffect } from 'react'

import $ from 'jquery';


export const Students = () => {


    const [students, setStudents] = useState([])

    const [studentID, setStudentID] = useState(0)

    const [firstName, setFirstName] = useState('')

    const [lastName, setLastName] = useState('')

    const [level, setLevel] = useState('')

    const [buttonName, setButtonName] = useState('Save')

    const [formTitle, setFormTitle] = useState('Add Student Form')


    useEffect(() => {

        fetchAllStudents();

    }, [])


    const fetchAllStudents = async () => {

        const url = 'http://localhost:8080/api/students';

        let data = await fetch(url);

        let parsedData = await data.json();

        setStudents(parsedData)

    }


    const showStudentRegistrationForm = async () => {

        setButtonName('Save');

        setFormTitle('Save Student Form');

        window.$('#studentModel').modal('show');

    }


    const saveOrUpdate = async () => {

        if (studentID > 0) {

            // Update student code goes here

            console.log('Updating student with id ' + studentID);

            const requestOptions = {

                method: 'PUT',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({

                    studentId: 29,

                    firstName: firstName,

                    lastName: lastName,

                    level: level

                })

            };

            fetch(`http://localhost:8080/api/students/${studentID}`, requestOptions)

                .then(response => {

                    var resp = 'student updated';

                    var responseReceived = response;

                    if (resp.localeCompare(responseReceived)) {

                        console.log('Student updated successfully');

                        $('#studentModel').hide();

                        fetchAllStudents();

                        window.location.reload(true)

                    }

                    else {

                        console.log('Student not updated');

                    }

                })


        } else {

            // Add student code goes here

            // POST request using fetch inside 

            console.log('Adding student');

            const requestOptions = {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({

                    studentId: 29,

                    firstName: firstName,

                    lastName: lastName,

                    level: level

                })

            };

            fetch('http://localhost:8080/api/students/', requestOptions)

                .then(response => {

                    var resp = 'student created';

                    var responseReceived = response;

                    if (resp.localeCompare(responseReceived)) {

                        console.log('Student created successfully');

                        $('#studentModel').hide();

                        fetchAllStudents();

                        window.location.reload(true)

                    }

                    else {

                        console.log('Student not created');

                    }

                })

        }




    }

    const deleteStudent = async (id) => {

        const requestOptions = {

            method: 'DELETE',

            headers: { 'Content-Type': 'application/json' },

        };

        fetch(`http://localhost:8080/api/students/${id}`, requestOptions)

            .then(response => {

                var resp = 'Student with this ID does not exist';

                var responseReceived = response.toString();

                if (responseReceived.includes('Student with this')) {

                    console.log(resp);

                }

                else {

                    console.log('Student created successfully');

                    $('#studentModel').hide();

                    fetchAllStudents();

                    window.location.reload(true)

                }

            })

    }

    const editStudent = async (id) => {

        findById(id);

        window.$('#studentModel').modal('show');

    }



    const findById = async (id) => {

        const requestOptions = {

            method: 'GET',

            headers: { 'Content-Type': 'application/json' },

        };

        let data = await fetch(`http://localhost:8080/api/students/${id}`, requestOptions);

        let student = await data.json();

        setStudentID(student.studentId);

        setFirstName(student.firstName);

        setLastName(student.lastName);

        setLevel(student.level);

        setButtonName('Update');

        setFormTitle('Update Student Form');

    }


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

                                <label htmlFor="firstName" className="form-label">Student First Name:</label>

                                <input id="firstName" type="text" name="firstName" className="form-control" required

                                    value={firstName || ''}

                                    onChange={(event) => {

                                        setFirstName(event.target.value);

                                    }}

                                />

                            </div>

                            <div className="mb-3 ">

                                <label htmlFor="lastName" className="form-label">Student Last Name:</label>

                                <input id="lastName" type="text" name="lastName" className="form-control" required

                                    value={lastName || ''}

                                    onChange={(event) => {

                                        setLastName(event.target.value);

                                    }}

                                />

                            </div>

                            <div className="mb-3 ">

                                <label htmlFor="level" className="form-label">Student Level:</label>

                                <input id="level" type="text" name="level" className="form-control" required

                                    value={level || ''}

                                    onChange={(event) => {

                                        setLevel(event.target.value);

                                    }}

                                />

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            <button type="button" className="btn btn-primary" onClick={() => saveOrUpdate()}>{buttonName}</button>

                        </div>

                    </div>

                </div>

            </div>

            
            <br />

            <button type="button" className="btn btn-primary"

                onClick={showStudentRegistrationForm}

                style={{marginLeft:'800px'}}

            >

                Add Student

            </button>

                <br /><br />

                <div  style={{ marginTop: 'px' }}>

                    <div className="row">

                        <table className="table table-striped table-bordered">

                            <thead>

                                <tr>

                                    <th> Student ID</th>

                                    <th> First Name</th>

                                    <th> Last Name</th>

                                    <th> Level</th>

                                    <th> Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    students.map((student) => {

                                        return (

                                            <tr key={student.studentId}>

                                                <td> {student.studentId} </td>

                                                <td> {student.firstName} </td>

                                                <td> {student.lastName}</td>

                                                <td> {student.level}</td>

                                                <td>

                                                    <button style={{ marginLeft: "10px" }} onClick={() => deleteStudent(student.studentId)} className="btn btn-danger">Delete </button>

                                                    <button style={{ marginLeft: "10px" }} onClick={() => editStudent(student.studentId)} className="btn btn-info">Update </button>

                                                </td>

                                            </tr>

                                        );

                                    })

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

        </>

    )

}



