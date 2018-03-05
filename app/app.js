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
        .when("/teachers/teacherDash", {
            templateUrl: "../teachers/partials/teacherDash.html",
            controller: "teacherDashController",
            resolve: {isAuth}
        })
        .when("/classes/classList", {
            templateUrl: "../classes/partials/classList.html",
            controller: "classListCtrl",
            resolve: {isAuth}
        })
        .when("/")
})

