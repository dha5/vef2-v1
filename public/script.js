document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded!");

    document.querySelectorAll(".answer").forEach((answer) => {
        answer.addEventListener("click", () => {
            const isCorrect = answer.dataset.correct === "true";

            document.querySelectorAll(".answer").forEach((el) => {
                el.style.bacgroundColor = "";
            });

            answer.style.backgroundColor = isCorrect ? "lightgreen" : "red";
        });
    });
});