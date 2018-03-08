angular.module("TeacherHub").controller("classDashCtrl", function ($scope, $location, $routeParams, classFactory, classStudentFactory, studentFactory, assignmentClassFactory, assignmentFactory, gradeFactory) {

    $scope.studentDeleteMode = false
    $scope.assignmentDeleteMode = false

    $scope.currentClassRel = null
    $scope.currentAssRel = null
    $scope.myStudents = []
    $scope.myAssignments = []



    $scope.test = function () { alert("you clicked me") }

    $scope.getData = function () {
        $scope.myStudents = []
        $scope.myAssignments = []
        //get the currentClass from firebase
        classFactory.single($routeParams.classId).then(returnedClass => {
            $scope.currentClass = returnedClass
            classStudentFactory.get()
                .then(relArray => {
                    let classRel = relArray.filter(rel => {
                        return rel.classId === $scope.currentClass.id
                    })
                    $scope.currentClassRel = classRel
                    classRel.forEach(relationship => {
                        //get students enrolled in this class
                        let student = studentFactory.cachedStudents.filter(studentObj => { return studentObj.id === relationship.studentId })
                        //calculate their overall grade for this class
                        let overallGrade = gradeFactory.overall($routeParams.classId, student[0].id)
                        let letterGrade = null
                        if (overallGrade >= 0 && overallGrade <= 69) {
                            letterGrade = "F"
                        } else {
                            if (overallGrade > 69 && overallGrade <= 74) {
                                letterGrade = "D"
                            } else {
                                if (overallGrade > 74 && overallGrade <= 84) {
                                    letterGrade = "C"
                                } else {
                                    if (overallGrade > 84 && overallGrade <= 92) {
                                        letterGrade = "B"
                                    } else {
                                        if (overallGrade > 92) {
                                            letterGrade = "A"
                                        }
                                    }
                                }
                            }
                        }
                        student[0].overallGrade = overallGrade
                        student[0].letterGrade = letterGrade
                        $scope.myStudents.push(student[0])
                    })
                    console.log($scope.myStudents)
                })
            //get all class assignments from firebase
            let assRelArray = assignmentClassFactory.assignmentRelCache
            console.log(assRelArray)
            let assRel = assRelArray.filter(r => {
                return r.classId === $scope.currentClass.id
            })
            $scope.currentAssRel = assRel
            console.log(assRel)
            //filter through the assignments database and push each assignment object into the myAssignments array
            assRel.forEach(relation => {
                let assignment = assignmentFactory.assignmentCache.filter(assignmentObj => {
                    return assignmentObj.id === relation.assignmentId
                })
                $scope.myAssignments.push(assignment[0])
            })
            console.log($scope.myAssignments)
            console.log($scope.currentClass)
        })
    }


    $scope.getData()

    $scope.deleteClass = function (classId) {
        classFactory.deleteClass(classId)
            .then(r => {
                $timeout($scope.classes = classFactory.classCache, 500)
                console.log("class successfully deleted")
                let relArray = classStudentFactory.relCache
                if (relArray.length > 0) {
                    relArray.forEach(rel => {
                        if (rel.classId === classId) {
                            classStudentFactory.deleteRel(rel.classStudentId)
                                .then((returnData) => {
                                    let classAssignmentArray = assignmentClassFactory.assignmentRelCache.filter(assRel => { })
                                    gradeFactory.delete()
                                    console.log("class StudentRelationship Deleted")
                                })
                        }
                    })
                }
            })
    }

    $scope.studentDeleteModeToggle = function () {
        if ($scope.studentDeleteMode === false) {
            $scope.studentDeleteMode = true
        }
        else { $scope.studentDeleteMode = false }
    }
    $scope.assignmentDeleteModeToggle = function () {
        if ($scope.assignmentDeleteMode === false) {
            $scope.assignmentDeleteMode = true
        } else { $scope.assignmentDeleteMode = false }
    }
    //function to delete a student from the class
    $scope.deleteStudentFromClass = function (studentObj) {
        console.log($scope.myStudents)
        let relToDelete = $scope.currentClassRel.filter(rel => { return rel.studentId === studentObj.id })
        console.log(relToDelete)
        classStudentFactory.deleteRel(relToDelete[0].classStudentId).then(() => {
            $scope.getData()
        })

        $scope.deleteMode = false
    }

    //function to delete an assignment from the class
    $scope.deleteAssignmentFromClass = function (assignmentObj) {
        let assToDelete = $scope.currentAssRel.filter(rel => { return rel.assignmentId === assignmentObj.id })[0]
        assignmentClassFactory.delete(assToDelete.id).then(() => {
            let gradesToDelete = gradeFactory.gradeCache.filter(grade => { return grade.assignmentClassId === assToDelete.id })
            gradesToDelete.forEach(grade => {
                gradeFactory.delete(grade.id).then(r => console.log("student grade deleted successfully"))
            })
            //filters throught the assignment/Class Database to check if the assignmet is still being used in another class
            let stillInAssignments = assignmentClassFactory.assignmentRelCache.filter(assignment => { return assignment.assignmentId === assignmentObj.id })
            console.log(stillInAssignments)
            //if it isn't the assignment is deleted from the assignment array
            if (stillInAssignments.length === 0) {
                console.log(assignmentObj)
                assignmentFactory.delete(assignmentObj.id)
                    .then(r => {
                        console.log("Assignment completely deleted")
                    })
            }
            $scope.getData()
        })
    }
    $scope.addStudentForm = function () {
        $location.url("/students/addStudent")
    }




    $(".dropdown-button").dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: "left", // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    }
    )


})