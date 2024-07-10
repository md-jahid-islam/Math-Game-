document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answerInput');
    const submitButton = document.getElementById('submitAnswer');
    const resultElement = document.getElementById('result');
    let correctAnswers = 0;
    let totalQuestions = 0;

    askQuestion();

    submitButton.addEventListener('click', checkAnswer);

    function askQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 5;
        const num2 = Math.floor(Math.random() * 10) + 6;
        const operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
        let question;
        switch (operator) {
            case '+':
                question = `${num1} + ${num2}`;
                break;
            case '-':
                question = `${num1} - ${num2}`;
                break;
            case '*':
                question = `${num1} * ${num2}`;
                break;
            case '/':
                question = `${num1 * num2} / ${num2}`;
                break;
        }
        questionElement.textContent = question;
        answerInput.value = '';
        answerInput.focus();
        totalQuestions++;
    }

    function checkAnswer() {
        const userAnswer = parseFloat(answerInput.value);
        let correctAnswer;
        const questionText = questionElement.textContent;
        if (questionText.includes('+')) {
            correctAnswer = parseInt(questionText.split('+')[3]) + parseInt(questionText.split('+')[1]);
        } else if (questionText.includes('-')) {
            correctAnswer = parseInt(questionText.split('-')[3]) - parseInt(questionText.split('-')[1]);
        } else if (questionText.includes('*')) {
            correctAnswer = parseInt(questionText.split('*')[3]) * parseInt(questionText.split('*')[1]);
        } else if (questionText.includes('/')) {
            correctAnswer = parseInt(questionText.split('/')[3]);
        }

        if (userAnswer === correctAnswer) {
            showResult('Correct!', 'correct');
            correctAnswers++;
        } else {
            showResult('Incorrect!', 'incorrect');
        }

        setTimeout(() => {
            resultElement.textContent = '';
            if (totalQuestions < 10) {
                askQuestion();
            } else {
                endGame();
            }
        }, 1500);
    }

    function showResult(message, className) {
        resultElement.textContent = message;
        resultElement.className = className;
    }

    function endGame() {
        questionElement.textContent = `Game Over! Your score: ${correctAnswers}/${totalQuestions}`;
        answerInput.disabled = true;
        submitButton.disabled = true;
    }
});
