import Cell from "./cell.js"

export default class Board{

    constructor(cell_width, cell_height, board_rows, board_cols, context){
        this.context = context;
        this.cells = new Array(board_rows);
        for(var i=0; i<board_rows; i++){
            this.cells[i] = new Array(board_cols);
        }

        this.board_rows = board_rows;
        this.board_cols = board_cols;


        for(var i = 0; i < this.board_rows; i++){
            for(var j = 0; j < this.board_cols; j++){
                this.cells[i][j] = new Cell(cell_width, cell_height, this.cells);
            }
        }
    }

    
    determineNextGeneration(){
        for(var i = 0; i < this.board_rows; i++){
            for(var j = 0; j < this.board_cols; j++){
                this.cells[i][j].determineNextGenOfCell(i,j, this.board_rows, this.board_cols);
            }
        }
    }

    getNextGeneration(){
        for(var i = 0; i < this.board_rows; i++){
            for(var j = 0; j < this.board_cols; j++){
                this.cells[i][j].getNextGenOfCell();
            }
        }
    }

    draw(){
        for(var i = 0; i < this.board_rows; i++){
            for(var j = 0; j < this.board_cols; j++){
                this.cells[i][j].draw(this.context, j*this.cells[i][j].getWidth(), i*this.cells[i][j].getHeight());
            }
        }
    }

    glider(){
        this.cells[0][1].setState(true);
        this.cells[1][2].setState(true);
        this.cells[2][0].setState(true);
        this.cells[2][1].setState(true);
        this.cells[2][2].setState(true);
    }
    
};