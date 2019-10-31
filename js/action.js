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

        $("#cardCont").html("");

        $("#cardCont").append(`
            <div class = "col" id = "headings">
                <div>Hole:</div>
                <div>Yards</div>
                <div>Par</div>
                <div>HCP</div>
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

            $("#cardCont").append(`
                <div class = "col" id = "col${i}">
                    <div>Hole ${hole}</div>
                    <div>${yards}</div>
                    <div>${par}</div>
                    <div>${hcp}</div>
                </div>
            `);
        };
        addPlayersToCard(holes.length, 3);
    })
}

function addPlayersToCard(holes, players) {
    for (let player = 1; player <= players; player++) {
        $(`#headings`).append(`
        <div id = "${player}">
            Player:${player}
        </div>
    `)
        for (let hole = 0; hole < holes; hole++) {
            $(`#col${hole}`).append(`
                <div id = "${player}${hole+1}">
                    ${player}:${hole+1}
                </div>
            `)
        }
    }
}
