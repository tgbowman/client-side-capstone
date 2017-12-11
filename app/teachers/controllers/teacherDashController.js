angular.module("TeacherHub").controller("teacherDashCtrl", function($scope, userFactory, AuthFactory, classFactory, studentFactory, classStudentFactory, $location, assignmentFactory, assignmentClassFactory, gradeFactory, disciplineFactory){
    userFactory.getUser().then(user => {

        $scope.firstName = user.firstName
        $scope.updateCaches()
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
        assignmentFactory.get()
        assignmentClassFactory.get()
        gradeFactory.get()
        disciplineFactory.get()
        userFactory.getAll()
    }

    $scope.assignmentForm = function(){
        $location.url("/assignments/assignmentCreator")
    }

    $scope.disciplineForm = function(){
        $location.url("/discipline/disciplineForm")
    }


})
