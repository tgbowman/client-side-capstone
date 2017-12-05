angular
    .module("TeacherHub")
    .factory("userFactory", function($http){
        return Object.create(null, {
            "createNewUser": {
                value: function(userObject){
                    return firebase.auth().currentUser.getToken(true)
                        .then(
                            idToken => {
                                return $http
                                    .post(`https://client-side-caps.firebaseio.com/users/.json?auth=${idToken}` , userObject)
                            }
                        )
                }
            }
        })
    })