angular
    .module("TeacherHub")
    .factory("classStudentFactory", function($http){
        return Object.create(null, {
            "add":{
                value: function(studentClassObj){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/classStudent/.json?auth=${idToken}`, studentClassObj)
                        })
                }
            },
            "get": {
                value: function(){
                    return $http
                        .get("https://client-side-caps.firebaseio.com/classStudent/.json")
                        .then(relationshipData => {
                            let relationshipArray = []
                            for(let key in relationshipData.data){
                                relationshipData.data[key].classStudentId= key
                                relationshipArray.push(relationshipData.data[key])
                            }
                            return relationshipArray
                        })
                }
            },
            "deleteRel": {
                value: function(relId){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .delete(`https://client-side-caps.firebaseio.com/classStudent/${relId}/.json?auth=${idToken}`)
                        })
                }
            }
        })
    })