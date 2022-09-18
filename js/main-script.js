let allImg = document.querySelectorAll("img");

allImg.forEach((allImages) => {
    allImages.setAttribute("loading", "lazy");
});

const mainSection = document.querySelector("main"),
    mainModel = document.querySelector(".main-model"),
    mainModelFix = document.querySelector(".main-model img"),
    block = document.querySelector(".block"),
    score = document.querySelector(".score-content b"),
    time = document.querySelector(".time-content b"),
    songLose = document.querySelector("#song-lose"),
    ground = document.querySelector(".ground"),
    cloud = document.querySelector(".cloud"),
    backSong = document.querySelector(".background-song");

// game desing 
mainSection.style.cssText = "background:var(--main-background) ; cursor:var(--customPpointer);";
block.style.cssText = "background:var(--block) ;";
ground.style.cssText = "background:var(--main-ground);";

let audio = document.createElement("audio"),
    srcAudio = document.createAttribute("src");

let = activeInterval = undefined;

// jump game function
function mainJump() {

    // add classes keyframes animation
    mainModel.classList.add("jump");
    block.classList.add("mouve");
    ground.classList.add("ground-mouve");
    cloud.classList.add("cloud-mouve");

    mainModel.style.cssText = "background:var(--main-model) ;";
    mainModelFix.style.display = "none"

    //game effect song
    mainModel.appendChild(audio);
    audio.setAttributeNode(srcAudio);
    audio.setAttribute("src", "audio/jump-jump.mp3");
    audio.play();

    mainModel.addEventListener("animationend", () => {
        mainModel.classList.remove("jump");
    });

    backSong.play();

    document.documentElement.style.setProperty("--startMess", " ");

    // game time control
    if (activeInterval === undefined) {
        activeInterval = clearTime = setInterval(gameTime, 1000);
    };
};

mainSection.addEventListener("click", mainJump, false);

let incTime = 0,
    incScore = 0;

// game time
function gameTime(m = "0", s = "0") {
    incTime++;

    m = Math.floor(incTime / 60);
    s = Math.floor(incTime % 60);

    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    time.textContent = `${m}:${s}`;

    if (s == 25) {
        block.style.cssText = "background:none; width:40px; height:95px; --duration:1s; ";
        block.innerHTML = "<img src='img/block-two.png'></img>";
        ground.style.cssText = "--duration-ground:1.5s;";
    } else if (m == 1) {
        block.style.cssText = "background:none; width:100px; height:50px; --duration:.8s; ";
        block.innerHTML = "<img src='img/block-three.png'></img>";
        ground.style.cssText = "--duration-ground:1s;"
    }
};

// chack lose game
let checkDead = setInterval(() => {

    let mainModelCheck = parseInt(getComputedStyle(mainModel).getPropertyValue("top"));
    let blockCheck = parseInt(getComputedStyle(block).getPropertyValue("left"));

    if (blockCheck < 110 && blockCheck > 0 && mainModelCheck >= 180) {
        clearInterval(checkDead);

        // end animation game in lose
        block.style.animation = "none";
        cloud.style.animation = "none";
        ground.style.animation = "none";

        mainModel.style.cssText = " background:var(--main-modelDaed); bottom:29px; z-index:333000;";
        audio.remove();

        // create element game over
        const loseAlert = document.createElement("div");
        loseAlert.className = "lose-alert";

        loseAlert.innerHTML = `
        <div class="lose-content">
            <h1>GAME OVER</h1>
            <span class ="time-card">time:${time.textContent}</span>
            <span class="score-card">score:${score.textContent}</span>
            <div class="btns">
                <div id="btn-restart">
                    <img src="img/restart-btn.svg"></img >
                </div >
                <div id="btn-settings">
                    <img src="img/settings icon.svg"></img >
                </div>
            </div>
        </div>`;

        mainSection.appendChild(loseAlert);
        loseAlert.classList.add("lose-act")
        loseAlert.style.cssText = "background:var(--background-card) ;";
        songLose.play();

        document.getElementById("btn-restart").onclick = () => {
            window.location.reload();
        };

        document.documentElement.style.setProperty("--add", "rgb(0 0 0/70%)")

        // stope gma time
        clearInterval(clearTime)

        // hidden score and time
        document.querySelector(".score-content").style.visibility = "hidden";
        document.querySelector(".time-content").style.visibility = "hidden";

        // remove control game
        mainSection.removeEventListener("click", mainJump);
        window.removeEventListener("keydown", keyControle);
    };

    // score
    setTimeout(() => {
        if (blockCheck <= 0) {
            score.textContent = Math.floor(incScore++ / 14.5);
        };
    }, 250);
});

// keyboard controller game
function keyControle(e) {
    if (e.key.includes(" ") || e.key === "spacebar") {
        return mainJump();
    };
};

window.addEventListener("keydown", keyControle);


