const keyboardListener = (game) => {
    const overlay = document.querySelector('.overlay');
    const pauseDashboard = document.getElementById('pause-dashboard');
    const gameOverDashboard = document.getElementById('game-over-dashboard');
    const menuBar = document.getElementById('pause-dashboard');

    console.log(gameOverDashboard);


    document.addEventListener('keydown', (event) => {
        console.log(overlay.style.display == 'none');
        
        if ((event.key === 'ArrowLeft' || event.key === 'ArrowRight') && overlay.style.display == 'none') {
            console.log("arrow");
            
            game.paddle.keyDownHandler(event);
        }else if (event.code === 'Space' && game.isPaused === true) {
            console.log(game.isPaused);

            console.log("space");

            if (overlay.style.display === 'block') {
                console.log("block");
                overlay.style.display = 'none';
                menuBar.style.display = 'none';
                game.ball.reset(game.paddle.dimensions);
                return;
            } else {
                console.log("none");
                game.isPaused = false;
            }

        } else if (event.key === 'Escape') {
            console.log("escape");

            game.isPaused = true;
            overlay.style.display = 'block';
            menuBar.style.display = 'block';
        }
    });
}

export { keyboardListener }