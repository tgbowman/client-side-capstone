angular.module("TeacherHub").controller("studentDashCtrl", function ($scope, $location, gradeFactory, classFactory, classStudentFactory, assignmentClassFactory, assignmentFactory, $routeParams, studentFactory, disciplineFactory) {
    let currentStudentId = $routeParams.studentId
    $scope.currentStudent = studentFactory.cachedStudents.filter(student => { return student.id === currentStudentId })[0]

    if ($scope.currentStudent.profilePicURL) {
        let profilePicRef = firebase.storage().refFromURL("gs://client-side-caps.appspot.com/profile_pics/" + $scope.currentStudent.profilePicURL)
        $scope.profilePic = profilePicRef.getDownloadURL().then(url => {
            let profilePicIMG = document.getElementById("studentProfilePic")
            profilePicIMG.src = url
        })
    } else {
        let profilePicRef = firebase.storage().refFromURL("gs://client-side-caps.appspot.com/profile_pics/default.png")
        $scope.profilePic = profilePicRef.getDownloadURL().then(url => {
            let profilePicIMG = document.getElementById("studentProfilePic")
            profilePicIMG.src = url
        })
    }




    let getClasses = function () {
        studentFactory.currentStudent = $scope.currentStudent

        let studentClassRel = classStudentFactory.relCache.filter(rel => { return rel.studentId === currentStudentId })


        $scope.classes = []
        studentClassRel.forEach(classRel => {
            let currentClass = classFactory.classCache.filter(clazz => { return clazz.id === classRel.classId })[0]

            if (currentClass) {
                let overallGrade = gradeFactory.overall(currentClass.id, currentStudentId)
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

                currentClass.grade = overallGrade
                currentClass.letterGrade = letterGrade
                $scope.classes.push(currentClass)
            }
        })
    }

    let getDiscipline = function () {
        $scope.incidents = disciplineFactory.disciplineCache.filter(inc => { return inc.studentId === currentStudentId })
        if ($scope.incidents.length > 0) {
            $scope.incidents.forEach(incident => {
                let incidentClass = classFactory.classCache.filter(clazz => { return clazz.id === incident.classId })[0]
                if (incidentClass) {
                    incident.className = incidentClass.name
                }
            })
        }
    }


    getClasses()
    getDiscipline()









})