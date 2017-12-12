angular.module("TeacherHub").controller("classStudentDashCtrl", function($scope, studentFactory, assignmentFactory, assignmentClassFactory, gradeFactory, classFactory, $routeParams){
    $scope.currentStudent = studentFactory.currentStudent
    $scope.currentClass = classFactory.classCache.filter(clazz=> {return clazz.id === $routeParams.classId})[0]
    classFactory.currentClass = $scope.currentClass
    let getGrades = function(){
        console.log($scope.currentClass)
        let classAssignments = assignmentClassFactory.assignmentRelCache.filter(classRel => {return classRel.classId === $scope.currentClass.id})

        $scope.assignments =[]

        classAssignments.forEach(assignmentRel => {
            let currentAssignment = assignmentFactory.assignmentCache.filter(assignment=> {return assignmentRel.assignmentId === assignment.id})[0]

            let gradeObj = gradeFactory.gradeCache.filter(gradeObj => {return gradeObj.studentId === $scope.currentStudent.id && gradeObj.assignmentClassId === assignmentRel.id})[0]

            currentAssignment.grade = gradeObj.grade

            $scope.assignments.push(currentAssignment)

        })
    }

    function drawClassStudentGradeChart() {
        let gradeData = []
        


        var data = new google.visualization.DataTable()
        data.addColumn("string", "Assignment")
        data.addColumn("number", `${$scope.currentStudent.studentFirstName}`)
        data.addColumn("number", "Class Average")
        
        data.addRows(gradeData)
        
        var options = {
            hAxis: {
                title: "Time"
            },
            vAxis: {
                title: "Popularity"
            }
        }
        
        var chart = new google.visualization.LineChart(document.getElementById("chart_div"))
        
        chart.draw(data, options)
    }

    $scope.overallGrade = gradeFactory.overall($scope.currentClass.id, $scope.currentStudent.id)

    getGrades()


})