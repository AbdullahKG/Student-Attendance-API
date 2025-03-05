## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [API Documentation](#api-documentation)
6. [Database Design](#database-design)
7. [Usage](#usage)
8. [Contributing Policy](#contributing-policy)

---

## Introduction

This is a **Node.js** and **Arduino**-based back-end system for managing student attendance. The system enables real-time attendance tracking using an RFID module and supports efficient management of attendance records for multiple departments.

---

## Features

- Real-time attendance tracking using RFID and Socket.IO.
- RESTful APIs for managing students, classes, and attendance records.
- Integration with an Arduino-based RFID system.
- Flexible database design supporting multiple divisions and years.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MySql**: Database for storing student , classes , attendance records , etc. .
- **Socket.IO**: Real-time communication between the server and the client to send the cardid from the arduino.
- **SerialPort**: To handle serial communication with the Arduino for RFID scanning.
- **Sequelize**: ORM for interacting with SQL databases like MySQL for storing structured data.

---

## Installation

### Prerequisites

- Node.js and npm installed.
- MySql instance running.
- Arduino Uno with an RC522 RFID module set up.

1. Clone the repository:

```bash
git clone https://github.com/AbdullahKG/Student-Attendance.git
cd Student-Attendance
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables: Create a .env file with the following variables:

```plaintext
 NODE_ENV=development
 PORT = your-port
 DB_HOST = localhost
 DB_DIALECT = mysql
 DB_USER_NAME = your-user-name
 DB_PASSWORD = your-password
 DB = your-db-name
```

---

## API Documentation

Base URL :
http://localhost:3000/api/v1

Endpoints :

```plaintext

1. Students:
   GET /students: Retrieve all students.
   GET /students/:id: Retrieve a specific student by ID.
   POST /students: Add a new student.
   PATCH /students/:id: Update a student by ID.
   DELETE /students/:id: Delete a student by ID.

2. Courses:
   GET /courses: Retrieve all courses.
   GET /courses/:id: Retrieve a specific course by ID.
   GET /courses/course-names: Retrieve the names of the courses only.
   GET /courses/count/:departmentid: Count all courses for a certain department.
   POST /courses: Add a new course.
   PATCH /courses/:id: Update a course by ID.
   DELETE /courses/:id: Delete a course by ID.

3. Departments:
   GET /departments: Retrieve all departments.
   GET /departments/:id: Retrieve a specific department by ID.
   POST /departments: Add a new department.
   PATCH /departments/:id: Update a department by ID.
   DELETE /departments/:id: Delete a department by ID.

4. College Years:
   GET /collegeyears: Retrieve all college years.
   GET /collegeyears/:id: Retrieve a specific college year by ID.
   POST /collegeyears: Add a new college year.
   PATCH /collegeyears/:id: Update a college year by ID.
   DELETE /collegeyears/:id: Delete a college year by ID.

5. Groups:
   GET /groups: Retrieve all groups.
   GET /groups/:id: Retrieve a specific group by ID.
   POST /groups: Add a new group.
   PATCH /groups/:id: Update a group by ID.
   DELETE /groups/:id: Delete a group by ID.

6. Attendance:
   GET /attendances: Retrieve all attendance records.
   GET /attendances/student-attendance: Retrieve attendance records for a certain student based on a course he chooses.
   POST /attendances: Add a new attendance record.
   POST /attendances/create-absent: Add the student who didn't scan as absent.
```

---

## Database Design

A link for the DB design in lucid chart website :
https://lucid.app/lucidchart/46f3e6cd-dc69-4333-887d-25f503a5fbc3/edit?page=0_0&invitationId=inv_5b09d4c5-3e98-4d7d-b34e-26acea2dffe1#

---

## Usage

Connect the Arduino with the RFID module to your machine.
Run the backend server using the instructions above.
Use tools like Postman to test the APIs or integrate the front-end to interact with the back-end.

---

## Contributing Policy

This repository is intended for reference and educational purposes only.
Direct modifications or pull requests to this repository will not be accepted.
Fork the repository if you wish to modify the code for personal use.

