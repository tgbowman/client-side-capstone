angular
    .module("TeacherHub")
    .factory("classFactory", function($http){
        return Object.create(null, {
            "createClass": {
                value: function(classObject){
                    return firebase.auth().currentUser.getToken(true)
                        .then( idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/classes/.json?auth=${idToken}`, classObject)
                        }
                        )
                }
            },
            "getClasses": {
                value: function(currentUser){
                    return $http
                        .get("https://client-side-caps.firebaseio.com/classes/.json")
                        .then(classData => {
                            let userClasses = []
                            for(let key in classData.data){
                                if(classData.data[key].teacherId === currentUser.id){
                                    userClasses.push(classData.data[key])
                                }
                            }

                            return userClasses 
                        })
                }
            }
        })
    })