angular.module("TeacherHub").controller("assignmentDashCtrl", function($scope, assignmentFactory, assignmentClassFactory, studentFactory, classStudentFactory, classFactory, gradeFactory, $routeParams){
    $scope.students = []
    $scope.currentClass = classFactory.currentClass
    $scope.currentAssignment = null
    $scope.assignmentId = $routeParams.assignmentId
    $scope.myAssignment = null

    $scope.getStudents = function() {
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
            })
            
            let newStudent = {
                "firstName": studentObj[0].studentFirstName,
                "lastName": studentObj[0].studentLastName,
                "studentId": studentObj[0].id,
                "grade": gradeObject.grade,
                "classId": $scope.currentClass.id,
                "gradeId": gradeObject.id
            }
            console.log(studentObj)
            $scope.students.push(newStudent)
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

    $scope.getStudents()


})