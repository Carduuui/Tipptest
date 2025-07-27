let username = document.getElementById("username");
let password = document.getElementById("password");
let loginbtn = document.getElementById("loginbtn");
let x = 1;
let test = false;

function login(){
    if(localStorage.getItem("activeuser") !== ""){
        location.href = "../tipp test/index.html";
    }
}

loginbtn.addEventListener("click", function(){
    while(localStorage.getItem("x") >= x){
        if(username.value == localStorage.getItem("user" + x) && password.value == localStorage.getItem("password" + x)){
            location.href = "../tipp test/index.html";
            localStorage.setItem("activeuser", username.value);
            test = true;
            break;
        }
        x++;
    }
    if(test == false){
        alert("No account has been found. Try again or create a new one.");
    }
    x = 1;
})