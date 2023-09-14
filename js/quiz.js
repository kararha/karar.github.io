//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "ما هو البروتوكول الذي يُستخدم لنقل صفحات الويب عبر الإنترنت؟",
        options: ["FTP", "HTTP", "SMTP", "HTTPS"],
        correct: "HTTP",
    },
    {
        id: "1",
        question: " ؟  في عمليات نقل البيانات عبر الشبكة ماهو  البروتوكول المستخدم لعمل ذالك",
        options: ["North America", "File Transfer Protocol", "DHCP", "ARP"],
        correct: "File Transfer Protocol",
    },
    {
        id: "2",
        question: "ما هو التكنولوجيا التي تسمح للمستخدمين بتصفح الإنترنت بشكل مجهول؟ ",
        options: ["DNS", "FTP", "VPN (Virtual Private Network)", "Simple Mail Transfer Protocol"],
        correct: "VPN (Virtual Private Network)",
    },
    {
        id: "3",
        question: "؟ SMTP في عمليات البريد الالكتروني ماهو دور بروتوكول ",
        options: ["إرسال البريد الإلكتروني", "تشفير الاتصال", "تصفح الويب", "نقل الملفات"],
        correct: "إرسال البريد الإلكتروني",
    },
    {
        id: "4",
        question: "؟ Normalization ما هو مفهوم قاعدة البيانات ",
        options: ["حذف البيانات", "Clip art", " تخزين البيانات بدون تنظيم", "عملية تنظيم البيانات وتقسيمها بشكل منهجي لتقليل التكرار وتحسين الأداء."],
        correct: "عملية تنظيم البيانات وتقسيمها بشكل منهجي لتقليل التكرار وتحسين الأداء.",
    },
    {
        id: "5",
        question: "ما هي لغة الاستعلام الشائعة المستخدمة لاستعلام قواعد البيانات العلاقية؟",
        options: ["SQL (Structured Query Language)", "HTML", "JavaScript", "File server"],
        correct: "SQL (Structured Query Language)",
    }, {
        id: "6",
        question: "في تطوير تطبيقات الويب ؟ JavaScript ما هو دور لغه البرمجة ",
        options: ["تطوير الجوانب التفاعلية لصفحات الويب", "تصميم الواجهة الرسومية", "تصفح الويب", "PHP"],
        correct: "تطوير الجوانب التفاعلية لصفحات الويب",
    },
    {
        id: "7",
        question: "وما هو دورهُ ؟ SSH ما هو برتوكول ",
        options: ["يربط بين الواجهة وقاعدة البيانات", "IP لمعرفه ", "تخزين المعلومات", "هو بروتوكول يُستخدم للوصول الآمن إلى أجهزة الخادم عبر الشبكة"],
        correct: "هو بروتوكول يُستخدم للوصول الآمن إلى أجهزة الخادم عبر الشبكة",
    },
    {
        id: "8",
        question: "؟ HTTP مقارنةً بـ  HTTPS ما هي ميزة استخدام ",
        options: ["يستخدم لنقل البيانات", " يعمل بشكل مجهول", "HTTP يكون أسرع", "يوفر تشفير الاتصال لضمان أمان البيانات المرسلة والمستلمة"],
        correct: "يوفر تشفير الاتصال لضمان أمان البيانات المرسلة والمستلمة",
    },
    {
        id: "9",
        question: "؟ (Cloud Hosting) ما هي خصائص مشتركة بين خدمات الاستضافة المشتركة وخدمات الاستضافة السحابية ",
        options: [" توفير مساحة على الخادم وموارد مشتركة للمستخدمين", "توفير خوادم مخصصة", "توفير خدمات البريد الإلكتروني", "زيادة التكلفة"],
        correct: "توفير مساحة على الخادم وموارد مشتركة للمستخدمين",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};