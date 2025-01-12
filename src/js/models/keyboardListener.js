import { start } from "../core/utils.js";
const keyboardListener = (game) => {
    const overlay = document.querySelector('.overlay');
    const menuBar = document.getElementById('pause-dashboard');
    const gameResult = document.getElementById('game-result-dashboard');

    document.addEventListener('keydown', (event) => {
        const overlayShown = overlay.classList.contains("shown");
        const overlayHiddenStop = overlay.classList.contains("hiddenStop");
        const gameResultHiddenStop = gameResult.classList.contains("hiddenStop");

        if ((event.code === 'ArrowLeft' || event.code === 'ArrowRight')) {
            if (overlayHiddenStop) {
                game.paddle.keyDownHandler(event);
                if (game.isPaused) {
                    game.ball.reset(game.paddle.dimensions);
                }
            }
        } else if (event.code === 'Space' && game.isPaused) {
            if (overlayShown && gameResultHiddenStop) {
                overlay.classList.replace("shown", "hiddenStop");
                menuBar.classList.replace("shown", "hiddenStop");
                game.ball.reset(game.paddle.dimensions);
            } else {
                game.isPaused = false;
            }
        } else if (event.key === 'Escape' && gameResultHiddenStop) {
            game.isPaused = true;
            overlay.classList.replace("hiddenStop", "shown");
            menuBar.classList.replace("hiddenStop", "shown");
        } else if ((event.key === 'r' || event.key === 'R') && overlayShown) {
            overlay.classList.replace("shown", "hiddenStop");
            gameResult.classList.replace("shown", "hiddenStop");
            menuBar.classList.replace("shown", "hiddenStop");
            start(game);
        }
    });
}

export { keyboardListener }