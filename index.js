
//////////////////////////// Variables /////////////////////////////////////

let playersList = [];


// Local storage setup
if(localStorage.getItem("players") === null) {
    localStorage.setItem("players",JSON.stringify([]))
    playersList = JSON.parse(localStorage.getItem("players"));
} else {
    playersList = JSON.parse(localStorage.getItem("players"));
}

// DOM Variables

// Data Card variables
let playerName = document.getElementsByClassName("MyTeam_PlayerName");
let decbtn = document.getElementsByClassName("MyTeam_DecBtn");
let incbtn = document.getElementsByClassName("MyTeam_IncBtn");
let ageCnt = document.getElementsByClassName("MyTeam_AgeCnt");
let bat = document.getElementsByClassName("MyTeam_Bat");
let bowl = document.getElementsByClassName("MyTeam_Bowl");

// Display List Variables
let scroll = document.getElementsByClassName("MyTeam_Scroller");

//////////////////////////// Event Handlers /////////////////////////////////////

// function to dec count
function decCnt() {
    let age = parseInt(ageCnt[0].innerText)
    if((age-1) >= 10 && (age-1) <= 50) {
        ageCnt[0].innerText = (age-1)
    }
}

// function to dec count
function incCnt() {
    let age = parseInt(ageCnt[0].innerText)
    if((age+1) >= 10 && (age+1) <= 50) {
        ageCnt[0].innerText = (age+1)
    }
}

// function to check duplicate date
function checkDuplicate(pName) {

    for(var i = 0; i < playersList.length; i++) {

        if(playersList[i].pName === pName) {
            window.alert("This Player is already present in the list")
            return false;
        }
    }

    return true;
}


// function to add players in local storage
function addPlayer() {

    let pName = playerName[0].value;
    let pAge = parseInt(ageCnt[0].innerText);
    let type = bat[0].checked && bowl[0].checked ? "All-Rounder" : bat[0].checked ? "Batsman" : bowl[0].checked ?  "Bowler" : "Not";


    if(playersList.length === 11) {
        window.alert("You can only add 11 Players in 1 team")
    } else if(pName !== "" && (pAge >= 10 && pAge <= 50) && type !== "Not") {

        if(checkDuplicate(pName) && playersList.length < 11) {
            playersList.push({
                pName,
                pAge,
                type
            });

            localStorage.setItem("players",JSON.stringify(playersList))

            // Re-initializing fields
            playerName[0].value = "";
            ageCnt.innerText = "25";
            bat[0].checked = false;
            bowl[0].checked = false;

            displayPlayersList();
        }

    } else {

        window.alert("Data field might be incomplete","Dede")
    }
}


//////////////////////////// Normal Functions /////////////////////////////////////

// Function to display list
function displayPlayersList() {

    playersList = JSON.parse(localStorage.getItem('players'))
    // if will be execute when players list length is 0
    if(playersList.length !== 0) {

        scroll[0].innerHTML = "";
        scroll[0].style.justifyContent = "flex-start";

        for(var i = 0; i < playersList.length; i++) {

            scroll[0].innerHTML += `

            <div class="MyTeam_TitleV">
                <div class="MyTeam_SrV">
                    ${i+1}
                </div>
                <div class="MyTeam_NameV">
                    ${playersList[i].pName}
                </div>
                <div class="MyTeam_Age1V">
                    ${playersList[i].pAge}
                </div>
                <div class="MyTeam_Type1V">
                    ${playersList[i].type}
                </div>
            </div>
            `
        }
    } else {
        scroll[0].style.justifyContent = "center";
        scroll[0].style.alignItems = "center";
        scroll[0].innerHTML = "<div>No Players Added</div>"
    }
}


displayPlayersList();