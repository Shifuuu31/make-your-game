const startColor = [0, 50, 150];
const endColor = [90, 204, 229];
const rgbIncrement = 0.5;
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

        .game-container {
            border: #5ACCE5 dashed ${isPortrait ? '0.5vw' : '0.5vh'};
        }

        .paddle {
            width: ${paddleWidth};
            height: ${paddleHeight};
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

        .text {
            font-size: ${isPortrait ? "3vw" : "3vh"};
        }
        
        .brick {
            border: ${isPortrait ? "0.2vw" : "0.2vh"} solid #fff;
            border-radius: ${isPortrait ? "0.5vw" : "0.5vh"};
        }
           
        .bricks-container {
            gap: ${isPortrait ? "1vw" : "1vh"};
        }
        
        .menu-button {
            font-size: ${isPortrait ? "2vw" : "2vh"};
        }

        .menu-button {
            font-size: ${isPortrait ? "2vw" : "2vh"};
        }
        
        .menu-bar h1 {
            font-size: ${isPortrait ? "3vw" : "3vh"};
            margin-bottom: ${isPortrait ? "3vw" : "3vh"};
        }

        .menu-bar div {
            font-size: ${isPortrait ? "2vw" : "2vh"};
            margin: ${isPortrait ? "2vw" : "2vh"} 0;
            padding: ${isPortrait ? "1vw" : "1vh"};
            border-radius: ${isPortrait ? "1vw" : "1vh"};
            border: ${isPortrait ? "0.2vw" : "0.2vh"} solid #e9ecef;
        }



        .menu-bar button,
        .menu-bar a {
            padding: ${isPortrait ? "1.5vw" : "1.5vh"} ${isPortrait ? "3vw" : "3vh"};
            font-size: ${isPortrait ? "2vw" : "2vh"};
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
