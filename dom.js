export function render(board){
    const container = document.getElementById("board") //from index
    container.innerHTML= ""; //clear
    container.style.setProperty("--cols",board.columns)

    const rows = board.rows;
    const columns = board.columns;

    for(let r = 0; r<rows; r++){
        for(let c=0; c<columns; c++){
            const cell = document.createElement("div");

            if(board.grid[r][c].hasMine && board.grid[r][c].isRevealed){
            cell.textContent = " 💣 ";
            }else if(board.grid[r][c].isFlagged){
                cell.textContent = " 🚩 ";
            }else if(!board.grid[r][c].isRevealed){
            cell.textContent = " ⬛ ";
            }else if(board.grid[r][c].isRevealed && board.grid[r][c].neighbourCount == 0) {
                cell.textContent ="   ";
            }else if(board.grid[r][c].isRevealed){
                cell.textContent =" "+board.grid[r][c].neighbourCount+" ";
            }
        
            
            cell.onclick = function(){
                leftClick(board,r,c);
            }
            cell.oncontextmenu = function(e){
                rightClick(board,e,r,c);
            }

            container.appendChild(cell);
        }
    }
}

function leftClick(board,r,c){
    board.reveal(r,c);
    render(board);
}

function rightClick(board,e,r,c){
    e.preventDefault();
    board.flag(r,c);
    render(board);
}

let timerInterval;

export function startTimer(board){
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "0.0s";
    timerInterval = setInterval(function(){updateTimerD(board)})
}

function updateTimerD(board){
    const timerElement = document.getElementById("timer");

    if(!board.firstMoveDone){return;}
    if(board.GameOver!==null){
        clearInterval(timerInterval);
        timerElement.textContent = formatTime(board.gameTime);
        return;
    }
    const elapsed = Date.now()-board.startTime;
    timerElement.textContent=formatTime(elapsed);
}
function formatTime(ms){
    return (ms/1000).toFixed(2)+"s";
}
