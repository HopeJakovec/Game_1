(function () {
    let isPause = false;
    let animationId = null;

    const speed = 3;
    
    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.trees');

    const tree1 = trees[0];
    const coordsTree1 = getCoords(tree1);

    animationId = requestAnimationFrame(startGame);

    function startGame() {
        treesAnimation();

        animationId = requestAnimationFrame(startGame);
    };

    function treesAnimation() {
        const newCoordY = coordsTree1.y + speed;
        coordsTree1.y = newCoordY;
        tree1.style.transform = `translate(${coordsTree1.x}px, ${newCoordY}px)`;
    };

    function getCoords(element) {
        const matrix = window.getComputedStyle(tree1).transform;
        const array = matrix.split(',');
        const y = array[array.length - 1];
        const x = array[array.length - 2];
        const numericY = parseFloat(y);
        const numericX = parseFloat(x);

        return { x: numericX, y: numericY };
    };

    const pauseButton = document.querySelector('.pause-btn');
    pauseButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            cancelAnimationFrame(animationId);
            pauseButton.children[0].style.display = 'none';
            pauseButton.children[1].style.display = 'initial';
        } else {
            animationId = requestAnimationFrame(startGame);
            pauseButton.children[0].style.display = 'initial';
            pauseButton.children[1].style.display = 'none';
        }
    });
})()