
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


class PlayerCollection{
    constructor(){
        this.players = [];
    }

    add(player){
        this.players.push(player);
    }
}

var players = new PlayerCollection();


class Player{
    constructor(name){
        this.name = name;
        this.scores = {};
        this.totalIn = 0;
        this.totalOut = 0;
        this.total = 0;
        this.totalPar = 0;
    }
    updateName(name){
        this.name = name;
    }
    
    addScore(hole, score){
        this.scores[hole] = score;
        this.getTotals();

        
        if(Object.keys(this.scores).length == 18){
            
            let total = Number($("#totalPar").html());
            let score = this.total - total;
            let html = this.name + " You got " + score;
         
            if(score == 0){
                html += ". You Got Par! Excellent";
            }
            else if(score < 0){
                html += " Great Score! Keep up to good work!"
            }
            else if(score > 0 && score <= 5){
                html += " Not too bad!"
            }
            else if(score > 5){
                html += " Try something else."
            }
            $("#scoreAlert").html("");
            $("#scoreModal").show();
            $("#scoreAlert").append(html);
        }
    }
    getTotals(){
        let holes = Object.keys(this.scores);
        this.totalOut = 0;
        this.totalIn = 0;
        this.total = 0;
        holes.forEach(val => {
            if (val <= 9){
                this.totalIn += Number(this.scores[val]);
            }
            if(val > 9){
                this.totalOut += Number(this.scores[val]);
            }
            this.total += Number(this.scores[val]);
            
        });
    }
}

