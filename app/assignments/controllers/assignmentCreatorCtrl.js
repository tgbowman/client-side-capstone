angular.module("TeacherHub").controller("assignmentCreateCtrl", function($scope, assignmentFactory, classFactory, assignmentClassFactory, classStudentFactory, gradeFactory, $location){
    $scope.classes = []
    $scope.newAssignment = {}

    $scope.getClasses = function(){
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

    $scope.clearFields = function(){
        $scope.newAssignment.title = ""
        $scope.newAssignment.description = ""
        $scope.newAssignment.dueDate = ""
    }

    $scope.addAssignment = function(){
        assignmentFactory.add($scope.newAssignment)
            .then(rData => {
                $scope.clearFields()
                let classesToAdd = $scope.classes.filter(classObj => {return classObj.enabled === true})
                classesToAdd.forEach(clazz=>{
                    let newAssignmentRelObj = {
                        "assignmentId": rData.data.name,
                        "classId": clazz.classId
                    }
                    assignmentClassFactory.add(newAssignmentRelObj)
                        .then(r=>{
                            console.log(clazz)
                            let studentsRel = classStudentFactory.relCache.filter(rel=>{return rel.classId === clazz.classId})
                            console.log(studentsRel)
                            studentsRel.forEach(studentRelObj => {
                                let newGradeObj = {
                                    "assignmentClassId": r.data.name,
                                    "studentId": studentRelObj.studentId,
                                    "grade": 0
                                }
                                gradeFactory.add(newGradeObj)
                                    .then(r=>{
                                        console.log("studentGradeObj created")
                                    })
                                
                            }
                            )
                            console.log("class relationship added successfully")
                        })
                })
            })
    }

    $scope.classList = function() {
        $location.url("/classes/classList")
    }


})