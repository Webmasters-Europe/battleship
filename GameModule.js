

/*
class Game {
	constructor(nextPlayer) {
		this.SYMBOLS = ['X', 'O']
		this.TIE = '-'

		if (!nextPlayer) {
			nextPlayer = this.SYMBOLS[Math.floor(Math.random() * 2)]
		}

		this.gameField = this.times({ cells: 9 })

		this.nextPlayer = nextPlayer
		this.result = null
	}
*/
/*
	move(player, cell) {
		const error = this.isTurnValid(player, cell)

		if (error === '') {
			this.gameField[cell] = player
			this.setNextPlayer(player)
			this.result = this.checkFinished(player)
		}

		return error
	}
*/
/*
	isTurnValid(player, cell) {
		if (this.result !== null)
			return 'Ungueltiger Zug: das Spiel ist zu Ende'
		if (player !== this.nextPlayer)
			return `Ungueltiger Zug: ${player} ist nicht am Zug!`
		if (this.gameField[cell] !== '')
			return `Ungueltiger Zug: Feld ${cell} ist nicht frei!`

		return ''
	}
*/
/*
	setNextPlayer(player) {
		this.nextPlayer =
			player === this.SYMBOLS[1] ? this.SYMBOLS[0] : this.SYMBOLS[1]
	}
*/
/*
	checkFinished(player) {
		const wins = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 4, 8],
			[2, 4, 6],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
		]
*/
/*
		return wins.some(this.isSatisfied.bind(this, player))
			? player
			: this.checkTie()
	}
*/
/*
	isSatisfied(player, win) {
		return win.every(i => this.gameField[i] === player)
	}
*/
/*
	checkTie() {
		return this.gameField.every(cell => cell !== '')
			? this.TIE
			: this.result
	}
*/
/*
	times({ cells = 9, fn = () => '' }) {
		const result = new Array(cells)
		for (let i = 0; i < cells; i += 1) result[i] = fn(i)
		return result
	}
}
*/
/*
exports.Game = Game
*/