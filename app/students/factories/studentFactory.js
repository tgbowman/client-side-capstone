angular
    .module("TeacherHub")
    .factory("studentFactory", function($http, classStudentFactory){
        return Object.create(null, {
            "currentStudent":{
                value: null,
                enumerable: true,
                writable:true
            },
            "cachedStudents": {
                value: null,
                enumerable: true,
                writable: true
            },
            "addStudent":{
                value: function(studentObject){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/students/.json?auth=${idToken}`, studentObject
                                )
                        })
                        .then(r=>{
                            this.getStudents()
                            return r
                        }
                        )
                            
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
                            this.cachedStudents = studentArray
                            console.log("Student Cache Updated", this.cachedStudents)
                            return studentArray
                        }
                        )
                }
            },
            "deleteStudent": {
                value: function(studentId) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            console.log(idToken)
                            return $http
                                .delete(`https://client-side-caps.firebaseio.com/students/${studentId}/.json?auth=${idToken}`)
                                .then(()=>{
                                    console.log("student deleted from the student DB")
                                    return classStudentFactory.get()
                                        .then(classStudentArray => {
                                            let relToDelete = classStudentArray.filter(relationship =>{
                                                return relationship.studentId === studentId
                                            })
                                            relToDelete.forEach(rel => {
                                                let relId = rel.classStudentId
                                                return classStudentFactory.deleteRel(relId)
                                                    .then(()=>{
                                                        console.log("student deleted from studentClassRel DB")
                                                    })
                                            })
                                        })
                                })
                        })
                }
            }

        })
    })