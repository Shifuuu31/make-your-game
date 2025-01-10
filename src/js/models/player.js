export class Player {
    constructor() {
        this.score = 0;
        this.game = null;
        this.menuButton = document.querySelector('.menu-button');
        this.menuBar = document.getElementById('pause-dashboard');
        this.lives = 3;
    }
}