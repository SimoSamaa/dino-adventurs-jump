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
    backSong = document.querySelector(".background-song"),
    loading = document.querySelector(".loading");

//loading
loading.addEventListener("click", () => {
    mainSection.removeEventListener("click", mainJump);
    window.removeEventListener("keydown", keyControle);
});

setTimeout(() => {
    loading.style.cssText
        = "opacity:0; z-index:-1;";
}, 3000);

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

    if (localStorage.getItem("lose-song-data")) {
        audio.pause();
    } else audio.play();

    mainModel.addEventListener("animationend", () => {
        mainModel.classList.remove("jump");
    });

    if (localStorage.getItem("music-bg-data")) {
        backSong.pause();
    } else backSong.play();

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
        ground.style.cssText = "--duration-ground:1s;";
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
                <div class="settings">
                    <div class="close-settings">
                        <img src="img/close.svg"></img>
                    </div>
                    <div class="audio-control">
                        <div class="control-bg-song control-all"><span></span></div>
                        <div class="control-bg-sfx control-all"><span></span></div>
                    </div>
                </div>
            </div>
        </div>`;

        mainSection.appendChild(loseAlert);
        loseAlert.classList.add("lose-act")
        loseAlert.style.cssText = "background:var(--background-card) ;";
        songLose.play();

        // button game restart
        document.getElementById("btn-restart").onclick = () => {
            window.location.reload();
        };

        // button game settings
        document.getElementById("btn-settings").onclick = () => {
            document.querySelector(".settings").style.cssText
                = "background: url(img/bg-settings.png) no-repeat center/cover; display:grid;";
        };

        // button close settings
        document.querySelector(".close-settings").onclick = () => {
            document.querySelector(".settings").style.display = "none"
        };

        // setting music control
        let toggleOne = document.querySelector(".control-bg-song span")
        toggleOne.style.cssText = "background: url(img/toggle.png) no-repeat center/cover;"

        localOne = localStorage.getItem("toggleOne");
        if (localOne === "active") {
            toggleOne.classList.toggle("active")
        }

        document.querySelector(".control-bg-song").onclick = () => {
            if (toggleOne.classList.toggle("active") && backSong.played) {
                backSong.pause()
                localStorage.setItem("toggleOne", "active");
                localStorage.setItem("music-bg-data", backSong.src);
            } else {
                backSong.play()
                localStorage.setItem("toggleOne", "desactive");
                localStorage.removeItem("music-bg-data")
            };
        };

        if (localStorage.getItem("music-bg-data")) {
            backSong.src = localStorage["music-bg-data"];
        };

        // setting sfx control
        let toggleTwo = document.querySelector(".control-bg-sfx span");
        toggleTwo.style.cssText = "background: url(img/toggle.png) no-repeat center/cover;";

        localTow = localStorage.getItem("toggleTwo");
        if (localTow === "active-sfx") {
            toggleTwo.classList.toggle("active-sfx");
        };

        document.querySelector(".control-bg-sfx").onclick = () => {
            if (toggleTwo.classList.toggle("active-sfx")) {
                localStorage.setItem("lose-song-data", songLose.src)
                localStorage.setItem("toggleTwo", "active-sfx")
            } else {
                localStorage.setItem("toggleTwo", "desactive-sfx")
                localStorage.removeItem("lose-song-data")
            };
        };

        if (localStorage.getItem("lose-song-data")) {
            songLose.src = localStorage["lose-song-data"];
        };

        document.documentElement.style.setProperty("--add", "rgb(0 0 0/70%)");

        // stope game time
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
            score.textContent = Math.floor(incScore++ / 15);
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

