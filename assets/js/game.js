import * as objects from "./objects.js";
import * as maps from "./maps.js";
import * as render from "./render.js";
import * as utils from "./utils.js";

const AUDIO_URLS = ["/assets/audio/monsters-afoot.mp3"];
let gameAudio;

const FPS = 60;
const velocity = 4;

let t0;
let inputMap;
let player;
let animationFrame;
let paused = false;
let started = false;

let keys = 0;
let drums = 0;
let guitars = 0;
let sax = 0;
let mic = 0;
let beatSkeleton = false;
let beatDrums = false;

window.addEventListener("DOMContentLoaded", async () => {
    gameAudio = new Audio(AUDIO_URLS[0]);
    gameAudio.loop = true;
    initPauseMenu();
    displayStartMenu();
    displayControls();
    runAsync();
});

function startEventListener(e) {
    gameAudio.play();
    const menu = document.getElementById("start-menu");
    menu.hidden = true;
    started = true;
}

function pauseEventListener(e) {
    if (!started) {
        return;
    }
    switch (e.key) {
        case "P":
        case "p":
            paused = !paused;
            if (paused) {
                gameAudio.pause();
            } else {
                gameAudio.play();
            }
            const menu = document.getElementById("pause-menu");
            menu.hidden = !paused;
            break;
    }
}

function resumeEventListener(e) {
    if (!started || !paused) {
        return;
    }
    paused = false;
    const menu = document.getElementById("pause-menu");
    menu.hidden = true;
}

async function runAsync() {
    objects.Init();
    await render.InitAsync();
    player = objects.Player(41, 108);
    render.Update(player);
    inputMap = new Map();
    window.addEventListener("keyup", pauseEventListener);
    window.addEventListener("keyup", inputKeyupListener);
    window.addEventListener("keydown", inputKeydownListener);
    window.addEventListener("keyup", interactListener);
    t0 = Date.now();
    requestAnimationFrame(main);
}

function displayControls() {
    const div = document.createElement("div");
    div.id = "controls-menu";
    div.style.position = "absolute";
    div.style.zIndex = 1;
    div.style.textAlign = "center";
    div.style.width = "320px";
    div.style.height = "320px";
    div.style.left = "360px";
    div.style.top = "36px";
    div.style.boxSizing = "border-box";
    div.style.borderRadius = "5px";
    div.style.padding = "5px";
    const header = document.createElement("h1");
    header.innerText = "Controls - Make sure CAPS LOCK is OFF"
    div.appendChild(header);
    const p1 = document.createElement("p");
    p1.innerText = "Movement - w, a, s, d"
    div.appendChild(p1);
    const p2 = document.createElement("p");
    p2.innerText = "Interact with NPCs/Pick up items - spacebar";
    div.appendChild(p2);
    const p3 = document.createElement("p");
    p3.innerText = "Pause/Resume game - p";
    div.appendChild(p3);
    document.body.appendChild(div);
}

function displayStartMenu() {
    const div = document.createElement("div");
    div.id = "start-menu";
    div.style.position = "absolute";
    div.style.zIndex = 1;
    div.style.textAlign = "center";
    div.style.width = "320px";
    div.style.height = "320px";
    div.style.left = "36px";
    div.style.top = "36px";
    div.style.boxSizing = "border-box";
    div.style.borderRadius = "5px";
    div.style.padding = "5px";
    div.style.backgroundColor = "white";
    const header = document.createElement("h1");
    header.innerText = "Monsters Afoot";
    div.appendChild(header);
    const info = document.createElement("p");
    info.innerText = "Colin! Your monster bandmates have lost their instruments! Help them find them and let's rock out this abnormal house!";
    div.appendChild(info);
    const startBtn = document.createElement("button");
    startBtn.id = "start-btn";
    startBtn.type = "button";
    startBtn.innerText = "Start Game";
    startBtn.addEventListener("click", startEventListener);
    div.appendChild(startBtn);
    document.body.appendChild(div);
}

function initPauseMenu() {
    const div = document.createElement("div");
    div.id = "pause-menu";
    div.hidden = true;
    div.style.position = "absolute";
    div.style.zIndex = 2;
    div.style.textAlign = "center";
    div.style.width = "320px";
    div.style.height = "320px";
    div.style.left = "36px";
    div.style.top = "36px";
    div.style.boxSizing = "border-box";
    div.style.borderRadius = "5px";
    div.style.padding = "5px";
    div.style.backgroundColor = "white";
    const subheader = document.createElement("h3");
    subheader.innerText = "Monsters Afoot";
    const header = document.createElement("h1");
    header.innerText = "Paused";
    div.appendChild(subheader);
    div.appendChild(header);
    const startBtn = document.createElement("button");
    startBtn.id = "resume-btn";
    startBtn.type = "button";
    startBtn.innerText = "Resume Game";
    startBtn.addEventListener("click", resumeEventListener);
    div.appendChild(startBtn);
    document.body.appendChild(div);
}

let collision = false;
// Runs every frame
function main() {
    if (started && !paused) {
        const t = Date.now();
        const dt = t - t0;
        let x = player.x;
        let y = player.y;
        // If player is not moving, check for input map keys down
        if (!player.moving) {
            collision = false;
            for (const key of inputMap.keys()) {
                if (inputMap.get(key)) {
                    switch (key) {
                        case "s":
                            player.dx = 0;
                            player.dy = 1;
                            player.sy = 3;
                            break;
                        case "w":
                            player.dx = 0;
                            player.dy = -1;
                            player.sy = 0;
                            break;
                        case "a":
                            player.dx = -1;
                            player.dy = 0;
                            player.sy = 2;
                            break;
                        case "d":
                            player.dx = 1;
                            player.dy = 0;
                            player.sy = 1;
                            break;
                    }
                    for (const key of render.fgObjects.keys()) {
                        const obj = render.fgObjects.get(key);
                        if (obj.x == player.x+player.dx && obj.y == player.y+player.dy) {
                            collision = true;
                            break;
                        }
                    }
                    player.moving = true;
                    animationFrame = 0;
                }
            }
        }
        if (player.moving && dt > 1000/FPS) {
            animationFrame++;
            switch(animationFrame) {
                case 1:
                    player.sx = 2;
                    break;
                case 4:
                    player.bernoulli = 1 - player.bernoulli;
                    player.sx = player.bernoulli;
                    break;
                case 6:
                    player.sx = 2;
                    break;
                case 8:
                    player.moving = false;
                    break;
            }
            if (!collision) {
                if ( (player.dx < 0 && player.x > 0) || (player.dx > 0 && player.x < 180) ){
                    player.x += 0.125*player.dx;
                }
                if ( (player.dy < 0 && player.y > 0) || (player.dy > 0 && player.y < 180) ) {
                    player.y += 0.125*player.dy;
                }
            }
            render.Update(player);
            t0 = t;
        }
    } 
    requestAnimationFrame(main);
}

function inputKeydownListener(e) {
    switch(e.key) {
        case "w":
        case "s":
        case "a":
        case "d":
            inputMap.set(e.key, true);
            return;
    }
}

function inputKeyupListener(e) {
    switch(e.key) {
        case "w":
        case "s":
        case "a":
        case "d":
            inputMap.set(e.key, false);
            break;
    }
}

function interactListener(e) {
    switch(e.key) {
        case " ":
            console.log(player.x, player.y);
            for (const key of render.fgObjects.keys()) {
                const obj = render.fgObjects.get(key);
                if (obj.x == player.x+player.dx && obj.y == player.y+player.dy) {
                    if (handleInteraction(obj)) {
                        break;
                    }
                }
            }
    }
}

function handleInteraction(obj) {
    let key;
    let ret = false;
    if (obj.x == 35 && obj.y == 69) {
        keys++;
        if (keys >= 2) {
            alert("Congratulations! You have found all the keys!");
        } else {
            alert(`You have found ${keys}/2 bags of keys!`);
        }
        ret = true;
    } else if (obj.x == 59 && obj.y == 43) {
        if (beatSkeleton) {
            alert("Well done you crazy critter! Come on in!");
            ret = true;
        } else {
            if (keys >= 2) {
                alert("Listen mate! Go and find Skeleman and help him practice!");
            } else {
                keys++;
                alert("I can't let you past until you help Skeleman practice his piano! Here's a bag of keys!");
                alert(`You have found ${keys}/2 bags of keys!`);
            }
        }
    }
    else if (obj.x == 128 && obj.y == 71) {
        if (guitars < 3) {
            guitars++;
            alert("Have a bit of guitar");
        } else {
            alert("Leave me alone and find the other guitar shnizzle");
        }
    } else if (obj.x == 98 && obj.y == 39) {
        alert(`BLUE FLAVOUR... that's my favourite drink. What? Who said that? You have ${guitars}/3 guitar tings BTW.`);
        alert("Also mate, search the rocks cos they might be there, I think I heard some guy say that!");
    } else if (obj.x == 163 && obj.y == 75) {
        alert(`Sometimes I put my saxophone on my head and pretend I'm an elephant! Ah, it looks like you have ${sax}/3 saxophone pieces! Wow!`);
    } else if (obj.x == 76 && obj.y == 116) {
        if (beatDrums) {
            alert("MAGGIE - DRUM BOSS WIN");
            ret = true;
        } else {
            alert("I am Maggie apparently... i also think you need to beat the drum boss to get here, but i can't remember");
        }
    } else if (obj.x == 39 && obj.y == 132) {
        alert("arlo - f");
        ret = true;
    } else if (obj.x == 34 && obj.y == 21) {
        if (keys >= 2) {
            alert("Hey Colin, ah, I see you have the keys! Come on in bossman x");
            ret = true;
        } else {
            alert("Oi, Skeleman needs his missing piano keys before you can practice!");
        }
    } else if (obj.x == 34 && obj.y == 20) {
        alert("Skeleman says - WADDUP DAWG? Thanks for my keys");
        beatSkeleton = true;
    } else if (obj.x == 133 && obj.y == 74) {
        if (guitars >= 3) {
            alert("Oh no... I am going to be decapitated now... have fun practing the guitar");
            ret = true;
        } else {
            alert("Hahaha, my head only explodes when you have all 3 guitar infinity stones");
        }
    } else if (obj.x == 107 && obj.y == 87) {
        if (drums >= 2) {
            alert(`DOH, here I go dying again!`);
            ret = true;
        } else {
            alert(`I protect the Drumming Yeti of Death! Come back when you have 2 drums. You have ${drums}/2 so far!`);
        }
    } else if (obj.x == 139 && obj.y == 97) {
        if (sax >= 3) {
            alert(`Congratulations, sax mission complete!`);
            ret = true;
        } else {
            alert(`I protect the Saxy Monster from Anglo Saxon Monster Town! Come back when you have 3 saxophone bits and bobs. You have ${sax}/3 so far!`);
        }
    } else if (obj.x == 15 && obj.y == 64) {
        alert("bouncer - 15, 64, final boss music vid - GIVES YOU MICROPHONE");
        ret = true;
    } else if (obj.x == 93 && obj.y == 27) {
        guitars++;
        alert(`Good job Colin! You have found ${guitars}/3 guitar pieces! ROCK ON GEEZA! You got the bit that tunes it!`);
        ret = true;
    } else if (obj.x == 104 && obj.y == 55) {
        guitars++;
        alert(`YES BIG COL! You have found ${guitars}/3 guitar pieces! This is some strings`);
        ret = true;
    } else if (obj.x == 128 && obj.y == 71) {
        guitars++;
        alert(`Hooray. You have found ${guitars}/3 guitar pieces! Maybe this one was a fret, idk.`);
        ret = true;
    } else if (obj.x == 130 && obj.y == 87) {
        sax++;
        alert(`CRIKEY! YOU ARE LOOKING SAX-Y WITH YOUR ${sax}/3 bits of sax...stuff...`);
        ret = true;
    } else if (obj.x == 169 && obj.y == 76) {
        sax++;
        alert(`You found a piece of saxophone! WOAH DUDEEEE. Found ${sax}/3 pieces!`);
        ret = true;
    }  else if (obj.x == 147 && obj.y == 103) {
        sax++;
        alert(`You found a piece of saxophone! Very jazzy. Found ${sax}/3 pieces!`);
        ret = true;
    }  else if (obj.x == 107 && obj.y == 83) {
        drums++;
        alert(`Found drums ${drums}/2`);
        ret = true;
    }  else if (obj.x == 77 && obj.y == 117) {
        drums++;
        alert(`Found drums ${drums}/2`);
        ret = true;
    } 
    if (ret) {
        key = maps.overworldBgMap.length*obj.x + obj.y;
        render.fgObjects.delete(key);
        render.Update(player);
    }
    return ret;
}
