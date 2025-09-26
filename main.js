const answer_input = document.querySelector("#answer");
const score_input = document.querySelector("#score");
const add_button = document.querySelector("#add");
const start_button = document.querySelector("#start");
const board = document.querySelector("#board");

let pairs = [];
let started = false;

add_button.addEventListener("click", () => {
    const answer = answer_input.value.trim().toUpperCase();
    const score = parseInt(score_input.value, 10);

    if (answer && !isNaN(score)) {
        if (pairs.length === 0) {
            board.innerHTML = "";
        }

        pairs.push({ answer, score });
        const pairElement = document.createElement("div");
        pairElement.textContent = started ? "............." : `${answer} - ${score}`;
        pairElement.style.cursor = "pointer";
        pairElement.dataset.revealed = "false";
        pairElement.dataset.answer = answer;
        pairElement.dataset.score = score;

        pairElement.addEventListener("click", function () {
            if (this.dataset.revealed === "false") {
                this.textContent = `${this.dataset.answer} - ${this.dataset.score}`;
                this.dataset.revealed = "true";
            }
        });

        board.appendChild(pairElement);
        answer_input.value = "";
        score_input.value = "";
    }
});

start_button.addEventListener("click", () => {
    started = true;
    Array.from(board.children).forEach(child => {
        if (child.dataset && child.dataset.revealed === "false") {
            child.textContent = ".............";
        }
    });
});