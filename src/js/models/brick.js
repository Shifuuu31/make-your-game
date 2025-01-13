class Brick {
    constructor(container) {
        this.type = 1;
        this.elem = null;
        this.container = container;
        this.Isdetroyed = false;
        this.dimension = null;
    }

    renderBrick() {
        const container = document.querySelector('.container');
        const brick = document.createElement('div');
        brick.className = 'brick';
        container.append(brick);
        this.elem = brick;
        return brick
    }
}

export { Brick };