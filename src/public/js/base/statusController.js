var statusController = (function() {

    window.addEventListener("beforeunload", function() {
        ajaxCall("GET", "/updateStatus?status=0", true)
            .then(offlineSuccess, offlineFail);
        function offlineSuccess() {
            // console.log("OFFLINE");
        }
        function offlineFail() {

        }
    });

    window.addEventListener("load", function() {
        ajaxCall("GET", "/updateStatus?status=1", true)
            .then(onlineSuccess, onlineFail);
        function onlineSuccess() {
            // console.log("ONLINE");
        }
        function onlineFail() {

        }
    });
    
    
    function ajaxCall(method, url, sync, postData=0) {
        var promiseObj = new Promise (function(resolve, reject) {
        var sendData = new XMLHttpRequest();
        sendData.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    //console.log(this.responseText);
                    resolve(this.responseText);
                } else {
                    reject(this.status);
                }
            }
        };
    
        sendData.open(method, url, sync);
        if (method == "GET") {
            sendData.send()
        } else if (method == "POST") {
            sendData.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            sendData.send(postData);
        }
        });
        return promiseObj;
    }

})();
