import { Player } from "../models/player.js";
import { Game } from "./game.js";
import { keyboardListener } from "../models/keyboardListener.js";


export function main() {
    adjustStyles();

    const player = new Player();
    const game = new Game();
    player.game = game;
    game.player = player;
    game.isPaused = true;
    game.listenertoreseize();
    game.setup();
    game.frameCount = 0;
    game.lastFpsUpdate = performance.now();
    game.fps = 0;
    game.longFrames = 0;
    game.droppedFrames = 0;


    keyboardListener(game);

    requestAnimationFrame((timestamp) => updateGameState(game, timestamp));
}



const startColor = [0, 50, 150]; 
const endColor = [90, 204, 229]; 
const rgbIncrement = 0.5;
let fact = 1; 
let color = [...startColor]; 

function updateBackgroundColor() {
    for (let i = 0; i < 3; i++) {
        color[i] += rgbIncrement * fact;

        if (color[i] >= endColor[i] || color[i] <= startColor[i]) {
            fact *= -1;
        }
    }

    document.body.style.setProperty(
        "--dynamic-gradient",
        `linear-gradient(to right, rgb(${color[0]}, ${color[1]}, ${color[2]}), rgb(${color[0] + rgbIncrement}, ${color[1] + rgbIncrement}, ${color[2] + rgbIncrement}))`
    );

    document.body.style.background = `var(--dynamic-gradient)`;

}


export function updateGameState(game, timestamp) {

    // updateBackgroundColor()


    if (game.isPaused) {
        game.stopChrono();
    } else if (!game.isPaused && game.player.lives > 0 && !game.isWin()) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
        game.updateHeader();
        game.updateChrono(Date.now());
    }

    if (game.isWin()) {
        game.isPaused = true;
        game.stopChrono();
        if (game.currentLevel === levels.length - 1) {
            game.overlay.classList.replace('hiddenStop', 'shown');
            const winMessage = document.createElement("h1");
            winMessage.textContent = 'You Win';
            winMessage.classList.add('win-message');
            document.body.append(winMessage);
            game.isPaused = true;
        } else {
            game.currentLevel++;
            game.setupbricks();
            game.ball.reset(game.paddle.dimensions);
            game.updateHeader();
            game.bricksContainer.replaceChildren();
        }
    } else if (game.player.lives === 0) {
        game.gameover();
        game.stopChrono();
    }

    // game.lastFrameTime = timestamp;
    requestAnimationFrame((timestamp) => updateGameState(game, timestamp));
}

main();

function adjustStyles() {
    const isPortrait = window.innerWidth <= window.innerHeight;
    const container = document.querySelector('.container');
    
    const containerRect = container.getBoundingClientRect();
    const paddleWidth = isPortrait ? '10vw' : '10vh';
    const paddleHeight = isPortrait ? '2vw' : '2vh';
    const ballSize = isPortrait ? '2vw' : '2vh';
    
    const css = `
        .container {
            width: ${isPortrait ? '100vw' : '100vh'};
            height: ${isPortrait ? '100vw' : '100vh'};
        }
    
        .paddle {
            width: ${paddleWidth};
            height: ${paddleHeight};
            top: ${containerRect.bottom - parseFloat(paddleHeight) * window.innerWidth * 0.02}px;
            left: ${containerRect.right - containerRect.width / 2 - parseFloat(paddleWidth) / 2}px;
        }
    
        .ball {
            width: ${ballSize};
            height: ${ballSize};
        }
    
        .menu-bar {
            padding: ${isPortrait ? '5vh 0' : '3vh 0'};
        }
    
        .menu-bar h1 {
            font-size: ${isPortrait ? '5vh' : '3vh'};
        }
    
        .menu-bar div, .menu-bar button, .menu-bar a {
            font-size: ${isPortrait ? '3vh' : '2vh'};
        }

        .text{
            font-size: ${isPortrait ? "3vw" : "3vh"}
        }

        .bricks-container {
            gap: ${isPortrait ? "1vw" : "1vh"}
        }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    
    document.head.appendChild(styleElement);
    
}
