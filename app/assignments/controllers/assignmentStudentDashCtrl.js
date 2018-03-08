angular.module("TeacherHub").controller("assignmentStudentDashCtrl", function ($scope, assignmentFactory, assignmentClassFactory, studentFactory, gradeFactory, $routeParams, classFactory) {
    google.charts.load("current", { packages: ["corechart", "bar"] })
    google.charts.setOnLoadCallback(drawStudentAssignmentChart)
    console.log(classFactory.currentClass)
    $scope.student = studentFactory.currentStudent
    $scope.assignment = assignmentFactory.assignmentCache.filter(assignment => { return assignment.id === $routeParams.assignmentId })[0]

    function drawStudentAssignmentChart() {
        let studentId = $scope.student.id
        let assignmentId = $scope.assignment.id
        let classId = classFactory.currentClass.id

        let assignmentClassId = assignmentClassFactory.assignmentRelCache.filter(rel => { return rel.classId === classId && rel.assignmentId === assignmentId })[0]

        let classAverage = gradeFactory.classAverageCache.filter(grade => { return grade.assignmentClassId === assignmentClassId.id })[0]

        let studentGrade = gradeFactory.gradeCache.filter(grade => { return grade.assignmentClassId === assignmentClassId.id && grade.studentId === studentId })[0]


        var data = google.visualization.arrayToDataTable([
            ["Name", "Grade"],
            ["Class Average", classAverage.classAverage],
            [`${studentFactory.currentStudent.studentFirstName}`, studentGrade.grade],
        ])

        var options = {
            chartArea: { width: "50%" },
            hAxis: {
                title: "Percentage",
                minValue: 0
            },
            animation: {
                startup: true,
                duration: 1500,
                easing: "out",
            },

        }

        var chart = new google.visualization.BarChart(document.getElementById("chart_div"))
        chart.draw(data, options)
    }

})