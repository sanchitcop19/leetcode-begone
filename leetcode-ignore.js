//background.console.log(input);
//background.console.log(input.value);
//background.console.log(input.value);

document.addEventListener("DOMContentLoaded", function(){
    const button = document.getElementById('add-ignore');
    console.log(button);
    registerButton(button);
})

let registerButton = function(button){
    console.log("Registering button");
    const id = document.getElementById('ignore-id').value;
    console.log(id);
    button.addEventListener("click", function(id){
        console.log("Setting storage");
        chrome.storage.sync.set({'ignore-problems': [id]}, function(){console.log('Added ' + id + 'to local storage')})
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "add-problem", pid: id}, function(response){
                console.log(response);
            })
        })
    })

}
