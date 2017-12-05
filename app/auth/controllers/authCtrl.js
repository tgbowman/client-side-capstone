app.controller("AuthCtrl", function($scope, AuthFactory, userFactory, $location) {
    $scope.auth = {}

    $scope.logoutUser = function(){
        AuthFactory.logout()
        $location.url('/auth')
    }

    $scope.loginUser = function (credentials) {
        AuthFactory.authenticate(credentials).then(function (didLogin) {
            $scope.login = {}
            $scope.register = {}
            console.log("You logged in")
            $location.url("/teacherHub/teacherDash")
        })
    }

    $scope.registerPage= function() {
        $location.url("/auth/register")
    
    }
  
    $scope.registerUser = function(registerNewUser) {
        AuthFactory.registerWithEmail(registerNewUser).then(function(didRegister) {
            console.log(didRegister)
            $scope.newUser = {
                "firstName": $scope.userFirstName,
                "lastName": $scope.userLastName,
                "email": $scope.auth.email,
            }
            userFactory.createNewUser($scope.newUser).then(() => {
                console.log("You have created a new user")
                
            })
            $location.url("/teacherHub/teacherDash")
    

        })
    }
})