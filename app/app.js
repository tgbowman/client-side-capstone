let app = angular.module("TeacherHub", ["ngRoute"])


const isAuth = AuthFactory => new Promise ((resolve, reject) => {
    if (AuthFactory.isAuthenticated()){
        console.log("User is authenticated, resolve route promise")
        resolve()
    } else {
        console.log("User is not authenticated, reject route promise")
        reject()
    }
})

angular.module("TeacherHub").config(function ($routeProvider){
    $routeProvider
        .when("/auth", {
            templateUrl:"../app/auth/partials/login.html",
            controller: "AuthCtrl"
        })
        .when("/auth/register", {
            templateUrl: "../app/auth/partials/register.html",
            controller: "AuthCtrl"
        })
        .when("/teachers/teacherDash", {
            templateUrl: "../app/teachers/partials/teacherDash.html",
            controller: "teacherDashCtrl",
            resolve: {isAuth}
        })
        .when("/classes/classList", {
            templateUrl: "../app/classes/partials/classList.html",
            controller: "classListCtrl",
            resolve: {isAuth}
        })
        .when("/assignments/assignmentDash/:assignmentId", {
            templateUrl:"../app/assignments/partials/assignmentDash.html",
            controller: "assignmentDashCtrl",
            resolve: {isAuth}
        })
        .when("/assignments/assignmentCreator", {
            templateUrl:"../app/assignments/partials/assignmentCreator.html",
            controller: "assignmentCreateCtrl",
            resolve: {isAuth}
        })
        .when("/classes/classCreator", {
            templateUrl:"../app/classes/partials/classCreator.html",
            controller:"classCreatorCtrl",
            resolve: {isAuth}
        })
   
        .when("/classes/classDash/:classId", {
            templateUrl:"../app/classes/partials/classDash.html",
            controller:"classDashCtrl",
            resolve: {isAuth}
        })
        .when("/students/addStudent",{
            templateUrl:"../app/students/partials/addStudent.html",
            controller:"addStudentCtrl",
            resolve: {isAuth}
        })
        .when("/students/studentList", {
            templateUrl: "../app/students/partials/studentList.html",
            controller:"studentListCtrl",
            resolve: {isAuth}
        })
        .when("/students/studentDash/:studentId", {
            templateUrl:"../app/students/partials/studentDash.html",
            controller:"studentDashCtrl",
            resolve: {isAuth}
        })
        .when("/classes/classStudentDash/:classId", {
            templateUrl:"../app/classes/partials/classStudentDash.html",
            controller:"classStudentDashCtrl",
            resolve:{isAuth}
        })
        .when("/discipline/disciplineForm", {
            templateUrl:"../app/discipline/partials/disciplineForm.html",
            controller:"disciplineFormCtrl",
            resolve: {isAuth}
        })
        .when("/discipline/disciplineDash/:incidentId", {
            templateUrl:"../app/discipline/partials/disciplineDash.html",
            controller:"disciplineDashCtrl",
            resolve:{isAuth}
        })
})

