let table = null;

const ids = new Set(['1119', '1108']);

let poll_count = 0;

let removeSpecificProblem = function(id){
    let td_id = $("td:contains(" + id + ")")[0];
    td_id.parentNode.hidden = true;
}

let removeProblems = function(){
    console.log("removeProblem");
    console.log(chrome.storage.sync.get(['ignore-problems'], function(result){console.log(result.key)}));
    for (let id of ids){
        removeSpecificProblem(id);
    }
}

let pollTable = setInterval(function(){
    table = document.getElementsByTagName('table')[0];
    console.log(table);
    if (table || poll_count > 5){
        clearInterval(pollTable);
        removeProblems();
    }
    poll_count++;

}, 2000);

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    console.log(msg);
    console.log(sender)
})
