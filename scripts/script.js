(function () {
    let isPause = false;
    let animationId = null;

    const speed = 5;
    
    const car = document.querySelector('.car');
    const trees = document.querySelectorAll('.trees');

    const treesCoords = [];

    for (let i = 0; i < trees.length; i++) {
        const tree = trees[i];
        const coordsTree = getCoords(tree);

        treesCoords.push(coordsTree);
    }

    animationId = requestAnimationFrame(startGame);

    function startGame() {
        treesAnimation();
        
        animationId = requestAnimationFrame(startGame);
    };

    function treesAnimation() {
        for (let i = 0; i < trees.length; i++) {
            const tree = trees[i];
            const coords = treesCoords[i];

            let newYCoord = coords.y + speed;

            if (newYCoord > window.innerHeight) {
                newYCoord = -tree.height;
            }
    
            treesCoords[i].y = newYCoord;
            tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`;
        }
    };

    function getCoords(element) {
        const matrix = window.getComputedStyle(element).transform;
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