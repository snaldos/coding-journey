//TODO: Clean the code and design the html and css for the result
//TODO: Try to Implement player1 and player2, local or AI

const gameBoardContent  = document.querySelectorAll('.js-box-content');

gameBoardContent.forEach((GameBoardContentElement) => {
  GameBoardContentElement.innerHTML = '';
});

const usedBoxIds = [];

let gameOver = false;

function playGame(boxId) {
  let playerSymbol = '';

  // player X plays in even rounds and player O plays in odd rounds (from round 0 to round 8)
  if (usedBoxIds.length % 2 === 0) {
    playerSymbol = 'X';
  } else {
    playerSymbol = "O";
  }
  usedBoxIds.push(boxId);

  const boxElement = gameBoardContent[boxId];
  boxElement.innerText = playerSymbol;


  gameOver = isGameOver();
}

gameBoardContent.forEach((GameBoardContentElement) => {
  GameBoardContentElement.addEventListener("click", (e) => {
    const boxId = GameBoardContentElement.dataset.boxId;
    if (!usedBoxIds.includes(boxId) && !gameOver) {
      playGame(boxId);
    }
  });
});

function isGameOver() {

  for (let i = 0; i <= 2; i+=2) {
    const crossUpperElementSymbol = gameBoardContent[i].innerHTML;
    const gameBoardMiddleElementSymbol = gameBoardContent[4].innerHTML;
    const crossLowerElementSymbol = gameBoardContent[gameBoardContent.length - (1 + i)].innerHTML;

    if ((crossUpperElementSymbol === gameBoardMiddleElementSymbol) && (crossUpperElementSymbol === crossLowerElementSymbol) && crossUpperElementSymbol) {
      AnnounceResult('win', crossUpperElementSymbol);
      return true;
    }
  }

  for (let i = 0; i < 9; i+=3) {
    const rowFirstElementSymbol = gameBoardContent[i].innerHTML;
    const rowSecondElementSymbol = gameBoardContent[i + 1].innerHTML;
    const rowThirdElementSymbol = gameBoardContent[i + 2].innerHTML;

    if ((rowFirstElementSymbol === rowSecondElementSymbol) && (rowFirstElementSymbol === rowThirdElementSymbol) && rowFirstElementSymbol) {
      AnnounceResult('win', rowFirstElementSymbol);
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    const columnFirstElementSymbol = gameBoardContent[i].innerHTML;
    const columnSecondElementSymbol = gameBoardContent[i + 3].innerHTML;
    const columnThirdElementSymbol = gameBoardContent[i + 6].innerHTML;

    if ((columnFirstElementSymbol === columnSecondElementSymbol) && (columnFirstElementSymbol === columnThirdElementSymbol) && columnFirstElementSymbol) {
      AnnounceResult('win', columnFirstElementSymbol);
      return true;
    }
  }

  if (usedBoxIds.length === 9) {
    AnnounceResult('draw');
    return true;
  }
}

function AnnounceResult(result, winner = 'player') {

  if (result === 'win') {
    console.log(`The winner is ${winner}`);
  } else if (result === 'draw') {
    console.log('draw');
  }
}

