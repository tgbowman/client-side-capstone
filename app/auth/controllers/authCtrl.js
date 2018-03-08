app.controller("AuthCtrl", function ($scope, AuthFactory, userFactory, $location) {
    $scope.auth = {}

    $scope.loggedIn = false

    $scope.logoutUser = function () {
        AuthFactory.logout()
        $scope.loggedIn = false
        $location.url("/auth")
    }

    $scope.loginUser = function (credentials) {
        AuthFactory.authenticate(credentials).then(function (didLogin) {
            $scope.login = {}
            $scope.register = {}
            $scope.loggedIn = true
            console.log("You logged in")
            $location.url("/teachers/teacherDash")
        })
    }

    $scope.registerPage = function () {
        $location.url("/auth/register")

    }
    $(document).ready(function () {
        $(".dropdown-button").dropdown({ "hover": true })
    })
    $scope.registerUser = function (registerNewUser) {
        AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
            console.log(didRegister)
            $scope.newUser = {
                "firstName": $scope.userFirstName,
                "lastName": $scope.userLastName,
                "email": $scope.auth.email,
            }
            userFactory.createNewUser($scope.newUser).then(() => {
                console.log("You have created a new user")
                $scope.loggedIn = true

            })
            $location.url("/teachers/teacherDash")


        })
    }
})