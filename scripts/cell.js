
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


    determineNextGenOfCell(x, y, maxX, maxY) {
        var numberOfAliveNeighbours = getNumberOfAliveNeighbours(x, y, maxX, maxY);
        
        //Living cell dies if more than 3 neighbors are alive (Overpopulation)
        //Living cell with less than two alive nejghbours dies (Loneliness)
        if(this.isAlive){
            if(numberOfAliveNeighbours > 3 || numberOfAliveNeighbours < 2){
                this.nextGen = false;
            }
        }else if(numberOfAliveNeighbours == 3) this.nextGen = true;
        else{
            this.nextGen = this.isAlive;
        }
    }

    getNumberOfAliveNeighbours(x, y, maxX, maxY){
        var numberOfAliveNeighbours = 0;
        //Check for valid indexes
        if(x<0 || y<0) return -1;

        //Check by X
        if(x!=0 && this.board[x-1][y].isAlive) numberOfAliveNeighbours++;
        if(x+1 < maxX && this.board[x+1][y].isAlive) numberOfAliveNeighbours++;
        
        //Check by Y
        if(y!=0 && this.board[y-1][y].isAlive) numberOfAliveNeighbours++;
        if(y+1 < maxY && this.board[x][y+1].isAlive) numberOfAliveNeighbours++;

        //Check diagonals
        if(x>0){
            if((y>0 && this.board[x-1][y-1].isAlive) || (y< maxY-1 && board[x][y+1].isAlive)) numberOfAliveNeighbours++;
        }
        if(x<maxX-1){
            if(( y>0 && board[x][y+1].isAlive) || (y< maxY-1 && board[x+1][y+1])) numberOfAliveNeighbours++;
        }

        return numberOfAliveNeighbours;
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

    draw(context, xpos, ypos){
        this.isAlive? context.fillStyle = "#000000" : context.fillStyle = "#FFFFFF";
        context.rect(xpos, ypos, this.width, this.height);
        context.fill();
        context.lineWidth=1;
        context.strokeStyle = "#000000";
        context.stroke();
    }
};