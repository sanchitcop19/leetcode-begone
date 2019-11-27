let table, ids = null, [];

if (localStorage['ignore-problems']){
    ids = JSON.parse("[" + localStorage['ignore-problems'] + "]");
    console.log(localStorage["ignore-problems"]);
}
console.log(localStorage["ignore-problems"]);
let poll_count = 0;

let removeSpecificProblem = function(id){
    let td_id = $("td").filter(function(){return $(this).text() == id})[0];
    td_id.parentNode.hidden = true;
}

let removeProblems = function(){
    console.log("removeProblem");
    for (let id of ids){
        removeSpecificProblem(id);
    }
}

let pollTable = setInterval(function(){
    table = document.getElementsByTagName('table')[0];
    console.log(table);
    if (table || poll_count > 10){
        clearInterval(pollTable);
        removeProblems();
    }
    poll_count++;

}, 2000);

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    console.log(msg);
    if (msg.action == "add-problem"){
        console.log("inside message action")
        console.log(localStorage["ignore-problems"]);
        if (!msg.pid){
            return;
        }
        //chrome.storage.sync.set({'ignore-problems': msg.pid}, function(){console.log('Added ' + msg.pid + 'to local storage')})
        localStorage['ignore-problems'] = (localStorage['ignore-problems'] === undefined? '' : localStorage['ignore-problems'] + ',' ) + msg.pid;
        console.log(localStorage["ignore-problems"]);
        removeSpecificProblem(msg.pid);
    }
})
