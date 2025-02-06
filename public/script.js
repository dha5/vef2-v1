document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!");

    const form = document.querySelector(".quiz-form");

    if (!form) {
        console.error("Quiz form not found!");
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const questions = form.querySelectorAll("fieldset");

        if (questions.length === 0) {
            console.error("No questions found!");
            return;
        }

        questions.forEach((fieldset) => {
            const selectedAnswer = fieldset.querySelector("input[type='radio']:checked");

            if (!selectedAnswer) {
                console.warn("No answer selected for a question!");
                return;
            }

            const isCorrect = selectedAnswer.getAttribute("data-correct") === "true";
            const label = selectedAnswer.parentElement;

            fieldset.querySelectorAll("label").forEach((lbl) => {
                lbl.style.backgroundColor = "";
                lbl.innerHTML = lbl.innerHTML.replace(/✔|✖/g, "");
            });

            label.style.backgroundColor = isCorrect ? "lightgreen" : "red";
            label.innerHTML += isCorrect ? " ✔" : " ✖";
        });
    });
});

