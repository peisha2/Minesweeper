import { Board } from "./board.js";
import {printBoard} from "./ui.js";
import { render,startTimer } from "./dom.js";

function startGame(row,col,mineCount){
    window.board = new Board(row,col,mineCount)
    render(window.board)
    printBoard(window.board);
    startTimer(board);
}

//BROWSER CONSOLE 
function consoleInit(input){
    const IN = input.split(" ");
    const INrows = parseInt(IN[0]);
    const INcols = parseInt(IN[1]);
    const INmines = parseInt(IN[2]);
    startGame(INrows,INcols,INmines);
}
window.init = consoleInit;

console.log("Type init(\"rows cols mines\") to start, e.g. init(\"9 9 10\")");

//IN-BROWSER


document.getElementById("startbtn").onclick = function(){
    document.getElementById("settings").style.display = "block";
}

    let lastSettings = { r:0,c:0,m:0}
    document.getElementById("easybtn").onclick = function(){
    startGame(8,10,10)
    lastSettings ={r:8,c:10,m:10};
    }
    document.getElementById("mediumbtn").onclick = function(){
    startGame(14,18,40) 
    lastSettings ={r:14,c:18,m:40}   
    }
    document.getElementById("hardbtn").onclick = function(){
    startGame(20,24,99)
    lastSettings ={r:20,c:24,m:99}    
    }
    document.getElementById("custombtn").onclick = function(){
    const parts = document.getElementById("customIn").value.split(" ");
    startGame(parseInt(parts[0]),parseInt(parts[1]),parseInt(parts[2]));
    lastSettings ={r:parseInt(parts[0]),c:parseInt(parts[1]),m:parseInt(parts[2])}
    }
    document.getElementById("resetbtn").onclick = function(){

        startGame(lastSettings.r,lastSettings.c,lastSettings.m);
    }