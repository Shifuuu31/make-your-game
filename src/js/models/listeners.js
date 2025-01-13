import { start, debounce } from "/src/js/core/utils.js";



const keyboardListener = (game) => {
    const overlay = document.querySelector('.overlay');
    const menuBar = document.getElementById('pause-dashboard');
    const gameResult = document.getElementById('game-result-dashboard');

    document.addEventListener('keydown', (event) => {
        const overlayShown = overlay.classList.contains("shown");
        const overlayHiddenStop = overlay.classList.contains("hiddenStop");
        const gameResultHiddenStop = gameResult.classList.contains("hiddenStop");
        const menuBarHidden = menuBar.classList.contains("hiddenStop");
        event.preventDefault();
        if ((event.code === 'ArrowLeft' || event.code === 'ArrowRight')) {
            if (overlayHiddenStop) {
                game.paddle.keyDownHandler(event);
                if (game.isPaused) {
                    game.ball.reset(game.paddle.dimensions);
                }
            }
        } else if (event.code === 'Space' && game.isPaused && game.started) {
            if (overlayShown && !menuBarHidden) {
                overlay.classList.replace("shown", "hiddenStop");
                menuBar.classList.replace("shown", "hiddenStop");
                game.ball.reset(game.paddle.dimensions);
            } else {
                game.isPaused = false;
            }
        } else if (event.key === 'Escape' && gameResultHiddenStop && game.started) {
            game.isPaused = true;
            overlay.classList.replace("hiddenStop", "shown");
            menuBar.classList.replace("hiddenStop", "shown");
        } else if ((event.key === 'r' || event.key === 'R') && overlayShown && game.started) {
            overlay.classList.replace("shown", "hiddenStop");
            gameResult.classList.replace("shown", "hiddenStop");
            menuBar.classList.replace("shown", "hiddenStop");
            start(game);
        } else if ((event.key === 'p' || event.key === 'P') && !game.started) {
            game.started = true;
            overlay.classList.replace("shown", "hiddenStop");
            document.querySelector('.instructions').remove();
        }
    });
}

function listenertoreseize() {
    const reloadOnResize = debounce(() => {
        window.location.reload();
    }, 200);

    window.addEventListener('resize', (event) => {
        reloadOnResize();
    });
}


function setupListeners(game) {
    keyboardListener(game);
    listenertoreseize();
}

export {setupListeners};