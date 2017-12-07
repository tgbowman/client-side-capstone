angular
    .module("TeacherHub")
    .factory("assignmentFactory", function($http){
        return Object.create(null,{
            "assignmentCache":{
                value: null,
                enumerable:true,
                writable: true
            },
            "add":{
                value: function(assignmentObj){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/assignments/.json?auth=${idToken}`, assignmentObj)
                        })
                }
            },
            "get":{
                value: function(){
                    return $http
                        .get("https://client-side-caps.firebaseio.com/assignments/.json")
                        .then(returnData => {
                            let assignmentsArray = []
                            for(let key in returnData.data){
                                returnData.data[key].id = key
                                assignmentsArray.push(returnData.data[key])
                            }
                            this.assignmentCache = assignmentsArray
                        })
                }
            },
            "delete": {
                value: function(assignmentId){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .delete(`https://client-side-caps.firebaseio.com/assignments/${assignmentId}/.json?auth=${idToken}`)
                                .then(r=>{
                                    return this.get()
                                })
                        })
                }
            }
        })
    })