const playGame = (scene) => {
    const crystalCount = document.querySelector(".crystalCount h5")
    const endScreen = document.querySelector(".endScreen")
    const gameCanvas = document.querySelector("#renderCanvas")
    const endMessage = document.querySelector(".screen p")
    const time = document.querySelector('#timer h1')
    let count = 0

    // 5 minutes countdown timer
    const startTimer = (duration, display) => {
        let timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                stopTimer()
                endScreen.classList.add('appearScreen')
                gameCanvas.classList.add('disappearScreen')
                time.classList.add('disappearScreen')
                if (count != 5) {
                    endMessage.textContent = 'You have been killed by the hidden ninjas and failed in you mission. May you rest in peace.'
                } else {
                    endMessage.textContent = 'You have successfully found all the crystal treasures. Congratulations.'
                }
            }
        }, 1000);
    }

    const stopTimer = () => {
        clearInterval(startTimer)

    }

    window.onload = () => {
        var fiveMinutes = 60 * 1,
            display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    };


    // random cube placements
    for (let i = 0; i < 5; i++) {
        let cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 0.5 }, scene);
        cube.material = new BABYLON.StandardMaterial("cubeMat", scene);
        cube.material.diffuseColor = new BABYLON.Color3(0.00, 0.80, 0.80);
        cube.checkCollisions = true;
        cube.position.y = 0.25
        cube.position.x = Math.random() < 0.5 ? Math.floor(-(Math.random() * 30) + 1) : Math.floor((Math.random() * 30) + 1);
        cube.position.z = Math.random() < 0.5 ? Math.floor(-(Math.random() * 47) + 1) : Math.floor((Math.random() * 47) + 1);


        cube.actionManager = new BABYLON.ActionManager(scene);
        cube.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger, () => {
                    count += 1
                    crystalCount.textContent = count
                    cube.dispose()
                })
        );
    }
}

export {
    playGame
}