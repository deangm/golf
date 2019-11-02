
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
    constructor(){
        this.name = "";
        this.scores = {};
        this.totalIn = 0;
        this.totalOut = 0;
    }
    updateName(name){
        this.name = name;
    }
    addScore(hole, score){
        this.scores[hole] = score;
    }
    getTotals(){
        let holes = Object.keys(this.scores);
        this.totalOut = 0;
        this.totalIn = 0;
        holes.forEach(val => {
            if (val <= 9){
                this.totalIn += Number(this.scores[val]);
            }
            this.totalOut += Number(this.scores[val]);
        });
    }
}

