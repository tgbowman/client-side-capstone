angular.module("TeacherHub")
    .factory("AuthFactory", function($http, $timeout, $location) {
        let currentUserData = null

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                currentUserData = user
                console.log("User is authenticated")
                $timeout(function () {
                    $location.url("/teacherHub/teacherDash")
                }, 500);
    
            } else {
                currentUserData = null
                console.log("User is not authenticated")
                $timeout(function () {
                    $location.url("/auth")
                }, 500);
            }
        })

        return Object.create(null, {
            isAuthenticated: {
                value: () => {
                    return firebase.auth().currentUser ? true : false
                }
            },
            getUser: {
                value: () => {
                    return firebase.auth().currentUser
                }
            },
            logout: {
                value: () => {
                    firebase.auth().signOut()
                }
            },
            authenticate: {
                value: credentials => {
                    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
                }
            },
            registerWithEmail: {
                value: user => {
                    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                }
            }
        })
    })