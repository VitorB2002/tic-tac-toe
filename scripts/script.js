let playerOne
let playerTwo
let board
const display = document.getElementById("display")
const gameBoard = document.getElementById("game-board")
const resultDisplay = document.getElementById("result")

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
    console.log(end)
    if(end == 'X'){
        if(playerOne.getLetter() == mark){
            playerOne.addScore()
            roundEnd(playerOne.name + " ganhou com X")
        }   else{
            roundEnd(playerTwo.name + " ganhou com X")
            playerTwo.addScore()
        }

        playerOne.setLetter(playerOne.getLetter())
        playerTwo.setLetter(playerTwo.getLetter())
        console.log(board.getBoard()[0])
        console.log(board.getBoard()[1])
        console.log(board.getBoard()[2])

        board.resetBoard()
        board.resetRound()
        updateDisplay()
        return
    }   else if(end == 'O'){
        if(playerOne.getLetter() == mark){
            playerOne.addScore()
            roundEnd(playerOne.name + " ganhou com O")
        }   else{
            roundEnd(playerTwo.name + " ganhou com O")
            playerTwo.addScore()
        }

        playerOne.setLetter(playerOne.getLetter())
        playerTwo.setLetter(playerTwo.getLetter())
        console.log(board.getBoard()[0])
        console.log(board.getBoard()[1])
        console.log(board.getBoard()[2])

        board.resetBoard()
        board.resetRound()
        updateDisplay()
        return
    }

    board.setMark()
    board.setRound()
    if(board.getMark() == playerOne.getLetter()){
        turn.innerHTML = "Vez de " + playerOne.name
    }   else{
        turn.innerHTML = "Vez de " + playerTwo.name
    }
    console.log(board.getBoard()[0])
    console.log(board.getBoard()[1])
    console.log(board.getBoard()[2])

    if(round == 8){
        roundEnd("Empatou")
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
        displayShow()
        gameBoardShow()
    }
}

function gameBoardShow(){
    gameBoard.style.backgroundColor = "black"
    for(let i = 0; i <= 2; i++){
        for(let j = 0; j <= 2; j++){
            let box = document.createElement("div")
            box.className = "box"
            box.setAttribute("x", i)
            box.setAttribute("y", j)
            box.addEventListener("click", (e) => {
                let x = e.target.getAttribute("x")
                let y = e.target.getAttribute("y")
                
                e.target.innerHTML = board.getMark() ? "X" : "O"
                playerMark(x, y)
            })
            gameBoard.appendChild(box)
        }
    }
}

function resetGameBoard(){
    let board = document.getElementsByClassName("box")
    for(let i = 0; i < 9; i++){
        board.item(i).innerHTML = ""
    }
    
    while(resultDisplay.firstChild){
        resultDisplay.firstChild.remove()
    }
}

function displayShow(){
    let displayText = document.createElement("h3")
    let displayPoints = document.createElement("h3")
    let turn = document.createElement("h3")

    displayText.innerHTML = playerOne.name + " X " + playerTwo.name
    displayPoints.innerHTML = playerOne.getScore() + " : " + playerTwo.getScore()
    displayPoints.id = "points"
    turn.id = "turn"

    if(board.getMark() == playerOne.getLetter()){
        turn.innerHTML = "Vez de " + playerOne.name
    }   else{
        turn.innerHTML = "Vez de " + playerTwo.name
    }

    display.appendChild(displayText)
    display.appendChild(displayPoints)
    display.appendChild(turn)
    return
}

function updateDisplay(){
    let displayPoints = document.getElementById("points")
    displayPoints.innerHTML = playerOne.getScore() + " : " + playerTwo.getScore()
}

function updateTurn(){
    let turn = document.getElementById("turn")
    if(board.getMark() == playerOne.getLetter()){
        turn.innerHTML = "Vez de " + playerOne.name
    }   else{
        turn.innerHTML = "Vez de " + playerTwo.name
    }
}

function roundEnd(result){
    let displayResult = document.createElement("h3")
    let resetButton = document.createElement("button")
    displayResult.innerHTML = result
    resetButton.innerHTML = "Novo round"
    resetButton.addEventListener("click", () => {resetGameBoard()})
    resultDisplay.appendChild(displayResult)
    resultDisplay.appendChild(resetButton)
}