const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cells = Array.from($$(".cell"));
const enemyCells = cells.slice(0, 63);
const playerCells = cells.slice(63);
const scoreDisplay = $('.score');

let speed, score, dropCount;

reset();

document.addEventListener("keydown", e => {
    if(!dropCount){
        startGame();
    }
    if(e.key == 'ArrowRight' && playerCells.includes($(".player").parentElement.nextElementSibling)){
        $(".player").parentElement.nextElementSibling.appendChild($(".player"));
    }
    else if (e.key == 'ArrowLeft' && playerCells.includes($(".player").parentElement.previousElementSibling)){
        $(".player").parentElement.previousElementSibling.appendChild($(".player"));
    }
})

function reset(){
    dropCount = 0;
    speed = 500;
    score = 0;
    scoreDisplay.innerHTML = "0";

    cells.forEach(cell => cell.innerHTML = "");
    playerCells[4].innerHTML = "<div class = 'player'></div>"
}

function startGame(){
    reset();
    loop();
}

// Check collision between players and enemies;
function loop(){
    let stopGame = false;

    for(let i = enemyCells.length - 1; i >= 0 ; i--){
        const cell = enemyCells[i];
        const nextCell = cells[i+9];
        const enemy = cell.children[0]; 

        // Check there is no collision between the prev and current enemy
        if(!enemy){
            continue;
        }
        else{
            nextCell.appendChild(enemy);
    
            if(playerCells.includes(nextCell)){
                if(nextCell.querySelector(".player")){
                    stopGame = true;
                }else{
                    score++;
                    speed = Math.max(100, speed - 25);
                    scoreDisplay.innerHTML = score;
                    enemy.remove();
                }
            }
        }
    }
    
    if(dropCount % 2 == 0){
        const position = Math.floor(Math.random() * 14);
        enemyCells[position].innerHTML = `<div class = "enemy"></div>`;
    }
    if(stopGame){
        alert(`Your score is ${score}. Close this window to play again`);
        reset();
    }
    else{
        dropCount++;
        setTimeout(loop, speed);
    }
}