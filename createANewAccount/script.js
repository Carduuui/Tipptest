let createbtn = document.getElementById("createbtn");
let username = document.getElementById("username");
let password = document.getElementById("password");
let cpassword = document.getElementById("cPassword");
let x = 1;

createbtn.addEventListener("click", function(){
    if(username.value.length > 0 && password.value.length > 0 && password.value == cpassword.value){
        alert("Account has been created.")
        location.href = "../Login/index.html";
        x = localStorage.getItem("x");
        x++;
        localStorage.setItem("user"+ x, username.value);
        localStorage.setItem("password"+x, password.value);
        localStorage.setItem("x", x);
    }
    else{
        alert("Something went wrong. Try again!");
    }
})