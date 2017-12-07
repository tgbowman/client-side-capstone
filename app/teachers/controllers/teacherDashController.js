angular.module("TeacherHub").controller("teacherDashCtrl", function($scope, userFactory, AuthFactory, $location){
    userFactory.getUser().then(user => {

        $scope.firstName = user.firstName
    })

    $scope.addClass = function() {
        $location.url("/classes/classCreator")
    }

    $scope.classList = function() {
        $location.url("/classes/classList")
    }
 

})
