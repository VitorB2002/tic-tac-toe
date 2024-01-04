function createGameBoard() {
    let board = [['1','2','3'],['4','5','6'],['7','8','9']]
    const getBoard = () => board
    const setBoard = (x,y) => board[x][y] = 'x'
    return {getBoard, setBoard};
}

const board = createGameBoard()

board.setBoard(0,0)
console.log(board.getBoard())