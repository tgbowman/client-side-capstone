angular.module("TeacherHub").controller("studentDashCtrl", function($scope, $location, gradeFactory, classFactory, classStudentFactory, assignmentClassFactory, assignmentFactory, $routeParams, studentFactory){
    
    
    let getClasses = function() {
        let currentStudentId = $routeParams.studentId
        $scope.currentStudent = studentFactory.cachedStudents.filter(student=>{return student.id === currentStudentId})[0]

        studentFactory.currentStudent = $scope.currentStudent

        let studentClassRel= classStudentFactory.relCache.filter(rel=>{return rel.studentId === currentStudentId})
    

        $scope.classes = []
        studentClassRel.forEach(classRel => {
            let currentClass = classFactory.classCache.filter(clazz =>{return clazz.id === classRel.classId})[0]

            let overallGrade = gradeFactory.overall(currentClass.id, currentStudentId)

            currentClass.grade = overallGrade
            $scope.classes.push(currentClass)
        })}

    getClasses()









})