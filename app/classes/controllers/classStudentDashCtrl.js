angular.module("TeacherHub").controller("classStudentDashCtrl", function ($scope, studentFactory, assignmentFactory, assignmentClassFactory, gradeFactory, classFactory, $routeParams) {

    google.charts.load("current", { packages: ["corechart", "bar"] })
    google.charts.setOnLoadCallback(drawClassStudentGradeChart)

    $scope.currentStudent = studentFactory.currentStudent
    $scope.currentClass = classFactory.classCache.filter(clazz => { return clazz.id === $routeParams.classId })[0]
    classFactory.currentClass = $scope.currentClass

    let getGrades = function () {
        console.log($scope.currentClass)
        let classAssignments = assignmentClassFactory.assignmentRelCache.filter(classRel => { return classRel.classId === $scope.currentClass.id })

        $scope.assignments = []

        classAssignments.forEach(assignmentRel => {
            let currentAssignment = assignmentFactory.assignmentCache.filter(assignment => { return assignmentRel.assignmentId === assignment.id })[0]

            let gradeObj = gradeFactory.gradeCache.filter(gradeObj => { return gradeObj.studentId === $scope.currentStudent.id && gradeObj.assignmentClassId === assignmentRel.id })[0]
            if (gradeObj) {
                let letterGrade = null
                if (gradeObj.grade >= 0 && gradeObj.grade <= 69) {
                    letterGrade = "F"
                } else {
                    if (gradeObj.grade > 69 && gradeObj.grade <= 74) {
                        letterGrade = "D"
                    } else {
                        if (gradeObj.grade > 74 && gradeObj.grade <= 84) {
                            letterGrade = "C"
                        } else {
                            if (gradeObj.grade > 84 && gradeObj.grade <= 92) {
                                letterGrade = "B"
                            } else {
                                if (gradeObj.grade > 92) {
                                    letterGrade = "A"
                                }
                            }
                        }
                    }
                }
                currentAssignment.grade = gradeObj.grade
                currentAssignment.letterGrade = letterGrade

                $scope.assignments.push(currentAssignment)
            }
        })
    }

    function drawClassStudentGradeChart() {
        let gradeData = []
        let classAssignmentsArray = assignmentClassFactory.assignmentRelCache.filter(rel => { return rel.classId === $scope.currentClass.id })
        classAssignmentsArray.forEach(assignment => {

            let studentGrade = gradeFactory.gradeCache.filter(grade => { return grade.assignmentClassId === assignment.id && grade.studentId === $scope.currentStudent.id })[0]
            if (studentGrade && studentGrade.grade != "X") {

                let classAverage = gradeFactory.classAverageCache.filter(average => { return average.assignmentClassId === assignment.id })[0].classAverage

                let assignmentObj = assignmentFactory.assignmentCache.filter(assignmentObj => { return assignmentObj.id === assignment.assignmentId })[0]

                let dataPoint = [assignmentObj.title, parseInt(studentGrade.grade), classAverage]

                gradeData.push(dataPoint)
            }

        })
        console.log(gradeData)
        var data = new google.visualization.DataTable()
        data.addColumn("string", "Assignment")
        data.addColumn("number", `${$scope.currentStudent.studentFirstName}`)
        data.addColumn("number", "Class Average")

        data.addRows(gradeData)

        var options = {
            hAxis: {
                title: "Assignment"
            },
            vAxis: {
                title: "Grade (%)"
            },
            animation: {
                startup: true,
                duration: 2000,
                easing: "out"
            }
        }

        var chart = new google.visualization.LineChart(document.getElementById("classStudentGrade_chart"))

        chart.draw(data, options)
    }
    $scope.letterGrade = null
    $scope.overallGrade = gradeFactory.overall($scope.currentClass.id, $scope.currentStudent.id)
    if ($scope.overallGrade >= 0 && $scope.overallGrade <= 69) {
        $scope.letterGrade = "F"
    } else {
        if ($scope.overallGrade > 69 && $scope.overallGrade <= 74) {
            $scope.letterGrade = "D"
        } else {
            if ($scope.overallGrade > 74 && $scope.overallGrade <= 84) {
                $scope.letterGrade = "C"
            } else {
                if ($scope.overallGrade > 84 && $scope.overallGrade <= 92) {
                    $scope.letterGrade = "B"
                } else {
                    if ($scope.overallGrade > 92) {
                        $scope.letterGrade = "A"
                    }
                }
            }
        }
    }
    getGrades()


})