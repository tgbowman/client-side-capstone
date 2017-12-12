angular
    .module("TeacherHub")
    .factory("disciplineFactory", function($http){
        return Object.create(null, {
            "disciplineCache": {
                value: null,
                enumerable: true,
                writable: true
            },
            "editMode": {
                value: null,
                enumerable: true,
                writable: true
            },
            "add":{
                value: function(disciplineObj){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/discipline/.json?auth=${idToken}`, disciplineObj)
                                .then(returnData=>{
                                    this.get()
                                    return returnData
                                })
                        })
                }
            },
            "get": {
                value: function(){
                    return $http
                        .get("https://client-side-caps.firebaseio.com/discipline/.json")
                        .then(disciplineData=>{
                            let disciplineArray = []
                            for (let key in disciplineData.data){
                                disciplineData.data[key].id = key
                                disciplineArray.push(disciplineData.data[key])
                            }
                            this.disciplineCache = disciplineArray
                            console.log("Discipline Cache has been updated", disciplineArray)
                            return disciplineArray
                        })
                }
            },
            "update": {
                value: function(disciplineObject){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .put(`https://client-side-caps.firebaseio.com/discipline/${disciplineObject.id}/.json?auth=${idToken}`, disciplineObject)
                                .then(r=>{
                                    this.get()
                                    return r
                                })
                        })
                }
            },
            "delete": {
                value: function(disciplineId){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .delete(`https://client-side-caps.firebaseio.com/discipline/${disciplineId}/.json?auth=${idToken}`)
                                .then(r=>{
                                    this.get()
                                    return r
                                })
                        })
                }
            }
        })
    })