angular
    .module("TeacherHub")
    .factory("assignmentFactory", function($http){
        return Object.create(null,{
            "assignmentCache":{
                value: null,
                enumerable:true,
                writable: true
            },
            "currentAssignment":{
                value: null,
                enumerable: true,
                writable: true
            },
            "editMode": {
                value: {
                    "enabled": {
                        value: false,
                        enumerable: true,
                        writable: true
                    },
                    "assId": {
                        value: null,
                        enumerable: true,
                        writable: true
                    }
                },
                enumerable: true,
                writable: true
            },
            "add":{
                value: function(assignmentObj){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/assignments/.json?auth=${idToken}`, assignmentObj)
                                .then( r=>{
                                    this.get()
                                    return r
                                }
                                )
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
                            console.log("assignments cache update", assignmentsArray)
                            return assignmentsArray
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
                                    this.get()
                                    return r
                                })
                        })
                }
            },
            "update": {
                value: function(assignmentId, assignmentObj){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .put(`https://client-side-caps.firebaseio.com/assignments/${assignmentId}/.json?auth=${idToken}`, assignmentObj)
                                .then(r=>{
                                    this.get()
                                    return r
                                })
                        })
                }
            }
        })
    })