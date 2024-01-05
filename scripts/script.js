let playerOne
let playerTwo
let board

function createGameBoard() {
    let round = 0
    let mark = true
    let board = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
    ]
    const getRound = () => round
    const setRound = () => round++
    const resetRound = () => round = 0
    const getMark = () => mark
    const setMark = () => mark = !mark
    const getBoard = () => board
    const setBoard = (x,y,mark) => mark ? board[x][y] = 'X': board[x][y] = 'O'
    const resetBoard = () => board = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']
    ]
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
    return {getRound, setRound, resetRound, resetBoard, getMark, setMark, getBoard, setBoard, gameEnd};
}

function createPlayer(name, choice){
    const playerName = name
    let score = 0
    let letter = choice
    const getScore = () => score
    const addScore = () => score++
    const setLetter = () => letter = !letter
    const getLetter = () => letter
    return {name, getScore, addScore, getLetter, setLetter}
}

function playerMark(x,y){
    let mark = board.getMark()
    let round = board.getRound()

    board.setBoard(x,y,mark)
    let end = board.gameEnd(board.getBoard())
    
    if(end == 'X'){
        if(playerOne.getLetter() == mark){
            playerOne.addScore()
            console.log(playerOne.name + " ganhou com X")
        }   else{
            console.log(playerTwo.name + " ganhou com X")
            playerTwo.addScore()
        }

        playerOne.setLetter(playerOne.getLetter())
        playerTwo.setLetter(playerTwo.getLetter())
        console.log(board.getBoard()[0])
        console.log(board.getBoard()[1])
        console.log(board.getBoard()[2])

        board.resetBoard()
        board.resetRound()
        return
    }   else if(end == '0'){
        if(playerOne.getLetter() == mark){
            playerOne.addScore()
            console.log(playerOne.name + " ganhou com O")
        }   else{
            console.log(playerTwo.name + " ganhou com O")
            playerTwo.addScore()
        }

        playerOne.setLetter(playerOne.getLetter())
        playerTwo.setLetter(playerTwo.getLetter())
        console.log(board.getBoard()[0])
        console.log(board.getBoard()[1])
        console.log(board.getBoard()[2])

        board.resetBoard()
        board.resetRound()
        return
    }

    board.setMark()
    board.setRound()

    if(round == 8){
        console.log("Empatou\n")
        playerOne.setLetter(playerOne.getLetter())
        playerTwo.setLetter(playerTwo.getLetter())
        console.log(board.getBoard()[0])
        console.log(board.getBoard()[1])
        console.log(board.getBoard()[2])

        board.resetBoard()
        board.resetRound()
        return
    }
}

/** 
const board = createGameBoard()
const playerOne = createPlayer("João", true)
const playerTwo = createPlayer("Carlos", false)

playerMark(0,0)
playerMark(0,1)
playerMark(1,1)
playerMark(2,2)
playerMark(2,1)
playerMark(2,0)
playerMark(0,2)
playerMark(1,0)
playerMark(1,2)
*/

function handleModal(){
    let modal = document.querySelector("dialog")
    modal.showModal()
}

function startGame(){
    let nameOne = document.getElementById("playerOneName").value
    let nameTwo = document.getElementById("playerTwoName").value
    if(nameOne == "" || nameTwo == ""){
        let warning = document.getElementById("warning")
        warning.innerHTML = "Preencha os dois nomes*"
    }   else{
        playerOne = createPlayer(nameOne, true)
        playerTwo = createPlayer(nameTwo, false)
        board = createGameBoard()
    }
}