angular.module("TeacherHub").controller("studentDashCtrl", function($scope, $location, gradeFactory, classFactory, classStudentFactory, assignmentClassFactory, assignmentFactory, $routeParams, studentFactory, disciplineFactory){
    let currentStudentId = $routeParams.studentId
    $scope.currentStudent = studentFactory.cachedStudents.filter(student=>{return student.id === currentStudentId})[0]
    
    
    let getClasses = function() {
        studentFactory.currentStudent = $scope.currentStudent
        
        let studentClassRel= classStudentFactory.relCache.filter(rel=>{return rel.studentId === currentStudentId})
        
        
        $scope.classes = []
        studentClassRel.forEach(classRel => {
            let currentClass = classFactory.classCache.filter(clazz =>{return clazz.id === classRel.classId})[0]
            
            if(currentClass){
            let overallGrade = gradeFactory.overall(currentClass.id, currentStudentId)

            currentClass.grade = overallGrade
            $scope.classes.push(currentClass)
            }
        })}

    let getDiscipline = function() {
        $scope.incidents = disciplineFactory.disciplineCache.filter(inc=>{return inc.studentId === currentStudentId})
        if($scope.incidents.length > 0){
            $scope.incidents.forEach(incident=> {
                let incidentClass = classFactory.classCache.filter(clazz=>{return clazz.id === incident.classId})[0]
                if(incidentClass){
                    incident.className= incidentClass.name
                }
            })
        }
    }
    

    getClasses()
    getDiscipline()









})