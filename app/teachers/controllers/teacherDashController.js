angular.module("TeacherHub").controller("teacherDashCtrl", function($scope, userFactory, AuthFactory, classFactory, studentFactory, classStudentFactory, $location){
    userFactory.getUser().then(user => {

        $scope.firstName = user.firstName
    })

    $scope.addClass = function() {
        $location.url("/classes/classCreator")
    }

    $scope.classList = function() {
        $location.url("/classes/classList")
    }
    $scope.updateCaches = function () {
        classFactory.getClasses()
        studentFactory.getStudents()
        classStudentFactory.get()
    }
    $scope.updateCaches()

})
