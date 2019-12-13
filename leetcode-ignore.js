document.addEventListener("DOMContentLoaded", function() {
    registerButton();
})

let registerButton = function() {
    const button = document.getElementById('add-ignore');
    button.addEventListener("click", function() {
        // Get problem ID for removal
        const input = document.getElementById('ignore-id');
        const id = input.value;
        //document.getElementById('still-processing').hidden = true;
        // Replace the text field for further input
        input.value = "";
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            // Tell the main page to add the problem to its local storage 
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "add-problem",
                pid: id
            }, function(response) {
            })
        })
    })
}
