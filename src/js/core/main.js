import { Player } from "../models/player.js";
import { Game } from "./game.js";
import { keyboardListener } from "../models/keyboardListener.js";
import { start, updateBackgroundColor } from "./utils.js";
import { adjustStyles } from "./utils.js";
import { levels } from "./levels.js";

export function main() {
    adjustStyles();
    const player = new Player();
    const game = new Game();
    player.game = game;
    game.player = player;
    start(game);
    keyboardListener(game);
    game.listenertoreseize();
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
        game.topLevel = game.currentLevel >= game.topLevel ? game.currentLevel : game.topLevel;
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

