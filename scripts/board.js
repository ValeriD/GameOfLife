import "./cell"

class Board{

    constructor(cell_width, cell_height, board_width, board_height, context){
        this.context = context;
        this.cells = Array.from(Array(board_height), () => new Array(board_width));

        for(var i = 0; i < this.cells.length; i++){
            for(var j = 0; j < this.cells[i].length; i++){
                cells[i][j] = new Cell(cell_width, cell_height, this);
            }
        }
    }


    determineNextGeneration(){
        for(var i = 0; i < this.cells.length; i++){
            for(var j = 0; j < this.cells[i].length; j++) {
                cells[i][j].determineNextGen();
            }
        }
    }

    getNextGeneration(){
        for(var i = 0; i < this.cells.length; i++) {
            for(var j = 0; j < this.cells[i].length; j++) {
                cells[i][j].getNextGenOfCell();
            }
        }
    }

    draw(){
        this.context.clean()
        for(var i = 0; i < this.cells.length; i++){
            for(var j = 0; j < this.cells[i].length; j++){
                cells[i][j].draw(this.cellscontext, i*cells[i][j].getWidth(), j*cells[i][j].getHeight());
            }
        }
    }

};