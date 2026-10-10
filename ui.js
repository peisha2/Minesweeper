   /*

    for
          A B C 
        1 
        2
        3
    for end

        Legend
        Right click for Flag (?)
        Left click to reveal (revealed .)
        Mines (*)
        Surrounding mines (int)

    */
   export function printBoard(board){
    let output = "";

    let rows = board.rows;
    let columns = board.columns;
 

    output += "   ";
    for(let c = 0; c < columns; c++){
        output += String.fromCharCode(65 + c) + "  ";
    }
    output += "\n";
    for(let r = 0; r<rows; r++){
        output+= (r+1)+"  ";
        for(let c=0; c<columns; c++){

            if(board.grid[r][c].hasMine && board.grid[r][c].isRevealed){
            output += " * ";
            }else if(board.grid[r][c].isFlagged){
                output += " ? ";
            }else if(!board.grid[r][c].isRevealed){
            output += " X ";
            }else if(board.grid[r][c].isRevealed && board.grid[r][c].neighbourCount == 0) {
                output +=" . ";
            }else if(board.grid[r][c].isRevealed){
                output +=" "+board.grid[r][c].neighbourCount+" ";
            }
            
        }
        output += "\n";
    }
    
    console.log(output)
    console.log(
        "Legend" + "\n" 
        + "Reveal: r(\"B3\")  |  Flag/unflag: f(\"B3\")  |  New game: init(\"rows cols mines\")" + "\n"
        + "X hidden | ? flagged | . empty | * mine | digit = surrounding mines" + "\n"
    )
}

function r(input){
    const col = input[0].charCodeAt(0) - 65;
    const row = parseInt(input.slice(1)) - 1;
    window.board.reveal(row,col);
    printBoard(window.board);
    if(window.board.GameOver === false){
            console.log(
                "💥 Womp Womp! Game Over! Time: " 
                + (window.board.gameTime / 1000).toFixed(1) 
                + "sec");
    }    
    if(window.board.GameOver === true){
            console.log(
                "🎉 You Win! Time: " 
                + (window.board.gameTime / 1000).toFixed(1) 
                + "s");
            }

}

window.r=r;

function f(input){
    const col = input[0].toUpperCase().charCodeAt(0) - 65;
    const row = parseInt(input.slice(1)) - 1;
    window.board.flag(row,col);
    printBoard(window.board);
}
window.f = f;

