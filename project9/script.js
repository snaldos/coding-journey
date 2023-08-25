//TODO: Clean the code and design the html and css for the result
//TODO: Restart button
//TODO: Try to Implement player1 and player2, local or AI

const gameBoardContent  = document.querySelectorAll('.js-box-content');
let gameOver = false;

function playGame(gameBoardContentElement) {
  const selectBoxElement = gameBoardContentElement;

  changeSelectedBoxBasedOnPlayerRound('add', selectBoxElement, '&#10006;', '&#12295;');

  selectBoxElement.classList.remove('empty-box', 'js-empty-box');

  gameOver = isGameOver();
}

gameBoardContent.forEach((gameBoardContentElement) => {
  gameBoardContentElement.addEventListener("mouseover", () => {

    if (gameBoardContentElement.classList.contains('js-empty-box') && !gameOver) {
      changeSelectedBoxBasedOnPlayerRound('add', gameBoardContentElement, '&#10006;', '&#12295;');
    }
  });

  gameBoardContentElement.addEventListener("mouseout", () => {

    if (gameBoardContentElement.classList.contains('js-empty-box') && !gameOver) {
      changeSelectedBoxBasedOnPlayerRound('remove', gameBoardContentElement);
    }
  });
});

gameBoardContent.forEach((gameBoardContentElement) => {
  gameBoardContentElement.addEventListener("click", () => {
    if (gameBoardContentElement.classList.contains('js-empty-box') && !gameOver) {
      playGame(gameBoardContentElement);
    }
  });
});



// player X plays in odd rounds and player O plays in even rounds (from round 9 to round 1)
function changeSelectedBoxBasedOnPlayerRound(action, selectBoxElement, playerOneSymbol = '', playerTwoSymbol = '') {

  const emptyBoxes = document.querySelectorAll(".empty-box");

  let playerSymbol = '';

  if (emptyBoxes.length % 2 !== 0) {
    // player X
    playerSymbol = playerOneSymbol;

    if (action === 'add') {
      selectBoxElement.classList.add('player-X');
    } else if (action === 'remove') {
      selectBoxElement.classList.remove('player-X');
    }


  } else {
    //player O
    playerSymbol = playerTwoSymbol;

    if (action === 'add') {
      selectBoxElement.classList.add('player-O');
    } else if (action === 'remove') {
      selectBoxElement.classList.remove('player-O');
    }
  }

  selectBoxElement.innerHTML = playerSymbol;
}

function isGameOver() {

  const emptyBoxes = document.querySelectorAll(".empty-box");
  const strike = document.querySelector(".js-strike");

  for (let i = 0; i <= 2; i+=2) {
    const crossUpperElementSymbol = gameBoardContent[i].innerHTML;
    const gameBoardMiddleElementSymbol = gameBoardContent[4].innerHTML;
    const crossLowerElementSymbol = gameBoardContent[gameBoardContent.length - (1 + i)].innerHTML;

    if ((crossUpperElementSymbol === gameBoardMiddleElementSymbol) && (crossUpperElementSymbol === crossLowerElementSymbol) && crossUpperElementSymbol) {

      const playerClass = gameBoardContent[i].classList[gameBoardContent[i].classList.length - 1];

      strike.classList.add(playerClass);

      if (i === 0) {
        strike.classList.add("strike-diagonal-top-to-bottom");
      } else if (i === 2) {
        strike.classList.add("strike-diagonal-bottom-to-top");
      }
      UpdateResult('win', crossUpperElementSymbol);
      return true;
    }
  }

  for (let i = 0; i < 9; i+=3) {
    const rowFirstElementSymbol = gameBoardContent[i].innerHTML;
    const rowSecondElementSymbol = gameBoardContent[i + 1].innerHTML;
    const rowThirdElementSymbol = gameBoardContent[i + 2].innerHTML;

    if ((rowFirstElementSymbol === rowSecondElementSymbol) && (rowFirstElementSymbol === rowThirdElementSymbol) && rowFirstElementSymbol) {

      const playerClass = gameBoardContent[i].classList[gameBoardContent[i].classList.length - 1];

      strike.classList.add(playerClass);

      if (i === 0) {
        strike.classList.add("strike-row-1");
      } else if (i === 3) {
        strike.classList.add("strike-row-2");
      } else if (i === 6) {
        strike.classList.add("strike-row-3");
      }

      UpdateResult('win', rowFirstElementSymbol);
      return true;
    }
  }

  for (let i = 0; i < 3; i++) {
    const columnFirstElementSymbol = gameBoardContent[i].innerHTML;
    const columnSecondElementSymbol = gameBoardContent[i + 3].innerHTML;
    const columnThirdElementSymbol = gameBoardContent[i + 6].innerHTML;

    if ((columnFirstElementSymbol === columnSecondElementSymbol) && (columnFirstElementSymbol === columnThirdElementSymbol) && columnFirstElementSymbol) {

      const playerClass = gameBoardContent[i].classList[gameBoardContent[i].classList.length - 1];

      strike.classList.add(playerClass);

      if (i === 0) {
        strike.classList.add("strike-column-1");
      } else if (i === 1) {
        strike.classList.add("strike-column-2");
      } else if (i === 2) {
        strike.classList.add("strike-column-3");
      }


      UpdateResult('win', columnFirstElementSymbol);
      return true;
    }
  }

  if (emptyBoxes.length === 0) {
    UpdateResult('draw');
    return true;
  }
}

function UpdateResult(result, winner = 'player') {

  if (result === 'win') {
    console.log(`The winner is ${winner}`);
  } else if (result === 'draw') {
    console.log('draw');
  }

  const emptyBoxes = document.querySelectorAll(".empty-box");
  emptyBoxes.forEach((emptyBox) => {

    //TODO: Figure if i should only style the cursor to default or remove the class
    emptyBox.classList.remove("empty-box", "js-empty-box");
  });
}
