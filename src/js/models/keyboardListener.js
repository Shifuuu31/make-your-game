const keyboardListener = (game) => {
    const overlay = document.querySelector('.overlay');
    const pauseDashboard = document.getElementById('pause-dashboard');
    const gameOverDashboard = document.getElementById('game-over-dashboard');
    const menuBar = document.getElementById('pause-dashboard');
    // overlay.style.display = 'none'

    console.log(gameOverDashboard);


    document.addEventListener('keydown', (event) => {
        if ((event.code === 'ArrowLeft' || event.code === 'ArrowRight')) {

            console.log("arrow");
            console.log(overlay.style.display);
            if (overlay.classList.contains("hiddenOverlay") || !game.isPaused) {
                game.paddle.keyDownHandler(event);
                return;
            }
        } else if (event.code === 'Space' && game.isPaused === true) {
            console.log(game.isPaused);

            console.log("space");

            if (overlay.classList.contains("shown")) {
                console.log("block");
                overlay.classList.replace("shown", "hiddenOverlay");
                menuBar.classList.replace("shown", "hiddenOverlay");
                game.ball.reset(game.paddle.dimensions);
                return;
            } else {
                console.log("none");
                game.isPaused = false;
            }

        } else if (event.key === 'Escape') {
            console.log("escape");

            game.isPaused = true;
            overlay.classList.replace("shown", "hiddenOverlay");
            menuBar.classList.replace("shown", "hiddenOverlay");
        }
    });
}

export { keyboardListener }