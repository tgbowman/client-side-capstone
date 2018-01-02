angular.module("TeacherHub").controller("teacherDashCtrl", function($scope, userFactory, AuthFactory, classFactory, studentFactory, classStudentFactory, $location, assignmentFactory, assignmentClassFactory, gradeFactory, disciplineFactory){
    userFactory.getUser().then(user => {

        $scope.firstName = user.firstName
        $scope.updateCaches()
    })

    
    $scope.classList = function() {
        $location.url("/classes/classList")
    }
    $scope.updateCaches = function () {
        classFactory.getClasses().then(r=>{
            gradeFactory.get()
        })
        studentFactory.getStudents()
        classStudentFactory.get()
        assignmentFactory.get()
        assignmentClassFactory.get()
        disciplineFactory.get()
        userFactory.getAll()
    }

    $scope.assignmentForm = function(){
        $location.url("/assignments/assignmentCreator")
    }

    $scope.disciplineForm = function(){
        $location.url("/discipline/disciplineForm")
    }

    $scope.studentList = function(){
        $location.url("/students/studentList")
    }


})
