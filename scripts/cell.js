
export default class Cell{
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
        if(row!=0 && this.board[row-1][col].alive) numberOfAliveNeighbours++;
        if((row < rows -1) && this.board[row+1][col].alive) numberOfAliveNeighbours++;

        // //Check by column
        if(col!=0 && this.board[row][col-1].alive) numberOfAliveNeighbours++;
        if((col < cols -1) && this.board[row][col+1].alive) numberOfAliveNeighbours++;

        //Check diagonals
        if(row>0){
            if(col!=0 && this.board[row-1][col-1].alive) numberOfAliveNeighbours++;
            if((col< cols-1) && this.board[row-1][col+1].alive) numberOfAliveNeighbours++;
        }
        if(row < rows-1){
            if( col!=0 && this.board[row+1][col-1].alive) numberOfAliveNeighbours++; 
            if((col< cols-1) && this.board[row+1][col+1].alive) numberOfAliveNeighbours++;
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
        var numberOfAliveNeighbours = this.getNumberOfAliveNeighbours(row, col, rows, cols);

        if(this.alive){
            if(numberOfAliveNeighbours >3 || numberOfAliveNeighbours <2){
                this.nextGen = false;
            }else{
                this.nextGen = true;
            }
        }else{
            if(numberOfAliveNeighbours == 3){
                this.nextGen = true;
            }else{
                this.nextGen = false;
            }
        }
        
    }

    getNextGenOfCell(){ 
        this.alive = this.nextGen;
    }

    //Getters
    getWidth() { return this.width;}
    getHeight() { return this.height; }
    getState() {return this.alive;}

    //Setters
    setWidth(width) { this.width = width; }
    setHeight(height) { this.height = height; }
    setState(state) {this.alive = state; }

    /**
     * Method that draws the cell to the given context
     * @param  context 
     * @param  xpos, the X position on which the cell should be drawn
     * @param  ypos the Y position on which the cell should be drawn 
     */
    draw(context, xpos, ypos){
        this.alive ? context.fillStyle = "#000000" : context.fillStyle = "#FFFFFF";
        context.fillRect(xpos, ypos, this.width, this.height);
    }
};

