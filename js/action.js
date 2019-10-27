let courses = request.get("https://golf-courses-api.herokuapp.com/courses")
let courseCollection = new CourseCollection();

courses.then(val => {
    val.courses.forEach(element => {
        courseCollection.addCourse(element);
    });
});


courses.then(val =>{
    console.log(val);
});
