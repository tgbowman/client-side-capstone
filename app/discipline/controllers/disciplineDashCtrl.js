angular.module("TeacherHub").controller("disciplineDashCtrl", function ($scope, disciplineFactory, studentFactory, classFactory, $routeParams, userFactory, $window) {
    let incidentId = $routeParams.incidentId
    $scope.incident = disciplineFactory.disciplineCache.filter(disc => { return disc.id === incidentId })[0]

    $scope.incidentClass = classFactory.classCache.filter(clazz => { return clazz.id === $scope.incident.classId })[0]

    $scope.student = studentFactory.cachedStudents.filter(student => { return student.id === $scope.incident.studentId })[0]

    $scope.teacher = userFactory.userCache.filter(user => { return user.id === $scope.incident.teacherId })[0]

    $scope.emailReport = function (emailId) {
        let adminEmail = "admin@admin.com"
        let message = `To the parent of guardian of ${$scope.student.studentFirstName} ${$scope.student.studentLastName}:%0D%0A %0D%0A This email is to let you know that there was an incident in ${$scope.incidentClass.name} class today involving ${$scope.student.studentFirstName}.  I have written a discipline referral and sent it to administration.  Below you will find a copy of the referral.%0D%0A %0D%0A Incident Report:%0D%0A Student: ${$scope.student.studentFirstName} ${$scope.student.studentLastName}%0D%0A Class: ${$scope.incidentClass.name}%0D%0A Date of Incident: ${$scope.incident.date}%0D%0A Infraction: ${$scope.incident.infraction}%0D%0A Infraction Details: ${$scope.incident.details}%0D%0A %0D%0A If you have any questions about the incident please don't hesitate to contact me via email.%0D%0A %0D%0A I hope your day is going well!%0D%0A %0D%0ASincerely,%0D%0A ${$scope.teacher.firstName} ${$scope.teacher.lastName}  `

        let subject = `${$scope.student.studentFirstName} ${$scope.student.studentLastName} Classroom Incident`

        $window.open("mailto:" + emailId + "?cc=" + adminEmail + "&subject=" + subject + "&body=" + message, "_self")
    }


})