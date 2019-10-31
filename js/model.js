
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

