document.addEventListener("DOMContentLoaded", function(){
    const button = document.getElementById('add-ignore');
    console.log(button);
    registerButton(button);
})

let registerButton = function(button){
    console.log("Registering button");
    button.addEventListener("click", function(){
        const input = document.getElementById('ignore-id');
        const id = input.value;
        input.value = "";
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "add-problem", pid: id}, function(response){
                console.log(response);
            })
        })
    })

}
