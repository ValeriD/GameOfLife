import Board from "./board.js"

var gameRunning = false;
var board = null;
var gen = 0;

//When the DOM loads we call the setup
document.addEventListener("DOMContentLoaded", setup);


function setup(){
    gen=0;
    //Assign listeners for the buttons
    document.getElementById("reset").addEventListener("click", setup);
    document.getElementById("nextGen").addEventListener("click", update);
    
    //Sets the text of the label, containing the generation
    document.getElementById("generation").innerHTML = "Gen: "+ gen;

    var canvas = document.getElementById("grid");
    canvas.width = window.innerWidth;
    canvas.height = 500;

    if(canvas){
        var context = canvas.getContext("2d");

        var board_cols = Math.floor(canvas.width / 20);   

        board = new Board(20,20,25,board_cols,context);
        
        //Creates initial form
        board.glider();
       
        board.draw();
    }


}

function update(){ 
    if(board){
        board.determineNextGeneration();
        board.getNextGeneration();
        board.draw();
        gen+=1;
        document.getElementById("generation").innerHTML = "Gen: "+gen;
    }
}
