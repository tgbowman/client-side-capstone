# teacherHUB

teacherHUB is a singlepage dashboard app that is designed to be an all-in-one destination to help teachers in the areas of:
  - Grade Management
  - Classroom Management
  - Student Dicipline Records
  - Parent Communication
  - Student Communication
  - Administration Communication
  
  teacherHUB was built using AngularJS, Materialize, and Firebase for data storage.  I also used GoogleCharts to visualize student grade data.
  
  # Getting Started With teacherHUB
  
  To install teacherHUB on your machine:
  
  1. Clone down the teacherHUB repo by entering `git clone git@github.com:tgbowman/teacherHUB.git ` into your terminal.
  2. From your terminal do a ```npm install```
  3. Go to https://firebase.google.com/ and login or create an account.
  4. From the navbar click on GO TO CONSOLE
  5. Create a new project
  6. From project screen click the "Add Fireabse to Your Web App" button.
  7. You will be given a code snippet to add firebase to you app.
  8. Open the app in your code editor of choice, create a new file in the app folder called ```app.config.js```
  9.Paste the following code in that file, inserting the data that firebase gave you from step 7 into the appropriate fields.
  ```
    app.constant("FIREBASE_CONFIG", {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
})

app.run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
})
```
  10.To run the app in the browser run http server from your terminal.
  
  # Using teacherHUB
  
  1. To begin using the app you need to first register for an account.
  2. Once registered you will be taken to the teacher dashboard.
  3. To get started simply create a class and you are ready to go!
  4. You can add students to a class via the students tab, or by clicking the affordance to the right of the class name on the class Dashboard page.
  5. To add an assignment go to the assignments page and complete the assignment create form.
  6. To grade assignments click on the assignment from the class dashboard and add student grades.  They are updated to the database automatically.
  
