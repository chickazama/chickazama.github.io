export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;

const PLAYER_ID = 100;

let tileLookup;

export function Init() {
    tileLookup = new Map();
    tileLookup.set(1, {sx: 1, sy: 6});
    tileLookup.set(2, {sx: 0, sy: 6});
    tileLookup.set(3, {sx: 9, sy: 5});
    tileLookup.set(4, {sx: 8, sy: 5});
    tileLookup.set(5, {sx: 7, sy: 5});
    tileLookup.set(6, {sx: 6, sy: 5});
    tileLookup.set(7, {sx: 5, sy: 5});
    tileLookup.set(8, {sx: 4, sy: 5});
    tileLookup.set(9, {sx: 3, sy: 5});
    tileLookup.set(10, {sx: 2, sy: 5});
    tileLookup.set(11, {sx: 1, sy: 5});
    tileLookup.set(12, {sx: 0, sy: 5});
    tileLookup.set(13, {sx: 9, sy: 4});
    tileLookup.set(14, {sx: 8, sy: 4});
    tileLookup.set(15, {sx: 7, sy: 4});
    tileLookup.set(16, {sx: 6, sy: 4});
    tileLookup.set(17, {sx: 5, sy: 4});
    tileLookup.set(18, {sx: 4, sy: 4});
    tileLookup.set(19, {sx: 3, sy: 9});
    tileLookup.set(20, {sx: 2, sy: 9});
    tileLookup.set(21, {sx: 1, sy: 9});
    tileLookup.set(22, {sx: 0, sy: 9});
    tileLookup.set(23, {sx: 9, sy: 8});
    tileLookup.set(24, {sx: 8, sy: 8});
    tileLookup.set(25, {sx: 7, sy: 8});
    tileLookup.set(26, {sx: 6, sy: 8});
    tileLookup.set(27, {sx: 5, sy: 8});
    tileLookup.set(32, {sx: 4, sy: 6});
    tileLookup.set(34, {sx: 7, sy: 1});
    tileLookup.set(35, {sx: 7, sy: 0});
    tileLookup.set(36, {sx: 8, sy: 0});
    tileLookup.set(37, {sx: 8, sy: 1});
    tileLookup.set(38, {sx: 9, sy: 0});
    tileLookup.set(39, {sx: 0, sy: 2});
    tileLookup.set(40, {sx: 0, sy: 1});
    tileLookup.set(41, {sx: 0, sy: 0});
    tileLookup.set(42, {sx: 1, sy: 0});
    tileLookup.set(43, {sx: 1, sy: 1});
    tileLookup.set(44, {sx: 1, sy: 2});
    tileLookup.set(45, {sx: 2, sy: 2});
    tileLookup.set(46, {sx: 2, sy: 1});
    tileLookup.set(47, {sx: 2, sy: 0});
    tileLookup.set(48, {sx: 3, sy: 0});
    tileLookup.set(49, {sx: 3, sy: 1});
    tileLookup.set(50, {sx: 3, sy: 2});
    tileLookup.set(51, {sx: 4, sy: 2});
    tileLookup.set(52, {sx: 4, sy: 1});
    tileLookup.set(53, {sx: 4, sy: 0});
    tileLookup.set(54, {sx: 5, sy: 0});
    tileLookup.set(55, {sx: 5, sy: 1});
    tileLookup.set(56, {sx: 5, sy: 2});
    tileLookup.set(57, {sx: 6, sy: 2});
    tileLookup.set(58, {sx: 6, sy: 1});
    tileLookup.set(59, {sx: 6, sy: 0});
    tileLookup.set(60, {sx: 0, sy: 1});
    tileLookup.set(61, {sx: 0, sy: 0});
    tileLookup.set(62, {sx: 1, sy: 0});
    tileLookup.set(63, {sx: 1, sy: 1});
    tileLookup.set(64, {sx: 2, sy: 1});
    tileLookup.set(65, {sx: 2, sy: 0});
    tileLookup.set(66, {sx: 3, sy: 0});
    tileLookup.set(67, {sx: 3, sy: 1});
    tileLookup.set(68, {sx: 0, sy: 3});
    tileLookup.set(69, {sx: 0, sy: 2});
    tileLookup.set(70, {sx: 1, sy: 2});
    tileLookup.set(71, {sx: 1, sy: 3});
    tileLookup.set(72, {sx: 0, sy: 1});
    tileLookup.set(73, {sx: 0, sy: 0});
    tileLookup.set(74, {sx: 1, sy: 0});
    tileLookup.set(75, {sx: 1, sy: 1});
    tileLookup.set(76, {sx: 2, sy: 0});
    tileLookup.set(77, {sx: 0, sy: 0});
    tileLookup.set(78, {sx: 1, sy: 0});
    tileLookup.set(79, {sx: 2, sy: 0});
    tileLookup.set(80, {sx: 0, sy: 1});
    tileLookup.set(81, {sx: 0, sy: 1});
    tileLookup.set(82, {sx: 0, sy: 1});
    tileLookup.set(80, {sx: 0, sy: 0});
}

export function Player(x, y) {
    return (
        {
            id: PLAYER_ID,
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
            x: x,
            y: y,
            dx: 0,
            dy: -1,
            moving: false,
            sx: 2,
            sy: 3,
            bernoulli: 0
        }
    );
}

export function Tile(id, x, y) {
    let tile = tileLookup.get(id);
    if (!tile) {
        tile = {sx: 0, sy: 0};
    }
    if (id == 32) {
        const rng = Math.floor(Math.random()*100);
        // console.log(rng);
        if (rng >= 10 && rng < 50) {
            tile.id = 31;
            tile.sx = 3;
        } else if (rng >= 50 && rng < 70) {
            tile.id = 30;
            tile.sx = 2;
        } else if (rng >= 70 && rng < 72) {
            tile.id = 29;
            tile.sx = 5;
        } else if (rng >= 88 && rng < 90) {
            tile.id = 28;
            tile.sx = 6;
        }
    }
    return (
        {
            id: id,
            width: TILE_WIDTH,
            height: TILE_HEIGHT,
            x: x,
            y: y,
            sx: tile.sx,
            sy: tile.sy,
        }
    );
}