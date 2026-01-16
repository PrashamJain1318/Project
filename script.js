let body = document.querySelector("body");
let btn = document.querySelector(".btn");
let reset = document.querySelector(".reset");
let statusText = document.querySelector(".status");
let boxes = document.querySelectorAll(".box");

let turn = "X";
let gameOver = false;

// Winning combinations
let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Dark mode toggle
btn.addEventListener("click", () => {
    body.classList.toggle("dark");
});

// Box click logic
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || gameOver) return;

        box.innerText = turn;
        checkWinner();
        turn = turn === "X" ? "O" : "X";

        if (!gameOver) {
            statusText.innerText = `Player ${turn}'s Turn`;
        }
    });
});

// Winner checking function
function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (
            boxes[a].innerText !== "" &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            gameOver = true;

            boxes[a].classList.add("winner");
            boxes[b].classList.add("winner");
            boxes[c].classList.add("winner");

            statusText.innerText = `🎉 Player ${boxes[a].innerText} Wins!`;

            return;
        }
    }

    // Draw condition
    let allFilled = [...boxes].every(box => box.innerText !== "");
    if (allFilled) {
        gameOver = true;
        statusText.innerText = "😐 It's a Draw!";
    }
}

// Reset game
reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("winner");
    });

    turn = "X";
    gameOver = false;
    statusText.innerText = "Player X's Turn";
});
