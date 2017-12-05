angular.module("TeacherHub").controller("classCreatorCtrl", function($scope, $location, userFactory, classFactory) {
    let currentUser = userFactory.currentUser
    $scope.newClass = {
        "teacherId": currentUser.id
    }
    $scope.createClass= function(classObj) {
        classFactory.createClass(classObj)
        $location.url("/teacherHub/classDash")
    
    }




})