angular.module("TeacherHub").controller("classListCtrl", function($scope, $location, userFactory, classFactory){
    let currentUser = userFactory.currentUser
    $scope.firstName = currentUser.firstName
    classFactory.getClasses(currentUser).then(
        myClasses => {
            $scope.classes = myClasses
        }
    )

})