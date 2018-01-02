angular.module("TeacherHub").controller("classListCtrl", function($scope, $location, userFactory, classFactory, classStudentFactory, $timeout){
    let currentUser = userFactory.currentUser
    $scope.firstName = currentUser.firstName
    $scope.classes = classFactory.classCache

    $scope.addClass = function() {
        $location.url("/classes/classCreator")
    }

    $scope.deleteClass = function(classId){
        classFactory.deleteClass(classId)
            .then(r=>{
                $timeout($scope.classes = classFactory.classCache, 500)
                console.log("class successfully deleted")
                let relArray = classStudentFactory.relCache
                if(relArray.length > 0){
                    relArray.forEach(rel=>{
                        if(rel.classId === classId){
                            classStudentFactory.deleteRel(rel.classStudentId)
                                .then((returnData)=>{
                                    let classAssignmentArray = assignmentClassFactory.assignmentRelCache.filter(assRel=>{})
                                    gradeFactory.delete()
                                    console.log("class StudentRelationship Deleted")
                                })
                        }
                    })
                }
            })
    }

})