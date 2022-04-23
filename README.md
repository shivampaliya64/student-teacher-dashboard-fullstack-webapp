# student-teacher-dashboard-fullstack-webapp
The following is a fullstack demo application of a student-teacher-dashboard for demonstration/learning purposes.
The application has been made on angular frontend and uses mySQL database, Node for APIs and Express server for the backend part.
the missing npm packages can be acheived using npm start before initalization of the project.

The flow of application goes like:

There are mainly 3 type of users Admin, student, teachers

Roles and functionalities available:

Student: can signin using the signup page, needs to provide the information and other vital information such as marksheet photocopy to get registered into the portal.
Once the student fills up the signup information the information is recieved by the Admin who then verifies and validates and depending upon the validation responds to the student
via mailing API, that there information has been verified.
The student once registered can login and view the basic details of their classmates and teachers who teach them.

Admin: As mentioned the admin approves the student to register onto the portal alongside, the admin can also add teachers the institution has along by excel-sheet upload which 
automatically rectifies new teachers addition and correspondingly updates the database with respect to the same.

Teachers: After logging into the webapp the teacher can view the student details and information by applying various filters such as search by class, search by name and then accordingly see 
the details of information the student.

The opertation each user can perform is limited as for now as the project was solely for learning purposes
