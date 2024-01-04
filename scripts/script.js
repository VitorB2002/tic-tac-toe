function createGameBoard() {
    let board = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
    ]
    const getBoard = () => board
    const setBoard = (x,y) => board[x][y] = 'O'
    const gameEnd = (board) => {
        let result = '-'

        //Checkando horizontais
        for(let i = 0; i <= 2; i++){
            if(board[i].toString() == "X,X,X"){
                result = 'X'
                return result 
            }   else if(board[i].toString() == "O,O,O"){
                result = 'O'
                return result 
            }
        }

        //Checkando verticais
        for(let i = 0; i <= 2; i++){
            let line = []
            for(let j = 0; j <= 2; j++){
                line.push(board[j][i])
            }
            
            if(line.toString() == "X,X,X"){
                result = 'X'
                return result 
            }   else if(line.toString() == "O,O,O"){
                result = 'O'
                return result 
            }
        }

        //Checkando diagonais
        let line = []
        for(let j = 0; j <= 2; j++){
            line.push(board[j][j])
        }

        if(line.toString() == "X,X,X"){
            result = 'X'
            return result 
        }   else if(line.toString() == "O,O,O"){
            result = 'O'
            return result 
        }

        line = []

        line.push(board[0][2])
        line.push(board[1][1])
        line.push(board[2][0])

        if(line.toString() == "X,X,X"){
            result = 'X'
            return result 
        }   else if(line.toString() == "O,O,O"){
            result = 'O'
            return result 
        }

        return result
    } 
    return {getBoard, setBoard, gameEnd};
}

const board = createGameBoard()

board.setBoard(0,0)
board.setBoard(1,1)
board.setBoard(2,2)
console.log(board.getBoard())
console.log(board.gameEnd(board.getBoard()))