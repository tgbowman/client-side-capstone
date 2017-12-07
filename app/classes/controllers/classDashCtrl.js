angular.module("TeacherHub").controller("classDashCtrl", function($scope, $location, $routeParams, classFactory){
    $scope.currentClass = null
    classFactory.single($routeParams.classId).then(returnedClass => {
        console.log(returnedClass)
        $scope.currentClass = returnedClass
    })

    $scope.addStudentForm = function(){
        $location.url("/students/addStudent")
    }

       
    
})