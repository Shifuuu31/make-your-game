const startColor = [20, 0, 40];
const endColor = [90, 37, 98];
const rgbIncrement = 0.1;
let fact = 1;
let color = [...startColor];


export function updateBackgroundColor() {
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

export function adjustStyles() {
    const isPortrait = window.innerWidth <= window.innerHeight;
    const paddleWidth = isPortrait ? '15vw' : '15vh';
    const paddleHeight = isPortrait ? '3vw' : '3vh';
    const ballSize = isPortrait ? '3vw' : '3vh';

    const css = `
        .container{
            width: ${isPortrait ? '100vw' : '100vh'};
            height: ${isPortrait ? '100vw' : '100vh'};
        }

        .game-container {
            border: #DC2FDD dashed ${isPortrait ? '0.5vw' : '0.5vh'};
        }

        .bricks-container {
            margin: ${isPortrait ? '0.5vw' : '0.5vh'};
            
        }

        .paddle {
            width: ${paddleWidth};
            height: ${paddleHeight};
        }
    
        .ball {
            width: ${ballSize};
            height: ${ballSize};
        }
    
        .menu-bar h1 {
            font-size: ${isPortrait ? '5vh' : '3vh'};
        }
    
        .menu-bar div, .menu-bar button, .menu-bar a {
            font-size: ${isPortrait ? '3vh' : '2vh'};
        }

        .text {
            font-size: ${isPortrait ? "3vw" : "3vh"};
        }

        .menu-bar {
            Padding: ${isPortrait ? "3vw" : "3vh"};
            border: #DC2FDD dashed ${isPortrait ? '0.5vw' : '0.5vh'};
        }
           
        .menu-button {
            font-size: ${isPortrait ? "2vw" : "2vh"};
        }

        .menu-button {
            font-size: ${isPortrait ? "2vw" : "2vh"};
        }
        
        .menu-bar h1, .menu-bar p{
            font-size: ${isPortrait ? "3vw" : "3vh"};
            margin-bottom: ${isPortrait ? "3vw" : "3vh"};
        }

        .header {
            padding: 0 ${isPortrait ? "0.5vw" : "0.5vh"};
            font-size: ${isPortrait ? "2vw" : "2vh"};
        }

            
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;

    document.head.appendChild(styleElement);
}

export function start(game) {
    game.bricksLive = [];
    game.chrono = 0;
    game.lastTime = 0;
    game.timeAccumulator = 0;
    game.isPaused = true;
    game.currentLevel = 0;
    game.player.score = 0;
    game.bricksContainer.replaceChildren();
    game.player.lives = 3;
    game.paddle.reset();
    game.ball.reset(game.paddle.dimensions);
    game.setup();
}