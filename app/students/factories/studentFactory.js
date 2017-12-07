angular
    .module("TeacherHub")
    .factory("studentFactory", function($http){
        return Object.create(null, {
            "currentStudent":{
                value: null,
                enumerable: true,
                writable:true
            },
            "addStudent":{
                value: function(studentObject){
                    return firebase.auth().currentUser.getToken(true)
                        .then(idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/students/.json?auth=${idToken}`, studentObject
                                )
                        })
                            
                }
            },
            "getStudents": {
                value: function(){
                    return $http
                        .get(
                            "http://client-side-caps.firebaseio.com/students/.json"
                        ).then(studentData =>{
                            let studentArray = []
                            for(let key in studentData.data){
                                studentData.data[key].id = key
                                studentArray.push(studentData.data[key])
                            }
                            return studentArray
                        }
                        )
                }
            }
        })
    })