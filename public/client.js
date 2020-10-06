const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const init = () => {
	const socket = io.connect()

    setupMap(socket)
}

const setupMap = socket => {
    socket.on('setup', (map) => generateMaps(map, socket))
    socket.on('hitAt', (pos) => markPosition(pos))
    socket.on('confirmFireAt', (pos) => markPosition(pos))
    socket.on('reset', () => resetGame())
}

const resetGame = () => {
    $$('td').forEach(td => td.style.backgroundColor = 'white')
    document.getElementById('board_player').innerHTML = ''
    document.getElementById('board').innerHTML = ''
}

const markPosition = (result) => {
    result.position = result.position < 10 ? `0${result.position}` : `${result.position}`
    if (result.enemy) {
        document.getElementById(`${result.position}0`).style.backgroundColor = result.color
    } else {
        document.getElementById(result.position).style.backgroundColor = result.color
    }


}

const generateMaps = (map, socket) => {
    generatePlayerMap(map, socket)
    generateOwnMap(map)
}

const generatePlayerMap = (map, socket) => {
    const table = $('#board')
    map.forEach((row, rowIndex) => {
        newTr = document.createElement('tr')
        map[0].split('').forEach((column, columnIndex) => {
            newTr.appendChild(newCell(map, rowIndex, columnIndex))
        })
        table.appendChild(newTr)
    })
    addClickEventListeners(socket)
}

const generateOwnMap = (map) => {
    const table = $('#board_player')
    map.forEach((row, rowIndex) => {
        newTr = document.createElement('tr')
        map[0].split('').forEach((column, columnIndex) => {
            newTr.appendChild(newCell(map, rowIndex, columnIndex, true))
        })
        table.appendChild(newTr)
    })
}

const newCell = (map, rowIndex, columnIndex, player) => {
    cell = document.createElement('td')
    if (player) cell.innerText = map[rowIndex][columnIndex]
    player ? cell.setAttribute('id',`${rowIndex}${columnIndex}0`) : cell.setAttribute('id',`${rowIndex}${columnIndex}`)
    cell.setAttribute('class', 'points')
    return cell
}

const getAllEnemyFields = () => $$('td')


const addClickEventListeners = socket => {
    getAllEnemyFields().forEach((cell, i) => {
        if (!(`${cell.id}`.length > 2)) {
            cell.addEventListener('click', () => {
                socket.emit('fire', i)
            })
        }
	})
}


init()