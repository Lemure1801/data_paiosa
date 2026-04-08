// ==========================================
// DATA PAIA - O PIOR SELETOR DE DATA DO MUNDO
// ==========================================

// Estado global
const state = {
    selectedDay: null,
    selectedMonth: null,
    selectedYear: null,
    currentField: null,
    challengesCompleted: 0,
    startTime: Date.now(),
    mathDigits: [],
    currentMathTarget: 0,
    mazePlayer: { x: 1, y: 1 },
    mazeGoal: { x: 0, y: 0 },
    mazeGrid: [],
    mazeTimer: null,
    puzzleTiles: [],
    shootingTargets: [],
    shootingScore: 0,
    blackjackDeck: [],
    playerHand: [],
    dealerHand: [],
    quizQuestions: [],
    quizCurrent: 0,
    quizCorrect: 0,
    pendingValue: 0
};

// Desafios disponíveis
const challenges = ['maze', 'puzzle', 'shooting', 'blackjack'];

// Perguntas do Quiz
const quizBank = [
    { q: "Qual é a capital da Mongólia?", options: ["Ulan Bator", "Pequim", "Seul", "Tóquio"], correct: 0 },
    { q: "Quantas patas tem uma aranha?", options: ["6", "8", "10", "4"], correct: 1 },
    { q: "Quem pintou a Mona Lisa?", options: ["Michelangelo", "Da Vinci", "Picasso", "Van Gogh"], correct: 1 },
    { q: "Qual o maior oceano do mundo?", options: ["Atlântico", "Índico", "Pacífico", "Ártico"], correct: 2 },
    { q: "Em que ano o Brasil foi descoberto?", options: ["1492", "1500", "1822", "1889"], correct: 1 },
    { q: "Qual é o elemento químico do símbolo 'Au'?", options: ["Prata", "Alumínio", "Ouro", "Argônio"], correct: 2 },
    { q: "Quantos planetas existem no sistema solar?", options: ["7", "8", "9", "10"], correct: 1 },
    { q: "Qual a fórmula da água?", options: ["CO2", "H2O", "NaCl", "O2"], correct: 1 },
    { q: "Quem escreveu Dom Casmurro?", options: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Guimarães Rosa"], correct: 1 },
    { q: "Qual é o maior país do mundo em área?", options: ["China", "EUA", "Rússia", "Canadá"], correct: 2 },
    { q: "Quantos ossos tem o corpo humano adulto?", options: ["106", "206", "306", "186"], correct: 1 },
    { q: "Qual o símbolo químico do Sódio?", options: ["So", "Na", "Sd", "S"], correct: 1 },
];

// ==========================================
// FUNÇÕES DE NAVEGAÇÃO
// ==========================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function transition(callback) {
    const overlay = document.getElementById('transition-overlay');
    overlay.classList.add('active');
    setTimeout(() => {
        callback();
        setTimeout(() => overlay.classList.remove('active'), 300);
    }, 300);
}

// ==========================================
// INÍCIO DA SELEÇÃO
// ==========================================

function startSelection(field) {
    state.currentField = field;
    showTensionScreen();
}

function showTensionScreen() {
    transition(() => {
        showScreen('tension-screen');
        animateTension();
    });
}

function animateTension() {
    const progressFill = document.getElementById('progress-fill');
    const tensionText = document.getElementById('tension-text');
    const messages = [
        "Averiguando Possível Resenha...",
        "Consultando os astros...",
        "Verificando karma do usuário...",
        "Calculando probabilidade de sofrimento...",
        "Invocando entidades burocráticas...",
        "Processando sua dor...",
        "Quase lá (mentira)..."
    ];
    
    let progress = 0;
    let msgIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        progressFill.style.width = Math.min(progress, 100) + '%';
        
        if (Math.random() > 0.7) {
            msgIndex = (msgIndex + 1) % messages.length;
            tensionText.textContent = messages[msgIndex];
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(decideChallenge, 500);
        }
    }, 200);
}

function decideChallenge() {
    // 40% chance de modo manual, 60% chance de mini-game
    if (Math.random() < 0.4) {
        startMathMode();
    } else {
        showEncounter();
    }
}

// ==========================================
// MODO ENCONTRO (ESTILO POKÉMON)
// ==========================================

function showEncounter() {
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    state.currentChallenge = challenge;
    
    const challengeNames = {
        maze: "🌀 LABIRINTO DO TEMPO 🌀",
        puzzle: "🧩 QUEBRA-CABEÇA TEMPORAL 🧩",
        shooting: "🎯 TIRO AO ALVO CRONOLÓGICO 🎯",
        blackjack: "🃏 BLACKJACK DO DESTINO 🃏"
    };
    
    transition(() => {
        showScreen('encounter-screen');
        document.getElementById('challenge-reveal').textContent = challengeNames[challenge];
        
        // Efeito de flash
        const flash = document.querySelector('.flash');
        flash.style.animation = 'none';
        flash.offsetHeight;
        flash.style.animation = 'flash 0.3s ease-out forwards';
    });
}

function startChallenge() {
    const challenge = state.currentChallenge;
    
    transition(() => {
        switch(challenge) {
            case 'maze': initMaze(); break;
            case 'puzzle': initPuzzle(); break;
            case 'shooting': initShooting(); break;
            case 'blackjack': initBlackjack(); break;
        }
    });
}

// ==========================================
// MODO MATEMÁTICA MANUAL
// ==========================================

function startMathMode() {
    state.mathDigits = [];
    state.currentMathTarget = state.currentField === 'year' ? 4 : 2;
    
    transition(() => {
        showScreen('math-screen');
        generateMathProblem();
        updateDigitDisplay();
    });
}

function generateMathProblem() {
    const operations = ['+', '-', '*'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    let a, b, answer;
    
    switch(op) {
        case '+':
            a = Math.floor(Math.random() * 50) + 10;
            b = Math.floor(Math.random() * 50) + 10;
            answer = a + b;
            break;
        case '-':
            a = Math.floor(Math.random() * 50) + 50;
            b = Math.floor(Math.random() * 40) + 10;
            answer = a - b;
            break;
        case '*':
            a = Math.floor(Math.random() * 12) + 2;
            b = Math.floor(Math.random() * 12) + 2;
            answer = a * b;
            break;
    }
    
    state.currentMathAnswer = answer;
    document.getElementById('math-question').textContent = `${a} ${op} ${b} = ?`;
    document.getElementById('math-answer').value = '';
    document.getElementById('math-answer').focus();
}

function checkMathAnswer() {
    const userAnswer = parseInt(document.getElementById('math-answer').value);
    
    if (userAnswer === state.currentMathAnswer) {
        const digit = Math.floor(Math.random() * 10);
        state.mathDigits.push(digit);
        updateDigitDisplay();
        
        if (state.mathDigits.length >= state.currentMathTarget) {
            document.getElementById('finish-math').classList.remove('hidden');
        } else {
            generateMathProblem();
        }
    } else {
        alert('ERRADO! Tente novamente, mortal.');
        generateMathProblem();
    }
}

function updateDigitDisplay() {
    document.getElementById('digits-earned').textContent = 
        state.mathDigits.length > 0 ? state.mathDigits.join('') : '(nenhum ainda)';
}

function finishMathMode() {
    let value = parseInt(state.mathDigits.join('')) || 0;
    
    // Ajustar para limites válidos
    if (state.currentField === 'day') value = Math.min(Math.max(value, 1), 31);
    if (state.currentField === 'month') value = Math.min(Math.max(value, 1), 12);
    if (state.currentField === 'year') value = Math.min(Math.max(value, 1900), 2100);
    
    state.pendingValue = value;
    startQuiz();
}

// ==========================================
// LABIRINTO
// ==========================================

function initMaze() {
    showScreen('maze-screen');
    
    const canvas = document.getElementById('maze-canvas');
    const ctx = canvas.getContext('2d');
    const size = 21;
    const cellSize = Math.floor(canvas.width / size);
    
    // Gerar labirinto simples
    state.mazeGrid = [];
    for (let y = 0; y < size; y++) {
        state.mazeGrid[y] = [];
        for (let x = 0; x < size; x++) {
            // Bordas são paredes
            if (x === 0 || y === 0 || x === size-1 || y === size-1) {
                state.mazeGrid[y][x] = 1;
            } else {
                // Padrão de labirinto simples
                state.mazeGrid[y][x] = (x % 2 === 0 && y % 2 === 0) ? 1 : 
                    (Math.random() > 0.7 ? 1 : 0);
            }
        }
    }
    
    // Garantir caminho
    state.mazeGrid[1][1] = 0;
    state.mazeGrid[size-2][size-2] = 0;
    
    state.mazePlayer = { x: 1, y: 1 };
    state.mazeGoal = { x: size - 2, y: size - 2 };
    
    // Timer
    let timeLeft = 60;
    document.getElementById('maze-time').textContent = timeLeft;
    
    if (state.mazeTimer) clearInterval(state.mazeTimer);
    state.mazeTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('maze-time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(state.mazeTimer);
            alert('TEMPO ESGOTADO! Recomeçando...');
            initMaze();
        }
    }, 1000);
    
    // Desenhar
    function drawMaze() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (state.mazeGrid[y][x] === 1) {
                    ctx.fillStyle = '#4a0080';
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
        
        // Goal
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(state.mazeGoal.x * cellSize + 2, state.mazeGoal.y * cellSize + 2, cellSize - 4, cellSize - 4);
        
        // Player
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(
            state.mazePlayer.x * cellSize + cellSize/2,
            state.mazePlayer.y * cellSize + cellSize/2,
            cellSize/3,
            0, Math.PI * 2
        );
        ctx.fill();
    }
    
    drawMaze();
    
    // Controles
    function handleMazeKey(e) {
        let newX = state.mazePlayer.x;
        let newY = state.mazePlayer.y;
        
        switch(e.key.toLowerCase()) {
            case 'w': case 'arrowup': newY--; break;
            case 's': case 'arrowdown': newY++; break;
            case 'a': case 'arrowleft': newX--; break;
            case 'd': case 'arrowright': newX++; break;
        }
        
        if (newX >= 0 && newX < size && newY >= 0 && newY < size && state.mazeGrid[newY][newX] === 0) {
            state.mazePlayer.x = newX;
            state.mazePlayer.y = newY;
            drawMaze();
            
            if (newX === state.mazeGoal.x && newY === state.mazeGoal.y) {
                clearInterval(state.mazeTimer);
                document.removeEventListener('keydown', handleMazeKey);
                const reward = Math.floor(Math.random() * 10) + 1;
                alert(`LABIRINTO COMPLETADO! +${reward} pontos de tempo!`);
                state.pendingValue = reward;
                state.challengesCompleted++;
                startQuiz();
            }
        }
    }
    
    document.addEventListener('keydown', handleMazeKey);
    state.mazeKeyHandler = handleMazeKey;
}

// ==========================================
// QUEBRA-CABEÇA
// ==========================================

function initPuzzle() {
    showScreen('puzzle-screen');
    
    // Criar tiles 1-8 + vazio
    state.puzzleTiles = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    state.puzzleMoves = 0;
    
    // Embaralhar
    for (let i = 0; i < 100; i++) {
        const emptyIdx = state.puzzleTiles.indexOf(0);
        const moves = getValidPuzzleMoves(emptyIdx);
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        [state.puzzleTiles[emptyIdx], state.puzzleTiles[randomMove]] = 
        [state.puzzleTiles[randomMove], state.puzzleTiles[emptyIdx]];
    }
    
    renderPuzzle();
}

function getValidPuzzleMoves(emptyIdx) {
    const moves = [];
    const row = Math.floor(emptyIdx / 3);
    const col = emptyIdx % 3;
    
    if (row > 0) moves.push(emptyIdx - 3);
    if (row < 2) moves.push(emptyIdx + 3);
    if (col > 0) moves.push(emptyIdx - 1);
    if (col < 2) moves.push(emptyIdx + 1);
    
    return moves;
}

function renderPuzzle() {
    const grid = document.getElementById('puzzle-grid');
    grid.innerHTML = '';
    
    state.puzzleTiles.forEach((tile, idx) => {
        const div = document.createElement('div');
        div.className = 'puzzle-tile' + (tile === 0 ? ' empty' : '');
        div.textContent = tile || '';
        div.onclick = () => movePuzzleTile(idx);
        grid.appendChild(div);
    });
    
    document.getElementById('puzzle-moves').textContent = state.puzzleMoves;
}

function movePuzzleTile(idx) {
    const emptyIdx = state.puzzleTiles.indexOf(0);
    const validMoves = getValidPuzzleMoves(emptyIdx);
    
    if (validMoves.includes(idx)) {
        [state.puzzleTiles[emptyIdx], state.puzzleTiles[idx]] = 
        [state.puzzleTiles[idx], state.puzzleTiles[emptyIdx]];
        state.puzzleMoves++;
        renderPuzzle();
        
        // Verificar vitória
        const solved = state.puzzleTiles.every((t, i) => 
            i === 8 ? t === 0 : t === i + 1
        );
        
        if (solved) {
            const reward = Math.max(1, 15 - Math.floor(state.puzzleMoves / 10));
            alert(`QUEBRA-CABEÇA RESOLVIDO! +${reward} pontos de tempo!`);
            state.pendingValue = reward;
            state.challengesCompleted++;
            startQuiz();
        }
    }
}

// ==========================================
// TIRO AO ALVO
// ==========================================

function initShooting() {
    showScreen('shooting-screen');
    
    const canvas = document.getElementById('shooting-canvas');
    const ctx = canvas.getContext('2d');
    
    state.shootingScore = 0;
    state.shootingTargets = [];
    
    document.getElementById('shooting-score').textContent = '0';
    
    function spawnTarget() {
        if (state.shootingScore >= 5) return;
        
        state.shootingTargets.push({
            x: Math.random() * (canvas.width - 60) + 30,
            y: Math.random() * (canvas.height - 100) + 30,
            radius: 25 + Math.random() * 15,
            speed: 1 + Math.random() * 2,
            direction: Math.random() * Math.PI * 2
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Desenhar céu e grama
        ctx.fillStyle = '#87ceeb';
        ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
        ctx.fillStyle = '#228b22';
        ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
        
        // Desenhar alvos
        state.shootingTargets.forEach(target => {
            // Mover
            target.x += Math.cos(target.direction) * target.speed;
            target.y += Math.sin(target.direction) * target.speed;
            
            // Bounce
            if (target.x < target.radius || target.x > canvas.width - target.radius) {
                target.direction = Math.PI - target.direction;
            }
            if (target.y < target.radius || target.y > canvas.height - target.radius) {
                target.direction = -target.direction;
            }
            
            // Desenhar
            ctx.beginPath();
            ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(target.x, target.y, target.radius * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(target.x, target.y, target.radius * 0.3, 0, Math.PI * 2);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
        });
        
        if (state.shootingScore < 5) {
            requestAnimationFrame(draw);
        }
    }
    
    // Spawn inicial
    for (let i = 0; i < 3; i++) spawnTarget();
    
    // Spawn periódico
    const spawnInterval = setInterval(() => {
        if (state.shootingScore >= 5) {
            clearInterval(spawnInterval);
            return;
        }
        if (state.shootingTargets.length < 5) spawnTarget();
    }, 2000);
    
    canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        for (let i = state.shootingTargets.length - 1; i >= 0; i--) {
            const target = state.shootingTargets[i];
            const dist = Math.hypot(x - target.x, y - target.y);
            
            if (dist < target.radius) {
                state.shootingTargets.splice(i, 1);
                state.shootingScore++;
                document.getElementById('shooting-score').textContent = state.shootingScore;
                
                if (state.shootingScore >= 5) {
                    clearInterval(spawnInterval);
                    const reward = Math.floor(Math.random() * 12) + 5;
                    setTimeout(() => {
                        alert(`TIRO AO ALVO COMPLETADO! +${reward} pontos de tempo!`);
                        state.pendingValue = reward;
                        state.challengesCompleted++;
                        startQuiz();
                    }, 500);
                }
                break;
            }
        }
    };
    
    draw();
}

// ==========================================
// BLACKJACK
// ==========================================

function initBlackjack() {
    showScreen('blackjack-screen');
    
    // Criar baralho
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    
    state.blackjackDeck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            state.blackjackDeck.push({ suit, value });
        });
    });
    
    // Embaralhar
    for (let i = state.blackjackDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [state.blackjackDeck[i], state.blackjackDeck[j]] = [state.blackjackDeck[j], state.blackjackDeck[i]];
    }
    
    state.playerHand = [drawCard(), drawCard()];
    state.dealerHand = [drawCard(), drawCard()];
    
    document.getElementById('blackjack-result').textContent = '';
    document.getElementById('hit-btn').disabled = false;
    document.getElementById('stand-btn').disabled = false;
    
    renderBlackjack(true);
}

function drawCard() {
    return state.blackjackDeck.pop();
}

function getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card.value)) return 10;
    if (card.value === 'A') return 11;
    return parseInt(card.value);
}

function getHandValue(hand) {
    let value = 0;
    let aces = 0;
    
    hand.forEach(card => {
        value += getCardValue(card);
        if (card.value === 'A') aces++;
    });
    
    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }
    
    return value;
}

function renderBlackjack(hideDealer = false) {
    const dealerCards = document.getElementById('dealer-cards');
    const playerCards = document.getElementById('player-cards');
    
    dealerCards.innerHTML = '';
    playerCards.innerHTML = '';
    
    state.dealerHand.forEach((card, idx) => {
        const div = document.createElement('div');
        div.className = 'card ' + (['♥', '♦'].includes(card.suit) ? 'red' : 'black');
        if (hideDealer && idx === 1) {
            div.className = 'card hidden';
            div.textContent = '?';
        } else {
            div.textContent = card.value + card.suit;
        }
        dealerCards.appendChild(div);
    });
    
    state.playerHand.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card ' + (['♥', '♦'].includes(card.suit) ? 'red' : 'black');
        div.textContent = card.value + card.suit;
        playerCards.appendChild(div);
    });
    
    document.getElementById('dealer-score').textContent = hideDealer ? '?' : getHandValue(state.dealerHand);
    document.getElementById('player-score').textContent = getHandValue(state.playerHand);
}

function blackjackHit() {
    state.playerHand.push(drawCard());
    renderBlackjack(true);
    
    if (getHandValue(state.playerHand) > 21) {
        endBlackjack(false);
    }
}

function blackjackStand() {
    // Dealer joga
    while (getHandValue(state.dealerHand) < 17) {
        state.dealerHand.push(drawCard());
    }
    
    renderBlackjack(false);
    
    const playerValue = getHandValue(state.playerHand);
    const dealerValue = getHandValue(state.dealerHand);
    
    if (dealerValue > 21 || playerValue > dealerValue) {
        endBlackjack(true);
    } else if (playerValue < dealerValue) {
        endBlackjack(false);
    } else {
        // Empate - jogar de novo
        document.getElementById('blackjack-result').textContent = 'EMPATE! Jogando novamente...';
        setTimeout(initBlackjack, 2000);
    }
}

function endBlackjack(won) {
    document.getElementById('hit-btn').disabled = true;
    document.getElementById('stand-btn').disabled = true;
    
    if (won) {
        const reward = Math.floor(Math.random() * 15) + 5;
        document.getElementById('blackjack-result').textContent = `VOCÊ GANHOU! +${reward} pontos de tempo!`;
        document.getElementById('blackjack-result').style.background = '#00ff00';
        state.pendingValue = reward;
        state.challengesCompleted++;
        setTimeout(() => startQuiz(), 2000);
    } else {
        document.getElementById('blackjack-result').textContent = 'VOCÊ PERDEU! Tentando novamente...';
        document.getElementById('blackjack-result').style.background = '#ff0000';
        setTimeout(initBlackjack, 2000);
    }
}

// ==========================================
// QUIZ
// ==========================================

function startQuiz() {
    // Selecionar 3 perguntas aleatórias
    const shuffled = [...quizBank].sort(() => Math.random() - 0.5);
    state.quizQuestions = shuffled.slice(0, 3);
    state.quizCurrent = 0;
    state.quizCorrect = 0;
    
    transition(() => {
        showScreen('quiz-screen');
        renderQuizQuestion();
    });
}

function renderQuizQuestion() {
    const q = state.quizQuestions[state.quizCurrent];
    document.getElementById('quiz-question').textContent = q.q;
    document.getElementById('quiz-current').textContent = state.quizCurrent + 1;
    
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.onclick = () => checkQuizAnswer(idx);
        optionsDiv.appendChild(btn);
    });
}

function checkQuizAnswer(idx) {
    const q = state.quizQuestions[state.quizCurrent];
    
    if (idx === q.correct) {
        state.quizCorrect++;
    }
    
    state.quizCurrent++;
    
    if (state.quizCurrent >= 3) {
        if (state.quizCorrect >= 2) {
            applyValue();
        } else {
            alert('Você errou demais! Recomeçando o processo...');
            transition(() => showScreen('main-screen'));
        }
    } else {
        renderQuizQuestion();
    }
}

// ==========================================
// APLICAR VALOR
// ==========================================

function applyValue() {
    let value = state.pendingValue;
    
    // Ajustar para limites válidos
    switch(state.currentField) {
        case 'day':
            value = Math.min(Math.max(value, 1), 31);
            state.selectedDay = value;
            document.getElementById('day-value').textContent = value.toString().padStart(2, '0');
            break;
        case 'month':
            value = Math.min(Math.max(value, 1), 12);
            state.selectedMonth = value;
            document.getElementById('month-value').textContent = value.toString().padStart(2, '0');
            break;
        case 'year':
            value = 1900 + (value % 200);
            state.selectedYear = value;
            document.getElementById('year-value').textContent = value;
            break;
    }
    
    alert(`${state.currentField.toUpperCase()} definido como: ${value}`);
    
    // Verificar se todos os campos estão preenchidos
    if (state.selectedDay && state.selectedMonth && state.selectedYear) {
        document.getElementById('confirm-btn').classList.remove('hidden');
    }
    
    transition(() => showScreen('main-screen'));
}

// ==========================================
// CONFIRMAR DATA
// ==========================================

function confirmDate() {
    const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    document.getElementById('final-date-display').textContent = 
        `${state.selectedDay.toString().padStart(2, '0')}/${state.selectedMonth.toString().padStart(2, '0')}/${state.selectedYear}`;
    document.getElementById('total-time').textContent = `${minutes}m ${seconds}s`;
    document.getElementById('total-challenges').textContent = state.challengesCompleted;
    
    transition(() => showScreen('result-screen'));
}

// ==========================================
// RESET
// ==========================================

function resetAll() {
    state.selectedDay = null;
    state.selectedMonth = null;
    state.selectedYear = null;
    state.challengesCompleted = 0;
    state.startTime = Date.now();
    
    document.getElementById('day-value').textContent = '??';
    document.getElementById('month-value').textContent = '??';
    document.getElementById('year-value').textContent = '????';
    document.getElementById('confirm-btn').classList.add('hidden');
    
    if (state.mazeTimer) clearInterval(state.mazeTimer);
    if (state.mazeKeyHandler) document.removeEventListener('keydown', state.mazeKeyHandler);
    
    transition(() => showScreen('main-screen'));
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('DATA PAIA inicializado. Prepare-se para sofrer.');
});
