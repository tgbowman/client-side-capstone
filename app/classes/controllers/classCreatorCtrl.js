angular.module("TeacherHub").controller("classCreatorCtrl", function($scope, $location, userFactory, classFactory, $timeout) {
    let currentUser = userFactory.currentUser
    $scope.newClass = {
        "teacherId": currentUser.id
    }
    $scope.createClass= function(classObj) {
        classFactory.createClass(classObj).then(returnedId => {
            return returnedId.data.name

        }).then( classId => {
            $timeout(function(){
                $location.url(`/classes/classDash/${classId}`)

            }, 500)
        })
    
    }




})