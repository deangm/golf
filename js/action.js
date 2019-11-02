let courses = request.get("https://golf-courses-api.herokuapp.com/courses")

courses.then(val => {
    let html = "";

    val.courses.forEach(element => {
        console.log(element);
        html += `
                <div class = "card">
                    <div class = "courseName">
                        ${element.name}
                    </div>
                    <div class = "courseImage">
                        <img src = ${element.image}>
                    </div>
                    <div class = "courseBtn">
                        <button onclick = "showTeeBoxes(${element.id})"> Choose This Course </button>
                    </div>
                    <div id = "${element.id}">
                    </div>
                </div>`;
        $("#courseCardCont").html(html);
    });
});


function showTeeBoxes(id) {
    let courseSelection = request.get(`https://golf-courses-api.herokuapp.com/courses/${id}`);

    courseSelection.then(val => {
        let numHoles = val.data.holes;
        numHoles[0].teeBoxes.forEach(tee => {
            $(`#${id}`).append(`
                <div onclick = "initializeCard(${id}, '${tee.teeType}')">
                    ${tee.teeType}
                </div>
            `)
        });

    });
};

function initializeCard(id, tee) {
    let courseSelection = request.get(`https://golf-courses-api.herokuapp.com/courses/${id}`);
    courseSelection.then(val => {

        let holes = val.data.holes;
        let totalYards = 0;
        let totalYardsIn = 0;
        let totalPar = 0;
        let totalParIn =0;
    

        $("#cardCont").html("");

        $("#cardCont").append(`
            <div class = "col" id = "headings">
                <div class = "cell">Hole:</div>
                <div class = "cell"> Yards</div>
                <div class = "cell" >Par</div>
                <div class = "cell">HCP</div>
            </div>
         `);
        for (let i = 0; i < holes.length; i++) {

            let thing = holes[i].teeBoxes.find(val => {
                return val.teeType == tee;
            });

            let yards = thing.yards;
            let par = thing.par;
            let hcp = thing.hcp;
            let hole = holes[i].hole;
           
            totalYards += thing.yards;
            totalPar += thing.par;
            
            if(i < 9){
                totalYardsIn += thing.yards;
                totalParIn += thing.par;
            }
          

            $("#cardCont").append(`
                <div class = "col" id = "col${i+1}">
                    <div class ="cell">Hole ${hole}</div>
                    <div class = "cell">${yards}</div>
                    <div class = "cell">${par}</div>
                    <div class = "cell">${hcp}</div>
                </div>
            `);
        };
    
        addPlayersToCard(holes.length, players.players.length);
        createTotals(totalYardsIn, totalYards, totalParIn, totalPar);
    })
}

function addPlayersToCard(holes, numPlayers) {
    for (let player = 1; player <= numPlayers; player++) {
        $(`#headings`).append(`
            <div class = "cell" id = "p${player}" contenteditable="true" onclick = "clearHtml(this)"; onkeyup = "changePlayerName(event, this.id, this.innerHTML, this)">
                Player:${player}
            </div>
        `)

        
        for (let hole = 0; hole <= holes; hole++) {
            $(`#col${hole}`).append(`
                <div class = "cell" id = "${player-1}${hole}" contenteditable = "true" onclick = "clearHtml" onkeyup = "updateScore(event, this, ${player-1}, ${hole}, this.innerHTML)">
                    ${players.players[player-1].scores[hole] ? players.players[player-1].scores[hole] : "-"}
                </div>
            `)
        }
    }
}

function createTotals(totalYardsIn, totalYards, totalParIn, totalPar){
    $(`<div id = 'totalIn'><div class = "cell">TotalIn</div><div class = "cell">${totalYardsIn}</div><div class = "cell">${totalParIn}</div><div class = "cell">-</div></div>`).insertAfter("#col9");
    $(`<div id = 'totalOut'><div class = "cell" >TotalOut</div><div class = "cell" >${totalYards}</div><div class = "cell" >${totalPar}</div><div class = "cell" >-</div></div>`).insertAfter("#col18");

    addPlayerTotals(players.players.length);
}

function addPlayerTotals(numplayers){
    for(let i = 0; i < numplayers; i++){

        $("#totalIn").append(`<div class = "cell" id = "p${i}In"> ${players.players[i].totalIn} </div>`)
        $("#totalOut").append(`<div class = "cell" id = "p${i}Out"> ${players.players[i].totalIn} </div>`)
    }
}

function createPlayers(event, numPlayers){

    if(event.which == 13){
        for(let i = 0; i<numPlayers; i ++){
            let player = new Player();
            players.add(player);
        }
    }

   
}

function clearHtml(el){
    $(el).html("");
}

function changePlayerName(event, player, name, el){
   
    if(event.which == 13){
        let updatedName = name.split("<")[0];
        players.players[player[1]].updateName(updatedName);
        $(el).html(updatedName);
        $(el).next().focus();
    
    }
}

function updateScore(event, el, player, hole, score){
    if(event.which == 13){
        let updatedScore = score.split("<")[0];
        players.players[player].addScore(hole, updatedScore);
        players.players[player].getTotals();
        $(el).html(updatedScore);
        $(el).next().focus();
        printScores();
    }
}

function printScores(){
    for (let player = 1; player <= players.players.length; player++) { 

        let totalInHtml = players.players[player - 1].totalIn;
        let totalOutHtml = players.players[player - 1].totalOut;

        $(`#p${player-1}In`).html("");
        $(`#p${player-1}In`).html(totalInHtml);

        $(`#p${player-1}Out`).html("");
        $(`#p${player-1}Out`).html(totalOutHtml);

        for (let hole = 1; hole <= 18; hole++) {
            
            let html = players.players[player-1].scores[hole] ? players.players[player-1].scores[hole] : "-";
            
            $(`#${player-1}${hole}`).html("");
            $(`#${player-1}${hole}`).html(html);

        }
    }
}