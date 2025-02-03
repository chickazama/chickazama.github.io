import * as objects from "./objects.js";
import * as utils from "./utils.js";
import * as maps from "./maps.js";

const CANVAS_WIDTH = 352;
const CANVAS_HEIGHT = 352;
const IMAGE_URLS = ["/assets/img/terrain_1.png", "/assets/img/player_walk.png", "/assets/img/houses.png", "/assets/img/items.png", "/assets/img/npcs.png", "/assets/img/bouncer.png"];

let bgCtx;
let fgCtx;

let renderMap;
let materials;

export let bgObjects;
export let fgObjects;

export async function InitAsync() {
    console.log("Initialising background canvas...");
    const bgCanvas = initCanvas("bg-canvas");
    bgCanvas.style.imageRendering = "pixelated";
    console.log("Initialising foreground canvas...");
    const fgCanvas = initCanvas("fg-canvas");
    fgCanvas.style.imageRendering = "pixelated";
    console.log("Getting background context...");
    bgCtx = bgCanvas.getContext("2d");
    console.log("Getting foreground context...");
    fgCtx = fgCanvas.getContext("2d");
    console.log("Loading image assets...");
    materials = await utils.LoadImagesAsync(IMAGE_URLS);
    if (!materials) {
        console.error("Unable to load image assets");
        return;
    }
    console.log("Initialising render map...");
    initRenderMap();
    initBgObjects();
    initFgObjects();
}

function initBgObjects() {
    bgObjects = new Map();
    for (let i = 0; i < maps.overworldBgMap.length; i++) {
        const row = maps.overworldBgMap[i];
        for (let j = 0; j < row.length; j++) {
            const tileID = maps.overworldBgMap[j][i];
            // console.log(i, j, tileID);
            const key = i*maps.overworldBgMap.length + j;
            const obj = objects.Tile(tileID, i, j);
            if (obj) {
                bgObjects.set(key, obj);
            }
        }
    }
}

function initFgObjects() {
    fgObjects = new Map();
    for (let i = 0; i < maps.overworldFgMap.length; i++) {
        const row = maps.overworldFgMap[i];
        for (let j = 0; j < row.length; j++) {
            const tileID = maps.overworldFgMap[j][i];
            // console.log(i, j, tileID);
            const key = i*maps.overworldFgMap.length + j;
            // if (key == 5709) {
            //     alert(`${i} ${j}`);
            // }
            const obj = objects.Tile(tileID, i, j);
            if (obj && tileID != 0) {
                fgObjects.set(key, obj);
            }
        }
    }
}

export function GetObjectBG(x, y) {
    let x0;
    let y0;
    if (x < 0) {
        x0 = -Math.floor(Math.abs(x));
    } else {
        x0 = Math.floor(x);
    }
    if (y < 0) {
        y0 = -Math.floor(Math.abs(y));
    } else {
        y0 = Math.floor(y);
    } 
    const key = x0*maps.overworldBgMap.length + y0;
    // console.log(key);
    return bgObjects.get(key);
}

export function GetObjectFG(x, y) {
    let x0;
    let y0;
    if (x < 0) {
        x0 = -Math.floor(Math.abs(x));
    } else {
        x0 = Math.floor(x);
    }
    if (y < 0) {
        y0 = -Math.floor(Math.abs(y));
    } else {
        y0 = Math.floor(y);
    } 
    const key = x0*maps.overworldBgMap.length + y0;
    // console.log(key);
    return fgObjects.get(key);
}

function initCanvas(id, width=CANVAS_WIDTH, height=CANVAS_HEIGHT) {
    const ret = document.createElement("canvas");
    ret.id = id;
    ret.width = width;
    ret.height = height;
    ret.style.position = "absolute";
    ret.style.top = '84px';
    ret.style.left = '20px';
    document.body.appendChild(ret);
    return ret;
}

function initRenderMap() {
    renderMap = new Map();
    for (let i = 0; i <= 59; i++) {
        renderMap.set(i, 0);
    }
    for (let i = 60; i <= 71; i++) {
        renderMap.set(i, 2);
    }
    for (let i = 72; i <= 76; i++) {
        renderMap.set(i, 3);
    }
    for (let i = 77; i <= 81; i++) {
        renderMap.set(i, 4);
    }
    for (let i = 82; i <= 83; i++) {
        renderMap.set(i, 5);
    }
    renderMap.set(100, 1);
}

export function DrawBG(obj, x=0, y=0) {
    const idx = renderMap.get(obj.id);
    // alert(`${obj.x}, ${obj.y}`);
    bgCtx.drawImage(materials[idx], obj.sx*objects.TILE_WIDTH, obj.sy*objects.TILE_HEIGHT, obj.width, obj.height, objects.TILE_WIDTH*(obj.x+x), objects.TILE_HEIGHT*(obj.y+y), obj.width, obj.height);
}

export function DrawFG(obj, x=0, y=0) {
    const idx = renderMap.get(obj.id);
    if (idx >= 0) {
        fgCtx.drawImage(materials[idx], obj.sx*objects.TILE_WIDTH, obj.sy*objects.TILE_HEIGHT, obj.width, obj.height, objects.TILE_WIDTH*(obj.x+x), objects.TILE_HEIGHT*(obj.y+y), obj.width, obj.height);
    }
}

export function DrawPlayer(player) {
    const idx = renderMap.get(player.id);
    fgCtx.drawImage(materials[idx], player.sx*objects.TILE_WIDTH, player.sy*objects.TILE_HEIGHT, player.width, player.height, 5*player.width, 5*player.width, player.width, player.height);
}

export function ClearEntireBG() {
    bgCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
}

export function ClearEntireFG() {
    fgCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

export function Update(player) {
    ClearEntireBG();
    ClearEntireFG();
    for (let i = -6; i <= 6; i += 0.25) {
        for (let j = -6; j <= 6; j += 0.25) {
            let xkey = player.x - i;
            let ykey = player.y - j;
            const objBG = GetObjectBG(xkey, ykey);
            if (objBG){ DrawBG(objBG, 5-Math.abs(player.x), 5-Math.abs(player.y)); }
            const objFG = GetObjectFG(xkey, ykey);
            if (objFG){ DrawFG(objFG, 5-Math.abs(player.x), 5-Math.abs(player.y)); }
        }
    }
    DrawPlayer(player);
}
