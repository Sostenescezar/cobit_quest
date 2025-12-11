// State
const gameState = {
    team1: { name: "", avatar: "", score: 0 },
    team2: { name: "", avatar: "", score: 0 },
    currentTurn: 1, // 1 or 2
    questionsAnswered: 0,
    maxQuestions: 40, // 20 per team
    selectingAvatarFor: 1, // 1 or 2
    timer: null,
    timeLeft: 60
};

const wallpapers = [
    'img/budapeste.png',
    'img/chicago.png',
    'img/londres.png',
    'img/los_angeles.png',
    'img/nova_iorque.png',
    'img/suíça.png'
];

// Questions (40 total)
const questions = [
    // Team 1 Set
    { q: "O que significa a sigla COBIT?", a: ["Control Objectives for Information and Related Technologies", "Computer Objectives for IT", "Control of Business IT", "Common Objectives for IT"], correct: 0 },
    { q: "Qual é o foco principal do COBIT?", a: ["Governança de TI", "Desenvolvimento de Software", "Redes de Computadores", "Suporte Técnico"], correct: 0 },
    { q: "Quantos princípios o COBIT 5 possui?", a: ["5", "4", "7", "10"], correct: 0 },
    { q: "Qual domínio do COBIT trata de 'Alinhar, Planejar e Organizar'?", a: ["APO", "BAI", "DSS", "MEA"], correct: 0 },
    { q: "O COBIT ajuda a alinhar TI com...", a: ["Os objetivos do negócio", "O hardware mais recente", "Os concorrentes", "O departamento financeiro apenas"], correct: 0 },
    { q: "Qual é a versão mais recente do COBIT (até 2019)?", a: ["COBIT 2019", "COBIT 6", "COBIT 5.5", "COBIT X"], correct: 0 },
    { q: "EDM significa...", a: ["Avaliar, Dirigir e Monitorar", "Executar, Definir e Manter", "Engajar, Desenvolver e Medir", "Entender, Documentar e Mapear"], correct: 0 },
    { q: "Qual destes NÃO é um princípio do COBIT 5?", a: ["Focar apenas no lucro", "Atender às necessidades das partes interessadas", "Cobrir a empresa de ponta a ponta", "Aplicar um framework único e integrado"], correct: 0 },
    { q: "O que é um 'Habilitador' no COBIT?", a: ["Fatores que influenciam o sucesso da governança", "Um software específico", "Um tipo de servidor", "Um cargo na diretoria"], correct: 0 },
    { q: "BAI significa...", a: ["Construir, Adquirir e Implementar", "Buscar, Analisar e Integrar", "Basear, Avaliar e Inovar", "Business And Information"], correct: 0 },
    { q: "Quem é o principal público-alvo do COBIT?", a: ["Executivos, Gestores e Auditores", "Apenas Programadores", "Usuários finais apenas", "Estudantes do ensino médio"], correct: 0 },
    { q: "O COBIT é mantido por qual organização?", a: ["ISACA", "Microsoft", "Google", "ISO"], correct: 0 },
    { q: "DSS significa...", a: ["Entregar, Servir e Suportar", "Desenvolver, Segurar e Salvar", "Dados, Sistemas e Segurança", "Diretrizes de Software Seguro"], correct: 0 },
    { q: "MEA significa...", a: ["Monitorar, Avaliar e Analisar", "Medir, Executar e Aplicar", "Mapear, Estruturar e Arquivar", "Manter, Escalar e Adaptar"], correct: 0 },
    { q: "A Governança de TI garante que...", a: ["A TI entregue valor ao negócio", "Os computadores nunca quebrem", "A internet seja rápida", "Todos usem Linux"], correct: 0 },
    { q: "O COBIT distingue claramente entre...", a: ["Governança e Gestão", "Hardware e Software", "Lucro e Prejuízo", "Gerentes e Estagiários"], correct: 0 },
    { q: "Qual é o primeiro passo na implementação do COBIT?", a: ["Entender o contexto e estratégia da empresa", "Comprar licenças de software", "Demitir a equipe de TI", "Instalar antivírus"], correct: 0 },
    { q: "A Cascata de Objetivos do COBIT traduz...", a: ["Objetivos das partes interessadas em objetivos de TI", "Inglês para Português", "Código binário para texto", "Lucros em prejuízos"], correct: 0 },
    { q: "Um processo no COBIT é definido como...", a: ["Um conjunto de práticas e atividades", "Um programa de computador", "Uma reunião semanal", "Um documento em PDF"], correct: 0 },
    { q: "Qual o nível de capacidade mais alto no modelo de processos do COBIT?", a: ["5", "10", "3", "100"], correct: 0 },

    // Team 2 Set
    { q: "Governança Corporativa e Governança de TI são...", a: ["Interligadas, mas distintas", "A mesma coisa", "Incompatíveis", "Opostos"], correct: 0 },
    { q: "Qual destes é um domínio de Gestão no COBIT?", a: ["BAI", "EDM", "ISO", "PMBOK"], correct: 0 },
    { q: "Os 'Princípios' do COBIT servem para...", a: ["Guiar a criação do sistema de governança", "Decorar paredes", "Criar senhas fortes", "Nenhuma das anteriores"], correct: 0 },
    { q: "A dimensão 'Pessoas, Habilidades e Competências' é...", a: ["Um habilitador", "Um problema", "Irrelevante", "Um software"], correct: 0 },
    { q: "O COBIT pode ser usado com outros frameworks como ITIL?", a: ["Sim, é altamente recomendável", "Não, são proibidos", "Talvez, mas é difícil", "Apenas se pagar taxa extra"], correct: 0 },
    { q: "Qual a função do 'Framework' no COBIT?", a: ["Fornecer estrutura e consistência", "Gerar relatórios financeiros", "Bloquear sites", "Monitorar câmeras"], correct: 0 },
    { q: "A 'Gestão' no COBIT é responsável por...", a: ["Planejar, construir, executar e monitorar", "Apenas mandar", "Avaliar e dirigir (isso é Governança)", "Fazer café"], correct: 0 },
    { q: "O 'Modelo Core' do COBIT 2019 possui quantos objetivos de governança/gestão?", a: ["40", "5", "100", "12"], correct: 0 },
    { q: "Fatores de Design no COBIT 2019 ajudam a...", a: ["Personalizar o sistema de governança", "Escolher a cor do logo", "Contratar funcionários", "Comprar computadores"], correct: 0 },
    { q: "A quem o CIO deve reportar idealmente?", a: ["CEO ou COO", "Ao estagiário", "Ao porteiro", "A ninguém"], correct: 0 },
    { q: "Compliance significa...", a: ["Estar em conformidade com leis e regulamentos", "Comprar peças", "Computação em nuvem", "Complexidade"], correct: 0 },
    { q: "Gestão de Riscos de TI envolve...", a: ["Identificar e mitigar ameaças", "Ignorar problemas", "Apenas instalar firewall", "Ter sorte"], correct: 0 },
    { q: "Um exemplo de métrica de TI é...", a: ["Tempo de disponibilidade do sistema (Uptime)", "Cor dos cabos", "Marca do teclado", "Nome do servidor"], correct: 0 },
    { q: "SLA significa...", a: ["Service Level Agreement", "System Local Area", "Secure Link Access", "Software Legal Agreement"], correct: 0 },
    { q: "Qual é o papel da Auditoria de TI?", a: ["Verificar se os controles estão funcionando", "Desenvolver software", "Vender computadores", "Limpar o escritório"], correct: 0 },
    { q: "PDCA (Plan-Do-Check-Act) é...", a: ["Um ciclo de melhoria contínua", "Uma marca de computador", "Um tipo de cabo", "Um vírus"], correct: 0 },
    { q: "KPI significa...", a: ["Key Performance Indicator", "Key Process Input", "Keep People Interested", "Keyboard Input"], correct: 0 },
    { q: "A Matriz RACI define...", a: ["Responsabilidades (Quem faz o quê)", "Rede de computadores", "Regras de firewall", "Rota de backup"], correct: 0 },
    { q: "Qual a importância da Cultura na Governança?", a: ["Fundamental, pois influencia o comportamento", "Nenhuma", "Apenas para festas", "Secundária"], correct: 0 },
    { q: "O COBIT substitui o trabalho técnico?", a: ["Não, ele orienta a gestão e governança", "Sim, faz tudo sozinho", "Sim, robôs assumem", "Talvez"], correct: 0 }
];

// Shuffle array utility
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

// DOM Elements
const mainMenu = document.getElementById('main-menu');
const teamSetup = document.getElementById('team-setup');
const wallpaperSelection = document.getElementById('wallpaper-selection');
const gameArea = document.getElementById('game-area');
const gameOverScreen = document.getElementById('game-over');

const btnNewGame = document.getElementById('btn-new-game');
const btnConfirmNames = document.getElementById('btn-confirm-names');
const btnRestart = document.getElementById('btn-restart');
const wallpaperList = document.getElementById('wallpaper-list');
const wallpaperTitle = document.getElementById('wallpaper-title');

const team1NameInput = document.getElementById('team1-name');
const team2NameInput = document.getElementById('team2-name');

const team1ScoreDisplay = document.getElementById('team1-score-display');
const team2ScoreDisplay = document.getElementById('team2-score-display');
const turnIndicator = document.getElementById('turn-indicator');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const winnerText = document.getElementById('winner-text');

const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackText = document.getElementById('feedback-text');
const feedbackIcon = document.getElementById('feedback-icon');

const timerDisplay = document.getElementById('timer-display');
const container = document.querySelector('.container');

// Init
if (container) {
    container.style.backgroundImage = "url('img/olindadofuturo.jpg')";
}

if (btnNewGame) {
    btnNewGame.addEventListener('click', () => {
        mainMenu.classList.add('hidden');
        teamSetup.classList.remove('hidden');
    });
}

if (btnConfirmNames) {
    btnConfirmNames.addEventListener('click', () => {
        const t1Name = team1NameInput.value.trim() || "Equipe 1";
        const t2Name = team2NameInput.value.trim() || "Equipe 2";
        
        gameState.team1.name = t1Name;
        gameState.team2.name = t2Name;
        
        teamSetup.classList.add('hidden');
        startWallpaperSelection(1);
    });
}

if (btnRestart) {
    btnRestart.addEventListener('click', () => {
        location.reload(); // Simple reload to restart
    });
}

function startWallpaperSelection(teamNum) {
    gameState.selectingAvatarFor = teamNum;
    wallpaperSelection.classList.remove('hidden');
    
    const teamName = teamNum === 1 ? gameState.team1.name : gameState.team2.name;
    wallpaperTitle.innerText = `Escolha o Papel de Parede - ${teamName}`;
    
    wallpaperList.innerHTML = '';
    wallpapers.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('wallpaper-option');
        img.addEventListener('click', () => selectWallpaper(src));
        wallpaperList.appendChild(img);
    });
}

function selectWallpaper(src) {
    if (gameState.selectingAvatarFor === 1) {
        gameState.team1.avatar = src;
        startWallpaperSelection(2);
    } else {
        gameState.team2.avatar = src;
        wallpaperSelection.classList.add('hidden');
        startGame();
    }
}

function startGame() {
    gameState.score = 0; // Not used really, individual scores used
    gameState.questionsAnswered = 0;
    gameState.currentTurn = 1; // Team 1 starts
    
    shuffle(questions);
    
    gameArea.classList.remove('hidden');
    updateUI();
    loadQuestion();
}

function updateUI() {
    team1ScoreDisplay.innerText = `${gameState.team1.name}: ${gameState.team1.score}`;
    team2ScoreDisplay.innerText = `${gameState.team2.name}: ${gameState.team2.score}`;
    const currentName = gameState.currentTurn === 1 ? gameState.team1.name : gameState.team2.name;
    turnIndicator.innerText = `Vez de: ${currentName}`;
    
    // Update background
    const currentAvatar = gameState.currentTurn === 1 ? gameState.team1.avatar : gameState.team2.avatar;
    if (container && currentAvatar) {
        container.style.backgroundImage = `url('${currentAvatar}')`;
    }
}

function loadQuestion() {
    if (gameState.questionsAnswered >= gameState.maxQuestions) {
        endGame();
        return;
    }

    // Reset Timer
    clearInterval(gameState.timer);
    gameState.timeLeft = 60;
    if(timerDisplay) timerDisplay.innerText = gameState.timeLeft;
    
    // Start Timer
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        if(timerDisplay) timerDisplay.innerText = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            handleTimeOut();
        }
    }, 1000);

    const q = questions[gameState.questionsAnswered];
    questionText.innerText = q.q;
    
    let answerIndices = [0, 1, 2, 3];
    shuffle(answerIndices);
    
    answersContainer.innerHTML = '';
    
    const colorClasses = ['btn-red', 'btn-blue', 'btn-yellow', 'btn-green'];
    const shapeClasses = ['shape-triangle', 'shape-diamond', 'shape-circle', 'shape-square'];
    
    answerIndices.forEach((index, i) => {
        const btn = document.createElement('button');
        btn.classList.add('answer-btn', colorClasses[i]);
        
        const shape = document.createElement('div');
        shape.className = `shape ${shapeClasses[i]}`;
        
        const text = document.createElement('span');
        text.className = 'answer-text';
        text.innerText = q.a[index];
        
        btn.appendChild(shape);
        btn.appendChild(text);
        
        btn.addEventListener('click', () => handleAnswer(index, q.correct));
        answersContainer.appendChild(btn);
    });
}

function handleTimeOut() {
    // Show timeout feedback
    feedbackOverlay.classList.remove('hidden');
    feedbackOverlay.classList.remove('feedback-correct');
    feedbackOverlay.classList.add('feedback-wrong');
    feedbackText.innerText = "Tempo Esgotado!";
    feedbackIcon.innerText = "⏰";
    
    setTimeout(() => {
        feedbackOverlay.classList.add('hidden');
        gameState.questionsAnswered++;
        gameState.currentTurn = gameState.currentTurn === 1 ? 2 : 1;
        updateUI();
        loadQuestion();
    }, 2000);
}

function handleAnswer(selectedIndex, correctIndex) {
    clearInterval(gameState.timer); // Stop timer immediately
    
    const isCorrect = selectedIndex === correctIndex;
    
    feedbackOverlay.classList.remove('hidden');
    feedbackOverlay.classList.remove('feedback-correct', 'feedback-wrong');
    
    if (isCorrect) {
        feedbackOverlay.classList.add('feedback-correct');
        
        // Calculate Score: Max 1000, proportional to time left
        const points = Math.floor((gameState.timeLeft / 60) * 1000);
        
        feedbackText.innerText = `Correto! +${points}`;
        feedbackIcon.innerText = "✔";
        
        if (gameState.currentTurn === 1) {
            gameState.team1.score += points;
        } else {
            gameState.team2.score += points;
        }
    } else {
        feedbackOverlay.classList.add('feedback-wrong');
        feedbackText.innerText = "Errado!";
        feedbackIcon.innerText = "✖";
    }
    
    setTimeout(() => {
        feedbackOverlay.classList.add('hidden');
        gameState.questionsAnswered++;
        gameState.currentTurn = gameState.currentTurn === 1 ? 2 : 1;
        updateUI();
        loadQuestion();
    }, 2000);
}

function endGame() {
    clearInterval(gameState.timer);
    gameArea.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    
    let resultMsg = "";
    if (gameState.team1.score > gameState.team2.score) {
        resultMsg = `Vencedor: ${gameState.team1.name}!`;
    } else if (gameState.team2.score > gameState.team1.score) {
        resultMsg = `Vencedor: ${gameState.team2.name}!`;
    } else {
        resultMsg = "Empate!";
    }
    
    winnerText.innerText = `${resultMsg}\nPlacar Final:\n${gameState.team1.name}: ${gameState.team1.score}\n${gameState.team2.name}: ${gameState.team2.score}`;
}