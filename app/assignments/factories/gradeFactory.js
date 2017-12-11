angular
    .module("TeacherHub")
    .factory("gradeFactory", function($http, assignmentClassFactory, studentFactory){
        return Object.create(null, {
            "gradeCache":{
                value: null,
                enumerable: true,
                writable: true
            },
            "add": {
                value: function(gradeObj) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/classGrades/.json?auth=${idToken}`, gradeObj)
                                .then(r=>{
                                    this.get()
                                    return r
                                })
                        })
                }
            },
            "get": {
                value: function() {
                    return $http  
                        .get("https://client-side-caps.firebaseio.com/classGrades/.json")
                        .then(grades=>{
                            let gradesArray = []
                            for(let key in grades.data){
                                grades.data[key].id = key
                                gradesArray.push(grades.data[key])
                            }
                            this.gradeCache = gradesArray
                            console.log("grades cache updated", gradesArray)
                            return gradesArray
                        })
                }
            },
            "delete": {
                value: function(gradeId){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            $http   
                                .delete(`https://client-side-caps.firebaseio.com/classGrades/${gradeId}/.json?auth=${idToken}`)
                                .then(r=>{
                                    console.log("gradeObj Deleted")
                                    this.get()
                                    return r
                                })
                        }) 
                }
            },
            "update": {
                value: function(gradeObj){
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            $http
                                .put(`https://client-side-caps.firebaseio.com/classGrades/${gradeObj.id}/.json?auth=${idToken}`, gradeObj)
                                .then(r=>{
                                    console.log("gradeObj updated")
                                    this.get()
                                    return r
                                })
                        })
                }
            },
            "overall": {
                value: function(classId, studentId) {
                    let totalPoints = 0
                    let assignments = assignmentClassFactory.assignmentRelCache.filter(rel=>{return rel.classId === classId})
                    let allStudentGrades = []
                    let studentClassGrades = []
                    this.gradeCache.forEach(grade=>{if(grade.studentId === studentId){ allStudentGrades.push(grade)}})
                    assignments.forEach(assignment => {
                        allStudentGrades.forEach(grade=>{
                            if(grade.assignmentClassId === assignment.id){studentClassGrades.push(grade)}
                        })
                    })
                    studentClassGrades.forEach(gradeObj=>{
                        totalPoints+= parseInt(gradeObj.grade)
                    })
                    let overallGrade = Math.round(totalPoints / assignments.length)
                    if(isNaN(overallGrade)===true){
                        overallGrade = 0
                    }
                    return overallGrade

                }
            }
        })
    })