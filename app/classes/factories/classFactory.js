angular
    .module("TeacherHub")
    .factory("classFactory", function($http, userFactory){
        return Object.create(null, {
            "currentClass": {
                value: null,
                enumerable: true,
                writable: true
            },
            "classCache":{
                value: null,
                enumerable: true,
                writable: true
            },
            "createClass": {
                value: function(classObject){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then( idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/classes/.json?auth=${idToken}`, classObject)
                        }
                        )
                }
            },
            "getClasses": {
                value: function(){
                    return $http
                        .get("https://client-side-caps.firebaseio.com/classes/.json")
                        .then(classData => {
                            let userClasses = []
                            for(let key in classData.data){
                                if(classData.data[key].teacherId === userFactory.currentUser.id){
                                    classData.data[key].id=key
                                    userClasses.push(classData.data[key])
                                }
                            }
                            this.classCache = userClasses
                            console.log("Class Cache Updated", this.classCache)
                            return userClasses 
                        })
                }
            },
            "single": {
                value: function(key){
                    return $http
                        .get(`https://client-side-caps.firebaseio.com/classes/${key}/.json`)
                        .then( currentClass => {
                            console.log(currentClass)
                            currentClass.data.id=key
                            this.currentClass = currentClass.data
                            console.log(this.currentClass)
                            return currentClass.data
                        })
                }
            },
            "deleteClass": {
                value: function(classId){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken=>{
                            return $http
                                .delete(
                                    `https://client-side-caps.firebaseio.com/classes/${classId}/.json?auth=${idToken}`
                                )
                                .then(r=>{
                                    return this.getClasses()
                                })
                        })
                }
            }
        })
    })