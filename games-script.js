// Gestionnaire des mini-jeux interactifs

// Variables globales pour les quiz
let currentQuiz = null;
let currentQuestionIndex = 0;
let quizScore = 0;
let selectedAnswer = null;

// Variables globales pour les exercices de configuration
let currentConfigGame = null;
let currentTaskIndex = 0;

// Fonction pour afficher les jeux d'une section
function renderGamesForSection(moduleId, sectionTitle) {
    const games = getGamesForModuleSection(moduleId, sectionTitle);
    let html = '';
    
    if (games.quiz.length === 0 && games.configuration.length === 0) {
        return '';
    }
    
    html += '<div class="games-section">';
    html += '<h4>🎮 Mini-jeux et exercices</h4>';
    html += '<div class="games-list">';
    
    // Afficher les quiz
    games.quiz.forEach(quiz => {
        html += `
            <div class="game-card">
                <div class="game-card-header">
                    <div>
                        <h5 class="game-card-title">📝 ${quiz.title}</h5>
                        <p class="game-card-description">${quiz.questions.length} questions pour tester vos connaissances</p>
                    </div>
                </div>
                <div class="game-card-actions">
                    <button class="game-button quiz" onclick="startQuiz(${quiz.id})">
                        <span>🎯</span> Commencer le quiz
                    </button>
                </div>
            </div>
        `;
    });
    
    // Afficher les exercices de configuration
    games.configuration.forEach(config => {
        html += `
            <div class="game-card">
                <div class="game-card-header">
                    <div>
                        <h5 class="game-card-title">⚙️ ${config.title}</h5>
                        <p class="game-card-description">${config.description}</p>
                        <p class="game-card-description" style="font-size: 0.85rem; margin-top: 0.5rem;">
                            ${config.tasks.length} exercice(s) pratique(s)
                        </p>
                    </div>
                </div>
                <div class="game-card-actions">
                    <button class="game-button config" onclick="startConfigGame(${config.id})">
                        <span>🔧</span> Commencer l'exercice
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div></div>';
    return html;
}

// Fonction pour démarrer un quiz
function startQuiz(quizId) {
    const quiz = gamesData.quiz.find(q => q.id === quizId);
    if (!quiz) return;
    
    currentQuiz = quiz;
    currentQuestionIndex = 0;
    quizScore = 0;
    selectedAnswer = null;
    
    const modal = document.getElementById('quizModal');
    const title = document.getElementById('quizTitle');
    const container = document.getElementById('quizContainer');
    const results = document.getElementById('quizResults');
    
    if (title) title.textContent = quiz.title;
    if (container) container.innerHTML = '';
    if (results) results.style.display = 'none';
    
    showQuestion();
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fonction pour afficher une question
function showQuestion() {
    if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
        showQuizResults();
        return;
    }
    
    const question = currentQuiz.questions[currentQuestionIndex];
    const container = document.getElementById('quizContainer');
    const progressText = document.getElementById('progressText');
    const progressFill = document.getElementById('progressFill');
    
    if (!container) return;
    
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `Question ${currentQuestionIndex + 1} sur ${currentQuiz.questions.length}`;
    }
    
    let optionsHtml = question.options.map((option, index) => `
        <div class="quiz-option" onclick="selectAnswer(${index})" data-index="${index}">
            ${option}
        </div>
    `).join('');
    
    let explanationHtml = '';
    if (question.explanation) {
        explanationHtml = `
            <div class="quiz-explanation" id="explanation-${currentQuestionIndex}">
                <strong>💡 Explication :</strong><br>
                ${question.explanation}
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="quiz-question">
            <div class="question-text">${question.question}</div>
            <div class="quiz-options">
                ${optionsHtml}
            </div>
            ${explanationHtml}
        </div>
        <div class="quiz-navigation">
            ${currentQuestionIndex > 0 ? 
                `<button class="btn btn-secondary" onclick="previousQuestion()">← Précédent</button>` : 
                '<div></div>'
            }
            <button class="btn btn-primary" id="nextBtn" onclick="nextQuestion()" disabled>
                ${currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Suivant →' : 'Voir les résultats'}
            </button>
        </div>
    `;
    
    selectedAnswer = null;
}

// Fonction pour sélectionner une réponse
function selectAnswer(index) {
    if (!currentQuiz) return;
    
    selectedAnswer = index;
    const question = currentQuiz.questions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    const nextBtn = document.getElementById('nextBtn');
    const explanation = document.getElementById(`explanation-${currentQuestionIndex}`);
    
    // Désactiver toutes les options
    options.forEach(opt => {
        opt.classList.remove('selected');
        opt.style.pointerEvents = 'none';
    });
    
    // Marquer la sélection
    options[index].classList.add('selected');
    
    // Afficher si correct ou incorrect
    setTimeout(() => {
        if (index === question.correct) {
            options[index].classList.add('correct');
            quizScore++;
        } else {
            options[index].classList.add('incorrect');
            if (options[question.correct]) {
                options[question.correct].classList.add('correct');
            }
        }
        
        // Afficher l'explication
        if (explanation) {
            explanation.classList.add('show');
        }
        
        // Activer le bouton suivant
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }, 500);
}

// Fonction pour passer à la question suivante
function nextQuestion() {
    if (selectedAnswer === null) return;
    
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.questions.length) {
        showQuestion();
    } else {
        showQuizResults();
    }
}

// Fonction pour revenir à la question précédente
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        quizScore = 0; // Réinitialiser le score si on revient en arrière
        showQuestion();
    }
}

// Fonction pour afficher les résultats du quiz
function showQuizResults() {
    if (!currentQuiz) return;
    
    const container = document.getElementById('quizContainer');
    const results = document.getElementById('quizResults');
    const scoreDisplay = document.getElementById('scoreDisplay');
    
    if (!container || !results || !scoreDisplay) return;
    
    container.style.display = 'none';
    results.style.display = 'block';
    
    const percentage = Math.round((quizScore / currentQuiz.questions.length) * 100);
    let message = '';
    
    if (percentage === 100) {
        message = '🎉 Parfait ! Vous maîtrisez ce sujet !';
    } else if (percentage >= 70) {
        message = '👍 Bien joué ! Vous avez une bonne compréhension.';
    } else if (percentage >= 50) {
        message = '📚 Continuez à réviser, vous progressez !';
    } else {
        message = '💪 Ne vous découragez pas, continuez à pratiquer !';
    }
    
    scoreDisplay.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">${percentage}%</div>
        <div style="font-size: 1.5rem; color: var(--text-secondary); margin-bottom: 1rem;">
            ${quizScore} / ${currentQuiz.questions.length} bonnes réponses
        </div>
        <div class="score-message">${message}</div>
    `;
}

// Fonction pour fermer le quiz
function closeQuiz() {
    const modal = document.getElementById('quizModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    currentQuiz = null;
    currentQuestionIndex = 0;
    quizScore = 0;
}

// Fonction pour démarrer un exercice de configuration
function startConfigGame(configId) {
    const config = gamesData.configuration.find(c => c.id === configId);
    if (!config) return;
    
    currentConfigGame = config;
    currentTaskIndex = 0;
    
    const modal = document.getElementById('configModal');
    const title = document.getElementById('configTitle');
    const container = document.getElementById('configContainer');
    
    if (title) title.textContent = config.title;
    
    showConfigTask();
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fonction pour afficher une tâche de configuration
function showConfigTask() {
    if (!currentConfigGame || currentTaskIndex >= currentConfigGame.tasks.length) {
        closeConfig();
        return;
    }
    
    const task = currentConfigGame.tasks[currentTaskIndex];
    const container = document.getElementById('configContainer');
    
    if (!container) return;
    
    // Créer des champs de saisie pour les variables
    let commandHtml = task.command;
    const placeholders = task.command.match(/\{([^}]+)\}/g) || [];
    const inputs = [];
    
    placeholders.forEach((placeholder, index) => {
        const varName = placeholder.replace(/[{}]/g, '');
        const inputId = `config-input-${index}`;
        inputs.push({ varName, inputId });
        commandHtml = commandHtml.replace(placeholder, `<input type="text" class="config-input" id="${inputId}" placeholder="${varName}">`);
    });
    
    // Créer les hints
    let hintsHtml = '';
    if (task.hints && task.hints.length > 0) {
        hintsHtml = `
            <div class="config-hints">
                <button class="config-hint-button" onclick="showHint(${currentTaskIndex})">
                    💡 Afficher un indice
                </button>
                <div id="hints-${currentTaskIndex}" style="display: none;">
                    ${task.hints.map((hint, i) => `
                        <div class="config-hint" style="display: ${i === 0 ? 'block' : 'none'};" data-hint-index="${i}">
                            ${hint}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="config-task">
            <div class="config-instruction">${task.instruction}</div>
            <div class="config-command-template" id="command-display">${commandHtml}</div>
            ${hintsHtml}
            <div id="config-result-${currentTaskIndex}" class="config-result"></div>
            <div class="config-actions">
                <button class="btn btn-secondary" onclick="checkConfigSolution()">✅ Vérifier</button>
                <button class="btn btn-primary" onclick="showConfigSolution(${currentTaskIndex})">💡 Voir la solution</button>
                ${currentTaskIndex < currentConfigGame.tasks.length - 1 ? 
                    `<button class="btn btn-primary" onclick="nextConfigTask()" style="display: none;" id="next-task-btn">Exercice suivant →</button>` : 
                    `<button class="btn btn-primary" onclick="closeConfig()" style="display: none;" id="finish-btn">Terminer</button>`
                }
            </div>
        </div>
    `;
    
    // Focus sur le premier input
    const firstInput = document.getElementById('config-input-0');
    if (firstInput) {
        firstInput.focus();
    }
    
    // Permettre la soumission avec Enter
    inputs.forEach(input => {
        const inputEl = document.getElementById(input.inputId);
        if (inputEl) {
            inputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    checkConfigSolution();
                }
            });
        }
    });
}

// Variable pour suivre les hints affichés
let hintIndex = 0;

function showHint(taskIndex) {
    const hintsContainer = document.getElementById(`hints-${taskIndex}`);
    const hints = hintsContainer?.querySelectorAll('.config-hint');
    
    if (!hints || hints.length === 0) return;
    
    if (hintIndex < hints.length) {
        hints[hintIndex].style.display = 'block';
        hintIndex++;
        
        if (hintIndex >= hints.length) {
            const hintButton = document.querySelector('.config-hint-button');
            if (hintButton) {
                hintButton.textContent = '💡 Tous les indices affichés';
                hintButton.disabled = true;
            }
        }
    }
}

// Fonction pour vérifier la solution de configuration
function checkConfigSolution() {
    if (!currentConfigGame) return;
    
    const task = currentConfigGame.tasks[currentTaskIndex];
    const resultDiv = document.getElementById(`config-result-${currentTaskIndex}`);
    
    // Récupérer les valeurs saisies
    const inputs = document.querySelectorAll('.config-input');
    const userValues = Array.from(inputs).map(input => input.value.trim());
    
    // Extraire les valeurs de la solution
    const solutionParts = task.solution.split(/\s+/);
    const solutionValues = solutionParts.filter(part => part && !part.match(/^(interface|switchport|ip|vlan|spanning-tree|crypto|router|network|area|default-router|dns-server|name|mode|access|trunk|priority|portfast|generate|rsa|transport|input|ssh)$/i));
    
    // Comparer (simplifié - dans un vrai système, il faudrait parser la commande)
    let userCommand = task.command;
    const placeholders = task.command.match(/\{([^}]+)\}/g) || [];
    
    placeholders.forEach((placeholder, index) => {
        userCommand = userCommand.replace(placeholder, userValues[index] || '');
    });
    
    // Normaliser les commandes pour la comparaison
    const normalize = (cmd) => cmd.toLowerCase().replace(/\s+/g, ' ').trim();
    const userNormalized = normalize(userCommand);
    const solutionNormalized = normalize(task.solution);
    
    if (userNormalized === solutionNormalized || userCommand === task.solution) {
        // Correct
        if (resultDiv) {
            resultDiv.className = 'config-result success show';
            resultDiv.innerHTML = '✅ Correct ! Excellente configuration.';
        }
        
        const nextBtn = document.getElementById('next-task-btn');
        const finishBtn = document.getElementById('finish-btn');
        if (nextBtn) nextBtn.style.display = 'block';
        if (finishBtn) finishBtn.style.display = 'block';
        
        // Désactiver les inputs
        inputs.forEach(input => {
            input.disabled = true;
            input.style.background = '#1e1e1e';
        });
    } else {
        // Incorrect
        if (resultDiv) {
            resultDiv.className = 'config-result error show';
            resultDiv.innerHTML = '❌ La configuration n\'est pas correcte. Essayez encore !';
        }
    }
}

// Fonction pour afficher la solution
function showConfigSolution(taskIndex) {
    if (!currentConfigGame) return;
    
    const task = currentConfigGame.tasks[taskIndex];
    const resultDiv = document.getElementById(`config-result-${taskIndex}`);
    
    if (resultDiv) {
        resultDiv.className = 'config-result success show';
        resultDiv.innerHTML = `
            <strong>💡 Solution :</strong><br>
            <code style="display: block; margin-top: 0.5rem; padding: 0.5rem; background: rgba(0,0,0,0.2); border-radius: 4px;">
                ${task.solution.replace(/\n/g, '<br>')}
            </code>
        `;
    }
    
    // Remplir les inputs avec la solution
    const solutionParts = task.solution.split(/\s+/);
    const inputs = document.querySelectorAll('.config-input');
    const placeholders = task.command.match(/\{([^}]+)\}/g) || [];
    
    placeholders.forEach((placeholder, index) => {
        // Extraire la valeur correspondante (simplifié)
        if (inputs[index]) {
            inputs[index].value = solutionParts[index] || '';
            inputs[index].disabled = true;
        }
    });
    
    const nextBtn = document.getElementById('next-task-btn');
    const finishBtn = document.getElementById('finish-btn');
    if (nextBtn) nextBtn.style.display = 'block';
    if (finishBtn) finishBtn.style.display = 'block';
}

// Fonction pour passer à la tâche suivante
function nextConfigTask() {
    hintIndex = 0;
    currentTaskIndex++;
    showConfigTask();
}

// Fonction pour fermer le jeu de configuration
function closeConfig() {
    const modal = document.getElementById('configModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    currentConfigGame = null;
    currentTaskIndex = 0;
    hintIndex = 0;
}

// Fermer avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeQuiz();
        closeConfig();
    }
});
