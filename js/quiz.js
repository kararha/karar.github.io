// Quiz Questions with multiple categories
const quizData = [
    // IT Fundamentals
    {
        category: "أساسيات تكنولوجيا المعلومات",
        question: "ما هو المقصود بـ IT؟",
        options: [
            "تقنية المعلومات (Information Technology)",
            "تكامل البيانات (Integration Technology)",
            "تقنية الإنترنت (Internet Technology)",
            "هندسة المعلومات (Information Engineering)"
        ],
        answer: 0
    },
    {
        category: "أساسيات تكنولوجيا المعلومات",
        question: "ما هي الوحدة الأساسية لقياس سعة التخزين؟",
        options: [
            "كيلومتر (KM)",
            "بايت (Byte)",
            "هرتز (Hz)",
            "واط (Watt)"
        ],
        answer: 1
    },

    // Networking
    {
        category: "الشبكات",
        question: "ما هو بروتوكول نقل النص التشعبي المستخدم لتصفح المواقع الإلكترونية؟",
        options: [
            "FTP",
            "SMTP",
            "HTTP",
            "TCP"
        ],
        answer: 2
    },
    {
        category: "الشبكات",
        question: "ما وظيفة عنوان IP؟",
        options: [
            "توثيق المستخدم",
            "تشفير البيانات",
            "تحديد وتعريف الجهاز على الشبكة",
            "تسريع الاتصال بالإنترنت"
        ],
        answer: 2
    },
    {
        category: "الشبكات",
        question: "ما هو البورت الافتراضي لبروتوكول HTTP؟",
        options: [
            "21",
            "25",
            "80",
            "443"
        ],
        answer: 2
    },

    // Databases
    {
        category: "قواعد البيانات",
        question: "أي من التالي ليس نظام إدارة قواعد بيانات؟",
        options: [
            "MySQL",
            "MongoDB",
            "PostgreSQL",
            "ReactJS"
        ],
        answer: 3
    },
    {
        category: "قواعد البيانات",
        question: "ما هو الأمر المستخدم لاسترجاع البيانات من جدول SQL؟",
        options: [
            "GET",
            "FETCH",
            "SELECT",
            "RETRIEVE"
        ],
        answer: 2
    },
    {
        category: "قواعد البيانات",
        question: "ما هي عملية تنظيم البيانات في قاعدة البيانات لتقليل التكرار؟",
        options: [
            "التطبيع (Normalization)",
            "الفهرسة (Indexing)",
            "الترتيب (Sorting)",
            "التجميع (Aggregation)"
        ],
        answer: 0
    },

    // Cybersecurity
    {
        category: "الأمن السيبراني",
        question: "ما هو الهجوم الذي يستغل ثقة المستخدم للحصول على معلومات حساسة؟",
        options: [
            "حصان طروادة (Trojan)",
            "التصيد (Phishing)",
            "حقن SQL (SQL Injection)",
            "هجوم حرمان الخدمة (DDoS)"
        ],
        answer: 1
    },
    {
        category: "الأمن السيبراني",
        question: "ما هو مفتاح التشفير الذي يستخدم نفس المفتاح للتشفير وفك التشفير؟",
        options: [
            "التشفير المتماثل (Symmetric Encryption)",
            "التشفير اللامتماثل (Asymmetric Encryption)",
            "تشفير التجزئة (Hash Encryption)",
            "تشفير المفتاح العام (Public Key Encryption)"
        ],
        answer: 0
    },

    // Web Development
    {
        category: "تطوير الويب",
        question: "أي من اللغات التالية تستخدم لتصميم هيكل صفحة الويب؟",
        options: [
            "JavaScript",
            "CSS",
            "HTML",
            "Python"
        ],
        answer: 2
    },
    {
        category: "تطوير الويب",
        question: "ما هو إطار العمل JavaScript الذي طورته شركة Facebook؟",
        options: [
            "Angular",
            "Vue.js",
            "React",
            "Svelte"
        ],
        answer: 2
    },

    // Artificial Intelligence
    {
        category: "الذكاء الاصطناعي",
        question: "ما هو فرع الذكاء الاصطناعي الذي يركز على تعليم الآلات التعلم من البيانات؟",
        options: [
            "معالجة اللغات الطبيعية (NLP)",
            "التعلم الآلي (Machine Learning)",
            "الرؤية الحاسوبية (Computer Vision)",
            "الروبوتات (Robotics)"
        ],
        answer: 1
    },
    {
        category: "الذكاء الاصطناعي",
        question: "ما هي تقنية الذكاء الاصطناعي التي تحاكي بنية الدماغ البشري؟",
        options: [
            "الشبكات العصبية (Neural Networks)",
            "الخوارزميات الجينية (Genetic Algorithms)",
            "منطق غامض (Fuzzy Logic)",
            "نظم الخبرة (Expert Systems)"
        ],
        answer: 0
    },
    {
        category: "الذكاء الاصطناعي",
        question: "ما هي عملية صياغة التعليمات بشكل فعال للحصول على أفضل النتائج من نماذج الذكاء الاصطناعي؟",
        options: [
            "تصميم النموذج (Model Design)",
            "تدريب النموذج (Model Training)",
            "هندسة الأوامر (Prompt Engineering)",
            "تنقيح النماذج (Model Refinement)"
        ],
        answer: 2
    }
];

// Elements
const startScreen = document.querySelector(".start-screen");
const displayContainer = document.querySelector("#display-container");
const scoreContainer = document.querySelector(".score-container");
const userScore = document.querySelector("#user-score");
const startButton = document.querySelector("#start-button");
const questionCount = document.querySelector(".number-of-question");
const timeLeft = document.querySelector(".time-left");
const nextButton = document.querySelector("#next-button");
const restartButton = document.querySelector("#restart");
const quizContainer = document.querySelector("#container");
const categoryIndicator = document.querySelector(".category-indicator");

// Variables
let questionIndex = 0;
let score = 0;
let count = 11;
let countdown;
let quizArray = [];

// Restart Quiz - updating to match the screenshot style
restartButton.addEventListener("click", () => {
    scoreContainer.classList.add("hide");
    init();
});

// Next Button
nextButton.addEventListener("click", () => {
    questionIndex++;
    if (questionIndex < quizArray.length) {
        clearInterval(countdown);
        displayQuestion();
        count = 11;
        timerDisplay();
    } else {
        // End of quiz
        clearInterval(countdown);
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = `لقد أجبت بشكل صحيح على ${score} من ${quizArray.length} سؤال`;
    }
});

// Timer Function - fixed to handle timer correctly
const timerDisplay = () => {
    // Reset the count
    count = 11;
    
    // Update display immediately before starting interval
    timeLeft.innerHTML = `${count-1}s`;
    
    // Clear any existing interval
    if (countdown) clearInterval(countdown);
    
    // Start new countdown
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count-1}s`;
        
        // Add warning class when time is running low
        if (count <= 4) {
            timeLeft.parentElement.classList.add('time-warning');
        } else {
            timeLeft.parentElement.classList.remove('time-warning');
        }
        
        if (count <= 1) {
            clearInterval(countdown);
            nextButton.click();
        }
    }, 1000);
};

// Display Question - Enhanced to show category icon
const displayQuestion = () => {
    // Question count
    questionCount.innerHTML = `${questionIndex + 1} من ${quizArray.length} أسئلة`;

    // Category icon mapping
    const categoryIcons = {
        "أساسيات تكنولوجيا المعلومات": "fa-laptop",
        "الشبكات": "fa-network-wired",
        "قواعد البيانات": "fa-database",
        "الأمن السيبراني": "fa-shield-alt",
        "تطوير الويب": "fa-code",
        "الذكاء الاصطناعي": "fa-robot"
    };
    
    const categoryIcon = categoryIcons[quizArray[questionIndex].category] || "fa-question";
    
    // Show category with icon
    let categoryHTML = `<div class="category-badge"><i class="fa ${categoryIcon}"></i> ${quizArray[questionIndex].category}</div>`;
    
    // Question
    let questionHTML = `<div class="quiz-question">${quizArray[questionIndex].question}</div>`;
    
    // Options
    let optionsHTML = "";
    quizArray[questionIndex].options.forEach((option, index) => {
        optionsHTML += `<button class="option-div" onclick="checker(this)">${option}</button>`;
    });
    
    quizContainer.innerHTML = categoryHTML + questionHTML + optionsHTML;
};

// Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let options = document.querySelectorAll(".option-div");
    let correctAnswer = quizArray[questionIndex].options[quizArray[questionIndex].answer];
    
    // If user clicked answer is correct
    if (userSolution === correctAnswer) {
        userOption.classList.add("correct");
        score++;
    } else {
        userOption.classList.add("incorrect");
        // Show correct answer
        options.forEach((element) => {
            if (element.innerText === correctAnswer) {
                element.classList.add("correct");
            }
        });
    }
    
    // Disable all options after selection
    options.forEach((element) => {
        element.disabled = true;
    });
    
    // Move to next question after short delay
    setTimeout(() => {
        nextButton.click();
    }, 1800);
}

// Shuffle and select questions
function shuffleQuestions() {
    // First create a copy of the original array
    const fullQuizData = [...quizData];
    
    // Shuffle array
    for (let i = fullQuizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fullQuizData[i], fullQuizData[j]] = [fullQuizData[j], fullQuizData[i]];
    }
    
    // Select a subset covering all categories
    const selectedQuestions = [];
    const categories = [...new Set(fullQuizData.map(q => q.category))];
    
    // Ensure at least one question from each category
    categories.forEach(category => {
        const questionFromCategory = fullQuizData.find(q => q.category === category && !selectedQuestions.includes(q));
        if (questionFromCategory) {
            selectedQuestions.push(questionFromCategory);
            // Remove the selected question from consideration
            const index = fullQuizData.indexOf(questionFromCategory);
            if (index > -1) {
                fullQuizData.splice(index, 1);
            }
        }
    });
    
    // Add more random questions if needed (to reach 10 questions)
    const targetQuestionCount = 10;
    
    while (selectedQuestions.length < targetQuestionCount && fullQuizData.length > 0) {
        // Pick a random question from remaining
        const randomIndex = Math.floor(Math.random() * fullQuizData.length);
        selectedQuestions.push(fullQuizData[randomIndex]);
        fullQuizData.splice(randomIndex, 1);
    }
    
    // Shuffle the final selection for a random order
    for (let i = selectedQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedQuestions[i], selectedQuestions[j]] = [selectedQuestions[j], selectedQuestions[i]];
    }
    
    return selectedQuestions;
}

// Initial setup - Enhanced to reset properly
function init() {
    quizArray = shuffleQuestions();
    questionIndex = 0;
    score = 0;
    
    // Clean up previous quiz state
    if (countdown) {
        clearInterval(countdown);
    }
    
    // Hide the result screen and display questions
    startScreen.classList.add("hide");
    scoreContainer.classList.add("hide");
    displayContainer.classList.remove("hide");
    
    // Display first question and start timer
    displayQuestion();
    timerDisplay();
}

// Start Button
startButton.addEventListener("click", () => {
    init();
});

// Add event listeners after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initially hide the display container to show start screen first
    displayContainer.classList.add("hide");
    scoreContainer.classList.add("hide");
    
    // Make home button work correctly
    const homeButtons = document.querySelectorAll('.home-button, .butt');
    homeButtons.forEach(button => {
        if (button.tagName === 'A' && !button.getAttribute('href')) {
            button.href = 'index.html';
        }
    });
});