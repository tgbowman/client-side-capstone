angular.module("TeacherHub").controller("classDashCtrl", function($scope, $location, $routeParams, classFactory, classStudentFactory, studentFactory, assignmentClassFactory, assignmentFactory, gradeFactory){
    $scope.currentClassRel = null
    $scope.currentAssRel = null
    $scope.myStudents = []
    $scope.myAssignments = []

    $scope.getData = function (){
        $scope.myStudents = []
        $scope.myAssignments = []
        classFactory.single($routeParams.classId).then(returnedClass => {
            $scope.currentClass = returnedClass
            classStudentFactory.get()
                .then(relArray=>{
                    let classRel = relArray.filter(rel=>{
                        return rel.classId === $scope.currentClass.id
                    })
                    $scope.currentClassRel = classRel
                    classRel.forEach(relationship=>{
                        //get students enrolled in this class
                        let student = studentFactory.cachedStudents.filter(studentObj => {return studentObj.id===relationship.studentId})
                        //calculate their overall grade for this class
                        let overallGrade = gradeFactory.overall($routeParams.classId, student[0].id)
                        student[0].overallGrade = overallGrade
                        $scope.myStudents.push(student[0])
                    })
                    console.log($scope.myStudents)
                })
            let assRelArray = assignmentClassFactory.assignmentRelCache
            console.log(assRelArray)
            let assRel = assRelArray.filter(r=>{
                return r.classId === $scope.currentClass.id
            })
            $scope.currentAssRel = assRel
            console.log(assRel)
            assRel.forEach(relation => {
                let assignment = assignmentFactory.assignmentCache.filter(assignmentObj => {
                    return assignmentObj.id === relation.assignmentId
                })
                $scope.myAssignments.push(assignment[0])
            })
            console.log($scope.myAssignments)
        }) 
    }  
       

    $scope.getData()

    $scope.deleteStudentFromClass = function(studentObj){
        console.log($scope.myStudents)
        let relToDelete =  $scope.currentClassRel.filter(rel=>{return rel.studentId===studentObj.id})
        console.log(relToDelete)
        classStudentFactory.deleteRel(relToDelete[0].classStudentId).then(()=>{
            $scope.getData()
        })
    }

    $scope.deleteAssignmentFromClass = function(assignmentObj){
        let assToDelete = $scope.currentAssRel.filter(rel=>{return rel.assignmentId === assignmentObj.id})[0]
        assignmentClassFactory.delete(assToDelete.id).then(()=>{
            let gradesToDelete = gradeFactory.gradeCache.filter(grade=>{return grade.assignmentClassId === assToDelete.id})
            gradesToDelete.forEach(grade=>{
                gradeFactory.delete(grade.id).then(r=>console.log("student grade deleted successfully"))
            })
            let stillInAssignments = assignmentFactory.assignmentCache.filter(assignment => {return assignment.assignmentId === assignmentObj.id})
            console.log(stillInAssignments)
            if(stillInAssignments.length === 0){
                console.log(assignmentObj)
                assignmentFactory.delete(assignmentObj.id)
                    .then(r=>{
                        console.log("Assignment completely deleted")
                    })
            }
            $scope.getData()
        })
    }
    $scope.addStudentForm = function(){
        $location.url("/students/addStudent")
    }

    $scope.getAssignments = function() {
        
    }

})