angular.module("TeacherHub").controller("addStudentCtrl", function($scope, $location, $routeParams, classFactory, studentFactory, classStudentFactory, $timeout){
    $scope.currentClass = classFactory.currentClass
    $scope.students = null
    //function that executes on page load to get all students from the students DB.
    studentFactory.getStudents()
        .then(studentsList => {
            $scope.students = studentsList
        })

    //function that will execute on button click to delete a student from the DB
    $scope.delete = function(studentId){
        studentFactory.deleteStudent(studentId)
            .then(()=>{
                studentFactory.getStudents()
                    .then(students => {
                        $scope.students = students
                        console.log("student deletion complete")
                    })
            }
            )
    }

    //function that will execute on button click to add an already created student to a class
    $scope.addExistingStudent = function(studentId){
        let newRel = {
            "studentId": studentId,
            "classId": classFactory.currentClass.id
        }
        classStudentFactory.add(newRel)
            .then(()=>{
            })
    }
    
    //function that will execute on button click that takes the student Form data creates a student object and adds it to the student DB and adds them to the class
    $scope.addStudent = function(){
        studentFactory.getStudents()
            .then(studentsArray => {
                let studentId= null
                let newStudentClassRel = {}
                let currentClass = classFactory.currentClass
                let inDatabase = false 
                let inRelDatabase = false
                let clearFields = function(){
                    $scope.newStudent.studentFirstName = ""
                    $scope.newStudent.studentLastName = ""
                    $scope.newStudent.studentEmail = ""
                    $scope.newStudent.parentFirstName = ""
                    $scope.newStudent.parentLastName = ""
                    $scope.newStudent.parentEmail = ""
                }
                
                //if there are no students in the database add them and create the classStudent relationship
                if(studentsArray.length===0){
                    studentFactory.addStudent($scope.newStudent).then(returnData=>{
                        console.log(returnData)
                        newStudentClassRel.classId = currentClass.id 
                        newStudentClassRel.studentId = returnData.data.name
                        classStudentFactory.add(newStudentClassRel)
                        clearFields()
                    })
                } else{
                
                //look to see if the newStudent object is already in the students database.
                    studentsArray.forEach(student => {

                        if(student.studentFirstName === $scope.newStudent.studentFirstName && student.studentLastName === $scope.newStudent.studentLastName && student.studentEmail === $scope.newStudent.studentEmail){
                            inDatabase = true
                            newStudentClassRel.classId = currentClass.id
                            newStudentClassRel.studentId = student.id
                            //add the classStudent relationship object to the databse 
                            classStudentFactory.get().then(relationships => {
                                relationships.forEach(relationship => {
                                    if(relationship.studentId===newStudentClassRel.studentId && relationship.classId===newStudentClassRel.classId){
                                        inRelDatabase = true
                                        alert("Student is already in this class!")
                                        clearFields()
                                    }    
                                })
                                if(inRelDatabase === false){
                                    classStudentFactory.add(newStudentClassRel).then(()=>{
                                        console.log("Student Added to Class")
                                        clearFields()
                                        
                                    })
                                }
                            })
                            
                        } 
                    })
                    //if the newStudent object is not in the database
                    if(inDatabase === false){
                    //add the student the student database
                        studentFactory.addStudent($scope.newStudent)
                            .then(returnData=>{
                                studentId = returnData.data.name
                                newStudentClassRel.classId = currentClass.id 
                                newStudentClassRel.studentId = studentId
                                //add the classStudent relationship object to the databse 
                                classStudentFactory.get().then(relationships => {
                                    relationships.forEach(relationship => {
                                        if(relationship.studentId===newStudentClassRel.studentId && relationship.classId===newStudentClassRel.classId){
                                            inRelDatabase = true
                                            alert("Student is already in this class!")
                                            clearFields()
                                        }   
                                    })

                                    if(inRelDatabase === false){
                                        classStudentFactory.add(newStudentClassRel).then(()=>{
                                            console.log("Student Added to Class")})
                                        clearFields()

                                    } 
                                           
                                })
                            })
                    }
                }
            })
              

    }
})


