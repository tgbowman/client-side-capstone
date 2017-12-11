angular.module("TeacherHub").controller("disciplineDashCtrl", function($scope, disciplineFactory, studentFactory, classFactory, $routeParams, userFactory){
    let incidentId = $routeParams.incidentId
    $scope.incident = disciplineFactory.disciplineCache.filter(disc=> {return disc.id === incidentId})[0]

    $scope.incidentClass = classFactory.classCache.filter(clazz=>{return clazz.id === $scope.incident.classId})[0]

    $scope.student = studentFactory.cachedStudents.filter(student=>{return student.id === $scope.incident.studentId})[0]

    $scope.teacher = userFactory.userCache.filter(user=>{return user.id === $scope.incident.teacherId})[0]
})