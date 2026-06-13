
class Cell {
    constructor(){
        this.hasMine = false;
        this.isRevealed = false;
        this.isFlagged = false;
        this.neighbourCount = 0;
     

    }
}
export class Board{


    constructor(rows, columns, mineCount){
        
        this.grid = [];
        this.rows = rows;
        this.columns = columns;

        this.mineCount = mineCount;
        this.firstMoveDone = false;
        this.minesPlaced = 0;
        this.hiddenCells = 0;

        this.startTime;
        this.endTime;
        this.gameTime;
        this.GameOver = null; // true == won


        
        for(let r=0; r<this.rows; ++r){
            this.grid[r] = [];
            for (let c=0; c<this.columns; ++c){
                this.grid[r][c] = new Cell();
                this.hiddenCells++;
            }
        }
    }


    

    populateGrid(firstClickRow,firstClickColumn){
        while (this.minesPlaced < this.mineCount){

            let chosenRow = Math.floor(Math.random()*this.rows);
            let chosenColumn = Math.floor(Math.random()*this.columns);

            if( chosenRow !== firstClickRow || chosenColumn !== firstClickColumn ){
                
                if(!this.grid[chosenRow][chosenColumn].hasMine){
                    this.grid[chosenRow][chosenColumn].hasMine = true;
                    this.minesPlaced++;
                }

            }
        }
        this.countMines();
    }

    reveal(r, c){
        if(this.GameOver !== null){ return; }
        if(!this.grid[r][c].isRevealed){
            
            if(this.grid[r][c].isFlagged){
                return; //force unflag
            }

            if(!this.firstMoveDone){
                this.populateGrid(r,c);
                this.firstMoveDone = true;
                this.grid[r][c].isRevealed = true;
                this.startTime = Date.now();

            }else{
                this.grid[r][c].isRevealed = true;
            }

            if(this.grid[r][c].neighbourCount == 0){
                this.cascadeReveal(r,c);
            }

            this.hiddenCells--;
            this.checkEnd(r,c);
        }
    }

    cascadeReveal(r,c){
        for(let shiftR=-1; shiftR<2; shiftR++){
            for(let shiftC=-1; shiftC<2; shiftC++){
                if(shiftR == 0 && shiftC == 0){continue;}
                    const shiftedR = r + shiftR;
                    const shiftedC = c + shiftC;

                if( shiftedR>=0 && shiftedR<this.rows && shiftedC>=0 && shiftedC<this.columns){
                    if(!this.grid[shiftedR][shiftedC].hasMine){
                    this.reveal(shiftedR,shiftedC);
                    }
                }
            }
        }   
    }

    checkEnd(r,c){
        if(this.grid[r][c].hasMine){
            this.isLost();
            return;
        }
        if(this.hiddenCells == this.mineCount){
            this.isWon();
        }
    }

    isLost(){
        this.endTime = Date.now();
        this.gameTime = this.endTime-this.startTime;
        this.GameOver = false;
    }

    isWon(){
        this.endTime=Date.now();
        this.gameTime = this.endTime-this.startTime;
        this.GameOver = true;
    }

    flag(r, c){
        if(this.GameOver !== null){ return; }
        if(!this.grid[r][c].isRevealed){
     
            if(this.grid[r][c].isFlagged){
                this.grid[r][c].isFlagged = false;
            }else{
                this.grid[r][c].isFlagged = true;
            }

        }
    }

    countMines(){

        for( let r=0; r<this.rows; ++r){
            for( let c=0; c<this.columns; ++c){
                let counter = 0;
                
                //shift to -1 to +1 in x and y direction

                for(let shiftR=-1; shiftR<2; shiftR++){
                    for(let shiftC=-1; shiftC<2; shiftC++){

                        if(shiftR == 0 && shiftC == 0){continue;}
                        const shiftedR = r + shiftR;
                        const shiftedC = c + shiftC;

                        if( shiftedR>=0 && shiftedR<this.rows && shiftedC>=0 && shiftedC<this.columns){
                            if( this.grid[shiftedR][shiftedC].hasMine){
                                counter++;
                            }
                        }
                    }
                }   
                
                this.grid[r][c].neighbourCount = counter;
            }
        }
        
    }


    
}
