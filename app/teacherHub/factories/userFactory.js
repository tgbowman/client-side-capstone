angular
    .module("TeacherHub")
    .factory("userFactory", function($http, AuthFactory){
        return Object.create(null, {
            "currentUser": {
                value: null,
                enumerable: true,
                writable: true
            },
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
            },
            "getUser": {
                value: function() {
                    return $http
                        .get(
                            "https://client-side-caps.firebaseio.com/users/.json"
                
                        )
                        .then(userData => {
                            
                            let users = userData.data
                            let usersArray = []
                            for( let key in users) {
                                users[key].id = key
                                usersArray.push(users[key])
                            }
                            let userEmail = AuthFactory.getUser().email
                            let currentUser = usersArray.find(user=>{
                                return user.email === userEmail
                            })
                            this.currentUser = currentUser
                            console.log(this.currentUser)
                            return currentUser
                        })
                }
            }
        })
    })