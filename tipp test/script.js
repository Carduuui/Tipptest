let auswahl = ["machst", "tun", "hallo", "Unternehmen", "du", "allerdings","gut", "Firma",
"Frau", "Mann", "er", "sie", "Linus", "haben", "d\u00fcrfen", "machen", "ihr", "Welt", "keine",
"gemacht", "ein", "eine", "dieses", " sehr", "in", " ist", "um", "wir", "sondern",
"Zeit", "im", "damit", "hier", "dies", "doch", "bereits", "kommen", "seiner",
"allem", "Roboter", "Maschinen", "Programm", "Begriff", "k\u00fcnstlich", "bezeichnen", "von",
"tippen", "einfach", "angenehm", "gelernt","exakte", "notwendig", "schnell", "tippen",
"ende", "k\u00f6nnen", "unangenehm", "Liebe", "zwei", "h\u00e4tte", "also", "gar", "alle", "allein",
"immer", "Auto", "Ball", "bauen", "Bauer", "Baum", "Artzt", "bei\u00dfen", "Dorf", "etwas",
"lachen", "offen", "\u00f6ffnen", "packen", "rechnen", "reiten", "rennen", "rot", "blau",
"rufen", "ruhig", "rund", "\u00fcberall", "zehn", "Zink", "tief", "trinken", "treffen",
"wollen", "oben", "oder", "pl\u00f6tzlich", "kalt", "kam", "Katze", "los", "krank",
"braun", "aus", "fahren", "fangen", "fast", "fehlen", "Fenster", "fragen", "f\u00fcnf",
"fr\u00f6hlich", "fr\u00fch", "fr\u00fcher", "Garten", "gewinnen"];
let text = [];
let words = 0;
let vergleich = [];
let eingabe = document.getElementById("eingabefeld");
let SPACE_Pressed = false;
let x = 0;
let y = 0;
let z = 0;
let farbig = [];
let counter = 60;
let counterStart = 60;
let oneWord =[];
let Interval;
let buchstabe;
let firstWordUpperCase;
let right = [];
let wrong = [];
let WPM = 0;
let k = 0;
let l = 0;
let fail = 0;
let noFailCheck = 0;
let wrongColor = "rgba(168, 12, 216, 0.76)";
let slider1 = document.getElementById("myRange1");
let slider2 = document.getElementById("myRange2");
let slider3 = document.getElementById("myRange3");
let r = 0;
let g = 0;
let b = 0;
let dictionary = JSON.parse(localStorage.getItem("calculate")) || {};
let carMode = false;
let carY = 260;
let carMoveValue = 15;
let carCounter = 0;
let carInterval;
let timerSave = false;
let q = 1;
let w = 1;
//Hallo Gido
// Wörter generieren und sichtbar machen
function generateWords(){
    while(words <= 200){
        let random = Math.ceil(Math.random() * 115);
        text.push(auswahl[random]);
        farbig.push(document.createElement("span"));
        let farbig3 = document.createTextNode(text[z] + " ");
        farbig[x].appendChild(farbig3);
        farbig[x].setAttribute("id", y);
        let du = document.getElementById("showtext");
        du.appendChild(farbig[x]);
        z++;
        x++;
        y++;
        words ++;
    }
    let firstWord = Array.from(text[0]);
    oneWord.push(firstWord[0]);
    oneWord.toString();
    let oneWordString = oneWord.toString();
    firstWordUpperCase = oneWordString.toUpperCase();
    while(localStorage.getItem("x") >= w){
        if(localStorage.getItem("activeuser") == localStorage.getItem("user" + w)){
            document.getElementById("highscore").innerHTML = localStorage.getItem("Highscore" + w);
        }
        w++;
    }
    w = 1;
        
    while(localStorage.getItem("x") >= q){
        if(localStorage.getItem("activeuser") == localStorage.getItem("user" + q)){
            r = localStorage.getItem("colorR" + q);
            g = localStorage.getItem("colorG" + q);
            b = localStorage.getItem("colorB" + q);
            break;
        }
        q++;
    }
    q = 1;

    slider1.value = r;
    slider2.value = g;
    slider3.value = b;

    document.documentElement.style.setProperty("--background-color", "rgb("+r+","+g+","+b+")");
    document.documentElement.style.setProperty("--li-Hover", "rgb("+r+","+g+","+b+")");
    document.documentElement.style.setProperty("--dropdown", "rgb("+r+","+g+","+b+")");
    wrongColor = "rgb("+r+","+g+","+b+")";

    // zurueck zum Login und setzt neuen activeuser
    document.getElementById("username").innerHTML = localStorage.getItem("activeuser");
    if(localStorage.getItem("activeuser") == ""){
        location.href = "../Login/index.html";
    }
    
};

/* löscht alle wörter aus den arrays und showtext und setzt den counter 
auf 60 zurück setzt WPM zurück
*/
function ResetReplace(){
    y = 0;
    x = 0;
    z = 0;
    words = 0;
    WPM = 0;
    while(words <= 200){
        text.shift(text[0]);
        farbig.shift(farbig[0]);
        document.getElementById(y).remove();
        x ++;
        y ++;
        z ++;
        words++;
    }

    y = 0;
    x = 0;
    z = 0;
    words = 0;
    while(words <= 200){
        let random = Math.ceil(Math.random() * 115);
        text.push(auswahl[random]);
        farbig.push(document.createElement("span"));
        let farbig3 = document.createTextNode(text[z] + " ");
        farbig[x].appendChild(farbig3);
        farbig[x].setAttribute("id", y);
        let du = document.getElementById("showtext");
        du.appendChild(farbig[x]);
        z++;
        x++;
        y++;
        words ++;
    }
    document.getElementById("eingabefeld").value = "";
    document.getElementById("timer").innerHTML = counterStart;
    counter = counterStart;

    oneWord.shift(oneWord[0]);
    let firstWord = Array.from(text[0]);
    oneWord.push(firstWord[0]);
    oneWord.toString();
    let oneWordString = oneWord.toString();
    firstWordUpperCase = oneWordString.toUpperCase();

    clearInterval(Interval);

    document.getElementById("showtext").style.visibility = "visible";
    document.getElementById("calculate").style.visibility = "hidden";

    fail = 0;
    timerSave = false;
    if(carMode == true){
        carY = 260;
        document.getElementById("car").style.left = carY + "px";
        carCounter = 0;
        document.getElementById("timer").innerHTML = "0";
        carMoveValue = 15;
        clearInterval(carInterval);
    }
}
/* leertaste gedürckt hallo() wird ausgeführt nur wenn counter nicht
0 ist damit man nicht weiter machen kann
*/
document.body.onkeyup = function(e){
    if(counter >= 0){
        if(e.keyCode == "32"){
            hallo();
            if(noFailCheck !== 0){
                noFailExecute();
            }
    }
    }
    else if(counter == 0){
    
    }
}

// eingabefeld clearen und textfarbe ändern WPM errechnung (teil)
function hallo(){
    let eingabe = document.getElementById("eingabefeld").value;
    vergleich.push(eingabe.trim());


    if(vergleich == text[0]){
        document.getElementById(y - 201).style.color = "white";
        right.push(text[0]);
        document.getElementById("eingabefeld").value = "";
        text.shift(text[0]);
        vergleich = [];
        WPM += right[k].length;
        x++;
        y++;
        k++;
        if(carMode == true){
            carMove();
        }
    }
    else{
        document.getElementById(y - 201).style.color = wrongColor;
        wrong.push(text[0]);
        document.getElementById("eingabefeld").value = "";
        text.shift(text[0]);
        vergleich = [];
        x++;
        y++;
        if(noFailCheck !== 0){
            fail +=wrong[l].length;
            l++;
        }
    }
};

// keyCode der Taste die gedrückt wird 
document.body.onkeydown = function(event){
    let taste = event.keyCode;
    buchstabe = String.fromCharCode(taste);
    if(counter == counterStart &&  carMode == false){
    startTimer();
    }
    else if(counter == counterStart && carMode == true){
        carTimer();
    }
}

// WPM berechnen mit verschiedenen Zeiten
function calculate(){
        document.getElementById("showtext").style.visibility = "hidden";
        document.getElementById("calculate").style.visibility= "visible";

        if(counterStart == 60){
            console.log("fuck");
            WPM = WPM / 5;
            WPM = Math.round(WPM);
        }
        else if(counterStart == 30){
            WPM = WPM / 5;
            WPM = WPM * 2;
            WPM = Math.round(WPM);
        }
        else if(counterStart == 15){
            WPM = WPM / 5;
            WPM = WPM * 4;
            WPM = Math.round(WPM);
        }
        else if(carMode == true){
            console.log(carCounter);
            console.log(WPM);
            carCounter = 60 / carCounter;
            WPM = WPM / 5;
            WPM = WPM * carCounter;
            WPM = Math.round(WPM);
        }
        document.getElementById("calculate").innerHTML = WPM;
        highscore();
        WPM = 0;
}

function startTimer(){
    if(buchstabe == firstWordUpperCase && timerSave == false){
        timerSave = true;
        Interval = setInterval(function(){
            counter--;

        if(counter <= 0){
            timer.innerHTML = "0";
            clearInterval(Interval);
            calculate();
        }
        else{
            id = document.getElementById("timer");
            id.innerHTML = counter;
    }

}, 1000)  
}
}

// Um verschiedenen Timer einzustellen 
function time15(){
    counter = 15;
    counterStart = 15;
    document.getElementById("timer").innerHTML = counterStart;
    ResetReplace();
    carMode = false;
    timerSave = false;
    document.getElementById("car").style.visibility = "hidden";
    document.getElementById("finish").style.visibility = "hidden";
    clearInterval(carInterval);
    clearInterval(Interval);
}
function time30(){
    counter = 30;
    counterStart = 30;
    document.getElementById("timer").innerHTML = counterStart;
    ResetReplace();
    carMode = false;
    timerSave = false;
    document.getElementById("car").style.visibility = "hidden";
    document.getElementById("finish").style.visibility = "hidden";
    clearInterval(carInterval);
    clearInterval(Interval);
}
function time60(){
    counter = 60;
    counterStart = 60;
    document.getElementById("timer").innerHTML = counterStart;
    ResetReplace();
    carMode = false;
    timerSave = false;
    document.getElementById("car").style.visibility = "hidden";
    document.getElementById("finish").style.visibility = "hidden";
    clearInterval(carInterval);
    clearInterval(Interval);
}
// Modus wechseln
function normal(){
    document.getElementById("eingabefeld").style.color = "white";
    ResetReplace();
    noFailCheck = 0;
    carMode = false;
    timerSave = false;
    document.getElementById("car").style.visibility = "hidden";
    document.getElementById("finish").style.visibility = "hidden";
    clearInterval(carInterval);
    clearInterval(Interval);
}
function blind(){
    document.getElementById("eingabefeld").style.color = "black";
    ResetReplace();
    noFailCheck = 0;
    carMode = false;
    timerSave = false;
    document.getElementById("car").style.visibility = "hidden";
    document.getElementById("finish").style.visibility = "hidden";
    clearInterval(carInterval);
    clearInterval(Interval);
}
function noFail(){
    noFailCheck ++;
    ResetReplace();
    carMode = false;
    timerSave = false;
    document.getElementById("car").style.visibility = "hidden";
    document.getElementById("finish").style.visibility = "hidden";
    clearInterval(carInterval);
    clearInterval(Interval);
}
function noFailExecute(){
    if(fail !== 0){
        ResetReplace();
        timerSave = false;
    }
}
// change color
slider1.oninput = function(){
    r = slider1.value;
    document.documentElement.style.setProperty("--background-color", "rgb("+r+","+g+","+b+")");
    document.documentElement.style.setProperty("--li-Hover", "rgb("+r+","+g+","+b+")");
    document.documentElement.style.setProperty("--dropdown", "rgb("+r+","+g+","+b+")");
    wrongColor = "rgb("+r+","+g+","+b+")";
    saveColor();
}
slider2.oninput = function(){
    g = slider2.value;
    document.documentElement.style.setProperty("--background-color", "rgb("+r+","+g+","+b+")");
    document.documentElement.style.setProperty("--li-Hover", "rgb("+r+","+g+","+b+")");
    document.documentElement.style.setProperty("--dropdown", "rgb("+r+","+g+","+b+")");
    wrongColor = "rgb("+r+","+g+","+b+")";
    saveColor();
}
slider3.oninput = function(){
    b = slider3.value;
    document.documentElement.style.setProperty("--background-color", "rgb("+r+","+g+","+b+")");
    document.documentElement.style.setProperty("--li-Hover", "rgb("+r+","+g+","+b+")");
    document.documentElement.style.setProperty("--dropdown", "rgb("+r+","+g+","+b+")");
    wrongColor = "rgb("+r+","+g+","+b+")";
    saveColor();
}
function highscore(){
    if(WPM >= localStorage.getItem("Highscore")){ 
        while(localStorage.getItem("x") >= w){
            if(localStorage.getItem("activeuser") == localStorage.getItem("user" + w)){
                console.log("works");
                localStorage.setItem("Highscore" + w, WPM);
                document.getElementById("highscore").innerHTML = localStorage.getItem("Highscore" + w);

            }
            w++;
        }   
        w = 1;
}
}
function saveColor(){
    while(localStorage.getItem("x") >= q){
        if(localStorage.getItem("activeuser") == localStorage.getItem("user" + q)){
            localStorage.setItem("colorR" + q, r);
            localStorage.setItem("colorG" + q, g);
            localStorage.setItem("colorB" + q, b);
            break;
        }
        q++;
    }
    q = 1;
}
function car() {
    ResetReplace();
    noFailCheck = 0;
    carMode = true;
    carCounter = 0;
    document.getElementById("timer").innerHTML = "0";
    counterStart = 0;
    counter = 0;
    document.getElementById("car").style.visibility = "visible";
    document.getElementById("finish").style.visibility = "visible";
    clearInterval(carInterval);
    clearInterval(Interval);
}
function carMove(){
    carY += carMoveValue;
    document.getElementById("car").style.left = carY + "px";

    if(carY >= 1600){
        carMoveValue = 0;
        clearInterval(carInterval);
        calculate();
    }
}
function carTimer(){
    if(buchstabe == firstWordUpperCase && timerSave == false){
        timerSave = true;
    carInterval = setInterval(function(){
        carCounter++;
        document.getElementById("timer").innerHTML = carCounter;
    },1000)
    }
}
function logOut(){
    location.href = "../Login/index.html";
    localStorage.setItem("activeuser", "");
}