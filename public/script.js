document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!");

    const form = document.querySelector(".quiz-form");

    if (!form) {
        console.error("Quiz form not found!");
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const answers = form.querySelectorAll("input[type='radio']:checked");

        if (answers.length === 0) {
            alert("Please select an answer for each question!");
            return;
        }

        answers.forEach((answer) => {
            const isCorrect = answer.getAttribute("data-correct") === "true";
            const label = answer.parentElement;

            form.querySelectorAll("label").forEach((lbl) => {
                lbl.style.backgroundColor = "";
                lbl.innerHTML = lbl.innerHTML.replace(/✔|✖/g, "");
            });

            label.style.backgroundColor = isCorrect ? "lightgreen" : "red";
            label.innerHTML += isCorrect ? " ✔" : " ✖";
        });
    });
});
