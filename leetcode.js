let table, ids = null, [];

if (localStorage['ignore-problems']){
    // Problems are stored as comma separated values, this converts the stored string into a list
    ids = JSON.parse("[" + localStorage['ignore-problems'] + "]");
}

let removeSpecificProblem = function(id){
    // Get the table element representing the problem number identified by id
    let td_id = $("td").filter(function(){return $(this).text() == id})[0];
    // Hide the entire row
    td_id.parentNode.hidden = true;
}

let removeProblems = function(){
    // Go through all the ids that need to be removed and remove each
    for (let id of ids){
        removeSpecificProblem(id);
    }
}

let poll_count = 0;

let pollTable = setInterval(function(){
    // Polls the page every 2s until the table is visible because all hell breaks loose otherwise
    table = document.getElementsByTagName('table')[0];
    // Will figure out a better solution than the latter conditional
    if (table || poll_count > 10){
        // Stop polling as soon as the table was found
        clearInterval(pollTable);
        // Remove all the problems now that the table is available
        removeProblems();
        // TODO: Send message to the popup for removing the warning message
    }
    poll_count++;
}, 2000);

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    if (msg.action == "add-problem"){
        if (!msg.pid){
            // Empty button press, do nothing
            return;
        }
        // If there is no element in local storage start off with the current pid as the first element, otherwise add it after a comma
        localStorage['ignore-problems'] = (localStorage['ignore-problems'] === undefined? '' : localStorage['ignore-problems'] + ',' ) + msg.pid;
        // Update the page immediately in addition to adding the problem to the complete list
        removeSpecificProblem(msg.pid);
    }
})
