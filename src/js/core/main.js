import { Player } from "../models/player.js";
import { Game } from "./game.js";

export function main() {
    const player = new Player();
    const game = new Game(2);
    player.game = game;
    game.player = player;
    game.isPaused = true;
    game.setup(2);
    player.listnermenu();
    game.paddle.listener();

    requestAnimationFrame(() => updateGameState(game));

}

export function updateGameState(game) {
    if (!game.isPaused && game.player.lives > 0) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
        game.updateHeader();
    } else if (game.player.lives === 0) {
        game.gameover();
        return;
    }
    if (game.isPaused) {
        document.addEventListener('keydown', function startGame() {
            game.isPaused = false;
            document.removeEventListener('keydown', startGame);
        });
    } else {
        requestAnimationFrame(() => updateGameState(game));
    }
}


main();
