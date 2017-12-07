angular.module("TeacherHub").controller("classDashCtrl", function($scope, $location, $routeParams, classFactory, classStudentFactory, studentFactory){
    $scope.currentClassRel = null
    $scope.myStudents = []

    $scope.getStudents = function (){
        $scope.myStudents = []
        classFactory.single($routeParams.classId).then(returnedClass => {
            $scope.currentClass = returnedClass
            classStudentFactory.get()
                .then(relArray=>{
                    let classRel = relArray.filter(rel=>{
                        return rel.classId === $scope.currentClass.id
                    })
                    $scope.currentClassRel = classRel
                    classRel.forEach(relationship=>{
                        let student = studentFactory.cachedStudents.filter(studentObj => {return studentObj.id===relationship.studentId})
                        $scope.myStudents.push(student[0])
                    })
                    console.log($scope.myStudents)
                })

        })
    }

    $scope.getStudents()

    $scope.deleteStudentFromClass = function(studentObj){
        console.log($scope.myStudents)
        let relToDelete =  $scope.currentClassRel.filter(rel=>{return rel.studentId===studentObj.id})
        console.log(relToDelete)
        classStudentFactory.deleteRel(relToDelete[0].classStudentId).then(()=>{
            $scope.getStudents()
        })
    }
    $scope.addStudentForm = function(){
        $location.url("/students/addStudent")
    }

})