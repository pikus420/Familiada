const answer_input = document.querySelector("#answer");
const score_input = document.querySelector("#score");
const add_button = document.querySelector("#add");
const hide_button = document.querySelector("#hide");
const board = document.querySelector("#board");
const fail_button_left = document.querySelector("#fail_left");
const fail_button_right = document.querySelector("#fail_right");
const fail_counter_left = document.querySelector("#fail_counter_left");
const fail_counter_right = document.querySelector("#fail_counter_right");

function playSound(src) {
    const sound = new Audio(src);
    sound.play();
}

let pairs = [];
let is_hidden = false;

function addPair() {
    let answer = answer_input.value.trim().toUpperCase();
    let score = parseInt(score_input.value, 10);

    if (answer && !isNaN(score)) {
        if (pairs.length === 0) {
            board.innerHTML = "";
        }

        if(score < 1)
            score = 1;

        let scoreStr = score.toString();
        if (answer.length + scoreStr.length > 27) {
            let maxAnswerLen = 26 - scoreStr.length;
            if (maxAnswerLen > 0) {
                answer = answer.slice(0, maxAnswerLen - 1) + ".";
            } else {
                answer = ".";
            }
        }

        pairs.push({ answer, score });

        pairs.sort((a, b) => b.score - a.score);

        board.innerHTML = "";
        pairs.forEach(pair => {
            const pairElement = document.createElement("div");
            pairElement.textContent = is_hidden ? "............." : `${pair.answer} - ${pair.score}`;
            pairElement.style.cursor = "pointer";
            pairElement.dataset.revealed = "false";
            pairElement.dataset.answer = pair.answer;
            pairElement.dataset.score = pair.score;

            pairElement.addEventListener("click", function () {
                if (!is_hidden) return;
                if (this.dataset.revealed === "false") {
                    this.textContent = `${this.dataset.answer} - ${this.dataset.score}`;
                    playSound("audio/good.wav");
                    this.dataset.revealed = "true";
                }
            });

            board.appendChild(pairElement);
        });

        answer_input.value = "";
        score_input.value = "";
    }
}

add_button.addEventListener("click", addPair);

answer_input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") addPair();
});
score_input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") addPair();
});

hide_button.addEventListener("click", () => {
    is_hidden = !is_hidden;

    Array.from(board.children).forEach(child => {
        if (child.dataset && child.dataset.revealed === "false") {
            child.textContent = is_hidden ? "............." : `${child.dataset.answer} - ${child.dataset.score}`;
        }
    });

    hide_button.value = is_hidden ? "Odkryj 👁" : "Ukryj 👁";
});

fail_button_left.addEventListener("click", () => {
    if (fail_counter_left.querySelectorAll("p").length < 3) {
        const p = document.createElement("p");
        p.textContent = "X";
        p.style.cursor = "pointer";
        p.addEventListener("click", function () {
            this.remove();
        });
        fail_counter_left.appendChild(p);
        playSound("audio/bad.wav");
    }
});

fail_button_right.addEventListener("click", () => {
    if (fail_counter_right.querySelectorAll("p").length < 3) {
        const p = document.createElement("p");
        p.textContent = "X";
        p.style.cursor = "pointer";
        p.addEventListener("click", function () {
            this.remove();
        });
        fail_counter_right.appendChild(p);
        playSound("audio/bad.wav");
    }
});