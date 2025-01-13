import { Player } from "/src/js/models/player.js";
import { Game } from "/src/js/core/game.js";
import { setupListeners } from "/src/js/models/listeners.js";
import { start, updateBackgroundColor, adjustStyles } from "/src/js/core/utils.js";
import { levels } from "/src/js/core/levels.js";

export function main() {
    const isPortrait = adjustStyles();
    const player = new Player();
    const game = new Game(isPortrait);
    game.player = player;
    start(game);
    setupListeners(game);
    requestAnimationFrame(() => updateGameState(game));
}

export function updateGameState(game) {
    updateBackgroundColor();
    if (game.isPaused) {
        game.stopChrono();
    } else if (!game.isPaused && game.player.lives > 0 && !game.isWin()) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
        game.updateHeader();
        game.updateChrono(Date.now());
    } else if (game.isWin()) {
        game.player.topLevel = game.currentLevel > game.player.topLevel ? game.currentLevel : game.player.topLevel;
        game.isPaused = true;
        if (game.currentLevel === levels.length - 1) {
            game.gameResult("YOU WIN!"); 
        } else {
            game.currentLevel++;
            game.ball.reset(game.paddle.dimensions);
            game.bricksContainer.replaceChildren();
            game.setup();
        }
    }
    if (game.player.lives === 0) {
        game.gameResult("YOU LOSE!");
    }

    requestAnimationFrame((timestamp) => updateGameState(game, timestamp));
}

main();

