angular.module("TeacherHub").controller("disciplineFormCtrl", function($scope, studentFactory, disciplineFactory, classFactory, userFactory, classStudentFactory, $location){

    $scope.newDiscipline = {}
    $scope.currentUser = userFactory.currentUser
    $scope.classes = classFactory.classCache.filter(clazz=> {return clazz.teacherId === $scope.currentUser.id})
    $scope.students = []
    $scope.selectedClass = null

    $scope.getStudents = function(){
        $scope.students = []
        let classStudentRel = classStudentFactory.relCache.filter(classRel => {return classRel.classId === $scope.newDiscipline.classId})
        classStudentRel.forEach(studentRel => {
            let student = studentFactory.cachedStudents.filter(studentObj => {return studentRel.studentId === studentObj.id})[0]
            $scope.students.push(student)
        })
    }

    $scope.addDiscipline = function(){
        $scope.newDiscipline.teacherId = $scope.currentUser.id

        disciplineFactory.add($scope.newDiscipline).then(r=>
            $location.url(`/discipline/disciplineDash/${r.data.name}`)
        )
    }

    $scope.infractions = [
        "Inappropriate Language",
        "Disrespect",
        "Willfull and Persistant Refusal to Follow Rules",
        "Sleeping in Class",
        "Under the Influence of a Prohibited Substance",
        "Inappropriate Classroom Behavior"
    ]
})

