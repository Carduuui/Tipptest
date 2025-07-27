
function abfrage(){
    let x = document.getElementById("z").value;
    x.toString();
    x = +x + 7.18;
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").innerHTML += x;
    console.log(x);
}

function reset(){
    document.getElementById("z").value = "";
    document.getElementById("output").innerHTML = "";
}