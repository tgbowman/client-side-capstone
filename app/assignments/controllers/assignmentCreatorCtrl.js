angular.module("TeacherHub").controller("assignmentCreateCtrl", function ($scope, assignmentFactory, classFactory, assignmentClassFactory, classStudentFactory, gradeFactory, $location) {
    $scope.classes = []
    $scope.newAssignment = {}

    //this populates the "class" select boxes in the assignment creator form
    $scope.getClasses = function () {
        let allClasses = classFactory.classCache

        allClasses.forEach(clazz => {
            let classObj = {
                "title": clazz.name,
                "classId": clazz.id,
                "enabled": false
            }
            $scope.classes.push(classObj)

        })
    }
    $scope.getClasses()

    //this checks to see if this is an edit to an existing assignment and sets the values of the input fields to the current assignments values
    $scope.edit = function () {
        if (assignmentFactory.editMode.enabled === true) {
            $scope.buttonText = "Update Assignment"
            $scope.newAssignment.title = assignmentFactory.currentAssignment.title
            $scope.newAssignment.description = assignmentFactory.currentAssignment.description
            $scope.newAssignment.dueDate = assignmentFactory.currentAssignment.dueDate

        }
    }
    $scope.edit()

    //clears form fields so another assignment can be created
    $scope.clearFields = function () {
        $scope.newAssignment.title = ""
        $scope.newAssignment.description = ""
        $scope.newAssignment.dueDate = ""
        $scope.classes.forEach(clazz => {
            clazz.enabled = false
        })
    }

    //function that adds or updates an assignment
    $scope.addAssignment = function () {
        //checks to see if this is an edit or a new assignment
        if (assignmentFactory.editMode.enabled === true) {
            assignmentFactory.update(assignmentFactory.editMode.assId, $scope.newAssignment)
                .then(r => {
                    assignmentFactory.editMode.enabled = false
                    Materialize.toast("Assignment Updated!", 2000)
                    $scope.clearFields()
                    console.log("Assignment Updated Successfully")
                })
        } else {
            assignmentFactory.add($scope.newAssignment)
                .then(rData => {
                    let classesToAdd = $scope.classes.filter(classObj => { return classObj.enabled === true })
                    classesToAdd.forEach(clazz => {
                        let newAssignmentRelObj = {
                            "assignmentId": rData.data.name,
                            "classId": clazz.classId
                        }
                        assignmentClassFactory.add(newAssignmentRelObj)
                            .then(r => {
                                console.log(clazz)
                                let studentsRel = classStudentFactory.relCache.filter(rel => { return rel.classId === clazz.classId })
                                console.log(studentsRel)
                                studentsRel.forEach(studentRelObj => {
                                    let newGradeObj = {
                                        "assignmentClassId": r.data.name,
                                        "studentId": studentRelObj.studentId,
                                        "grade": 0
                                    }
                                    gradeFactory.add(newGradeObj)
                                        .then(r => {
                                            console.log("studentGradeObj created")
                                        })

                                }
                                )
                                $scope.clearFields()
                                Materialize.toast("Assignment Created!", 2000)
                                console.log("class relationship added successfully")
                            })
                    })
                })
        }
    }


    $scope.classList = function () {
        $location.url("/classes/classList")
    }

    //materialize code for the date select box
    $(".datepicker").pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: "Today",
        clear: "Clear",
        close: "Ok",
        closeOnSelect: false // Close upon selecting a date,
    })

})