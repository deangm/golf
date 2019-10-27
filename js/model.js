
class Request {
    constructor() {
    }
    get(url) {

        return new Promise(function (resolve, reject) {

            let request = new XMLHttpRequest();

            request.onreadystatechange = function() {
                if (this.status == 200 && this.readyState == 4) {
                    let result = JSON.parse(this.response);
                    resolve(result);
                }
            };
            request.open("GET", url);
            request.send();
        })

    }
}

var request = new Request();

class CourseCollection {
    constructor() {
        this.courses = [];
    }
    addCourse(course) {
        this.courses.push(course);
    }
}

class Course{
    constructor(){
        this.id;
        this.name;
        this.holes =[];
    }
}

class Hole{
    constructor(){
        this.id;
        this.par;
        this.yardage;
        this.handicap;
        this.mensTee;
        this.womensTee;
        this.proTee;
    }
}

class PlayerCollection{
    constructor(name){
        this.name = name;
        this.players = [];
    }
    addPlayer(player){
        this.players.push(player);
    }
}



class Player{
    constructor(){

    }
    
}