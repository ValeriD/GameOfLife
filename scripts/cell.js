
class Cell{
    static width;
    static height;

    constructor(width, height, board) {
        this.width = width;
        this.height = height;
        this.board = board;

        this.alive = false;
        this.nextGen = false;
    }


    /**
     * Method that gets the count of the alive neighbors.
     * @param {*} row current row that the cell is on the board
     * @param {*} col current column the cell is on the board
     * @param {*} rows maximum number of rows
     * @param {*} cols maximum number of columns
     * @returns the number of alive neighbors
     */
    getNumberOfAliveNeighbours(row, col, rows, cols){
        var numberOfAliveNeighbours = 0;
        //Check for valid indexes
        if(row<0 || col<0) return -1;

        //Check by row
        if(row!=0 && this.board[row-1][col].isAlive) numberOfAliveNeighbours++;
        if(row+1 < rows && this.board[row+1][col].isAlive) numberOfAliveNeighbours++;
        
        //Check by column
        if(col!=0 && this.board[col-1][col].isAlive) numberOfAliveNeighbours++;
        if(col+1 < cols && this.board[row][col+1].isAlive) numberOfAliveNeighbours++;

        //Check diagonals
        if(row>0){
            if((col>0 && this.board[row-1][col-1].isAlive) || (col< cols-1 && board[row][col+1].isAlive)) numberOfAliveNeighbours++;
        }
        if(row<rows-1){
            if(( col>0 && board[row][col+1].isAlive) || (col< cols-1 && board[row+1][col+1])) numberOfAliveNeighbours++;
        }

        return numberOfAliveNeighbours;
    }
    /**
     * Method that determines if the next generation of the cell will be alive or not
     * @param {*} row on which the cell is on the board
     * @param {*} col on which the cell is on the board
     * @param {*} rows maximum number of rows on the board
     * @param {*} cols maximum number of columns on the board
     */
    determineNextGenOfCell(row, col, rows, cols) {
        var numberOfAliveNeighbours = getNumberOfAliveNeighbours(row, col, rows, cols);
        
        //Living cell dies if more than 3 neighbors are alive (Overpopulation)
        //Living cell with less than two alive nejghbours dies (Loneliness)
        if(this.isAlive){
            if(numberOfAliveNeighbours > 3 || numberOfAliveNeighbours < 2){
                this.nextGen = false;
            }
        }else if(numberOfAliveNeighbours == 3) this.nextGen = true; //If the number of alive neighbors is exactly 3, then the cell will became alive
        else{
            //Stall 
            this.nextGen = this.isAlive;
        }
    }

    getNextGenOfCell(){ 
        this.isAlive = this.nextGen;
    }

    //Getters
    getWidth() { return this.width;}
    getHeight() { return this.height; }

    //Setters
    setWidth(width) { this.width = width; }
    setHeight(height) { this.height = height; }

    /**
     * Method that draws the cell to the given context
     * @param  context 
     * @param  xpos, the X position on which the cell should be drawn
     * @param  ypos the Y position on which the cell should be drawn 
     */
    draw(context, xpos, ypos){
        this.isAlive? context.fillStyle = "#000000" : context.fillStyle = "#FFFFFF";
        context.rect(xpos, ypos, this.width, this.height);
        context.fill();
        context.lineWidth=1;
        context.strokeStyle = "#000000";
        context.stroke();
    }
};