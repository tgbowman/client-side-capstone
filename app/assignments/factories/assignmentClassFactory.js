angular
    .module("TeacherHub")
    .factory("assignmentClassFactory", function ($http) {
        return Object.create(null, {
            "assignmentRelCache": {
                value: null,
                enumerable: true,
                writable: true
            },
            "add": {
                value: function (relObj) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .post(`https://client-side-caps.firebaseio.com/assignmentClass/.json?auth=${idToken}`, relObj)
                                .then(r => {
                                    this.get()
                                    return r
                                })
                        })
                }
            },
            "get": {
                value: function () {
                    return $http
                        .get("https://client-side-caps.firebaseio.com/assignmentClass/.json")
                        .then(relData => {
                            let relArray = []
                            for (let key in relData.data) {
                                relData.data[key].id = key
                                relArray.push(relData.data[key])
                            }
                            this.assignmentRelCache = relArray
                            console.log("AssignmentClass Relationship Cache Update", relArray)
                            return relArray
                        })
                }
            },
            "delete": {
                value: function (relId) {
                    return firebase.auth().currentUser.getIdToken(true)
                        .then(idToken => {
                            return $http
                                .delete(`https://client-side-caps.firebaseio.com/assignmentClass/${relId}/.json?auth=${idToken}`)
                                .then(r => {
                                    this.get()
                                    return r
                                })
                        })
                }
            }
        })
    })