// Refactored code for improved readability and maintainability.
// Used consistent variable declaration (const/let) throughout the code.

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const init = () => {
    // Established a WebSocket connection.
    const socket = io.connect();
    setupMap(socket);
};

const setupMap = (socket) => {
    // Improved event handling and function naming.
    socket.on('setup', (map) => generateMaps(map, socket));
    socket.on('hitAt', (pos) => markPosition(pos));
    socket.on('confirmFireAt', (pos) => markPosition(pos));
    socket.on('reset', resetGame);
};

const resetGame = () => {
    // Reorganized code for resetting the game board.
    clearBoard($('#board'));
    clearBoard($('#board_player'));
};

const clearBoard = (boardElement) => {
    // Abstracted the logic for clearing the game board.
    boardElement.innerHTML = '';
};

const markPosition = (result) => {
    // Enhanced code for marking positions on the board.
    const position = result.position < 10 ? `0${result.position}` : `${result.position}`;
    const targetId = result.enemy ? `${position}0` : position;
    const cell = document.getElementById(targetId);
    if (cell) {
        cell.style.backgroundColor = result.color;
    }
};

const generateMaps = (map, socket) => {
    // Improved function for generating player and own maps.
    generatePlayerMap(map, socket);
    generateOwnMap(map);
};

const generatePlayerMap = (map, socket) => {
    // Enhanced code for generating the player's map.
    const table = $('#board');
    generateTable(table, map, false);
    addClickEventListeners(socket);
};

const generateOwnMap = (map) => {
    // Enhanced code for generating the own map.
    const table = $('#board_player');
    generateTable(table, map, true);
};

const generateTable = (table, map, player) => {
    // Abstracted the logic for generating the game board table.
    map.forEach((row, rowIndex) => {
        const newRow = document.createElement('tr');
        map[0].split('').forEach((column, columnIndex) => {
            newRow.appendChild(newCell(map, rowIndex, columnIndex, player));
        });
        table.appendChild(newRow);
    });
};

const newCell = (map, rowIndex, columnIndex, player) => {
    // Refactored code for creating table cells.
    const cell = document.createElement('td');
    if (player) {
        cell.innerText = map[rowIndex][columnIndex];
    }
    const id = player ? `${rowIndex}${columnIndex}0` : `${rowIndex}${columnIndex}`;
    cell.setAttribute('id', id);
    cell.setAttribute('class', 'points');
    return cell;
};

const getAllEnemyFields = () => $$('.points:not([id$="0"])');

const addClickEventListeners = (socket) => {
    // Enhanced code for adding click event listeners.
    const enemyFields = getAllEnemyFields();
    enemyFields.forEach((cell, i) => {
        cell.addEventListener('click', () => {
            socket.emit('fire', i);
        });
    });
};

init();
