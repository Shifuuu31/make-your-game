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
    const borderWidth = isPortrait ? '0.5vw' : '0.5vh';
    const marginBottom = isPortrait ? '3vw' : '3vh';
    const fontSizeLarge = isPortrait ? '3vw' : '3vh';
    const fontSizeMedium = isPortrait ? '2vw' : '2vh';
    const padding = isPortrait ? '3vw' : '3vh';

    const css = `
        .container {
            width: ${isPortrait ? '100vw' : '100vh'};
            height: ${isPortrait ? '100vw' : '100vh'};
        }

        .game-container,
        .menu-bar,
        .instructions {
            border: #DC2FDD dashed ${borderWidth};
        }

        .bricks-container {
            margin: ${borderWidth};
        }

        .paddle {
            width: ${paddleWidth};
            height: ${paddleHeight};
        }

        .ball {
            width: ${ballSize};
            height: ${ballSize};
        }

        .menu-bar h1,
        .menu-bar p,
        .instructions h1 {
            font-size: ${fontSizeLarge};
        }

        .menu-bar div,
        .menu-bar button,
        .menu-bar a,
        .header,
        .instructions p {
            font-size: ${fontSizeMedium};
        }

        .text {
            font-size: ${fontSizeLarge};
        }

        .menu-bar {
            padding: ${padding};
        }

        .menu-button {
            font-size: ${fontSizeMedium};
        }

        .menu-bar h1, .menu-bar p {
            margin-bottom: ${marginBottom};
        }

        .header {
            padding: 0 ${borderWidth};
        }

        .instructions {
            padding: ${borderWidth};
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;

    document.head.appendChild(styleElement);
    return isPortrait;
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


export function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

