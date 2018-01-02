angular.module("TeacherHub").controller("assignmentDashCtrl", function($scope, assignmentFactory, assignmentClassFactory, studentFactory, classStudentFactory, classFactory, gradeFactory, $routeParams, $location){
    $scope.students = []
    $scope.currentClass = classFactory.currentClass
    $scope.currentAssignment = null
    $scope.assignmentId = $routeParams.assignmentId
    $scope.myAssignment = null

    $scope.currentAssignment = assignmentFactory.assignmentCache.filter(ass=> {
        return $scope.assignmentId === ass.id
    })[0]
    console.log("The current assignment is:", $scope.currentAssignment)
    assignmentFactory.currentAssignment = $scope.currentAssignment
    assignmentFactory.editMode.assId = $scope.currentAssignment.id

    $scope.getStudents = function() {
        console.log($scope.currentClass.id)
        $scope.myAssignment = assignmentClassFactory.assignmentRelCache.filter(rel=>{return rel.classId === $scope.currentClass.id && rel.assignmentId === $scope.assignmentId })
        $scope.assignmentName = assignmentFactory.assignmentCache.filter(assignmentObj => {return assignmentObj.id === $scope.myAssignment[0].assignmentId})[0].title
        console.log($scope.myAssignment)
        
        let gradeArray = gradeFactory.gradeCache.filter(grade => {return grade.assignmentClassId === $scope.myAssignment[0].id})
        console.log(gradeArray)
        gradeArray.forEach(gradeObject=>{
            console.log(gradeObject)
            console.log(studentFactory.cachedStudents)
            let studentObj = studentFactory.cachedStudents.filter(student=>{
                return student.id === gradeObject.studentId
            })[0]
            if(studentObj){
                console.log(studentObj)
                let newStudent = {
                    "firstName": studentObj.studentFirstName,
                    "lastName": studentObj.studentLastName,
                    "studentId": studentObj.id,
                    "grade": gradeObject.grade,
                    "classId": $scope.currentClass.id,
                    "gradeId": gradeObject.id
                }
                console.log(studentObj)
                $scope.students.push(newStudent)}
        })
        console.log($scope.students)
    }

    $scope.updateGrade = function(studentObj){
        
        let gradeObj = gradeFactory.gradeCache.filter(grade=>{return studentObj.studentId === grade.studentId && $scope.myAssignment[0].id === grade.assignmentClassId})
        gradeObj[0].grade = studentObj.grade
        console.log(gradeObj)
        
        
        gradeFactory.update(gradeObj[0])
            .then(r=>{
                console.log("grade updated successfully")
            })
    }

    $scope.toEdit = function(){
        assignmentFactory.editMode.enabled = true
        $location.url("/assignments/assignmentCreator")
    }
    
    

    $scope.backToClass = function() {
        $location.url(`/classes/classDash/${$scope.currentClass.id}`)
    }

    $scope.getStudents()
    


})