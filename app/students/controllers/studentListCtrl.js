angular.module("TeacherHub").controller("studentListCtrl", function($scope, studentFactory){
    studentFactory.getStudents()
        .then(studentsList => {
            $scope.students = studentsList
        })
})