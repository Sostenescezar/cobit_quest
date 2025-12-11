// State
const gameState = {
    team1: { name: "", avatar: "", score: 0, logo: "" },
    team2: { name: "", avatar: "", score: 0, logo: "" },
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
    'img/olindadofuturo.jpg',
    'img/los_angeles.png',
    'img/nova_iorque.png',
    'img/suíça.png'
];

// Questions (40 total)
const questions = [
    // Team 1 Set
    { q: "O que significa a sigla COBIT?", 
        a: ["Control Objectives for Information and Related Technology", "Control Objectives for Business and IT", "Control Operations for IT", "Controls and Objectives for IT"], 
        correct: 0 },

    { q: "Qual organização desenvolveu o COBIT?", 
        a: ["NIST", "ISO", "ISACA", "ITIL Foundation"], 
        correct: 2 },

    { q: "Qual versão do COBIT introduziu os 'fatores de desenho' e 40 objetivos?", 
        a: ["COBIT 5", "COBIT 2019", "COBIT 4.1", "COBIT 2007"], 
        correct: 1 },

    { q: "Quantos objetivos de governança e gerenciamento o COBIT 2019 lista?", 
        a: ["40", "20", "15", "60"], 
        correct: 0 },

    { q: "Qual dos itens abaixo NÃO é listado como componente do sistema de governança segundo o COBIT?", 
        a: ["Estruturas organizacionais", "Processos", "Práticas", "Marketing externo"], 
        correct: 3 },

    { q: "Um dos propósitos do COBIT é alinhar TI com:", 
        a: ["Objetivos de negócio", "Plataformas de nuvem", "Linguagens de programação", "Fornecedores"], 
        correct: 0 },

    { q: "Quais são os 'fatores de desenho' no COBIT?", 
        a: ["Técnicas de codificação", "Parâmetros para adaptar o sistema de governança", "Modelos de contrato", "Frameworks de segurança"], 
        correct: 1 },

    { q: "O COBIT 2019 distingue dois conjuntos de princípios. Um deles refere-se ao sistema de governança. Cite um princípio:", 
        a: ["Prover valor às partes interessadas", "Automação completa", "Substituir auditoria", "Centralização de TI"], 
        correct: 0 },

    { q: "O COBIT foi originalmente criado em que ano?", 
        a: ["1988", "2005", "2012", "1996"], 
        correct: 3 },

    { q: "Qual objetivo principal do 'Design Guide' do COBIT 2019?", 
        a: ["Listar controles detalhados", "Orientar como adaptar o framework à realidade da organização", "Substituir o COBIT 5", "Definir políticas de RH"], 
        correct: 1 },

    { q: "Qual certificação COBIT certifica conhecimentos básicos do COBIT 2019?", 
        a: ["Foundation Bridge", "Design and Implementation", "Implementing NIST using COBIT", "COBIT 2019 Foundation"], 
        correct: 3 },

    { q: "O que o COBIT 2019 introduziu para facilitar a personalização?", 
        a: ["Checklist fixo", "Áreas de foco e medições", "Modelo único", "Protocolo de rede"], 
        correct: 1 },

    { q: "A quem o COBIT originalmente auxiliava quando foi criado?", 
        a: ["Auditores financeiros", "Desenvolvedores", "Recursos Humanos", "Marketing"], 
        correct: 0 },

    { q: "O COBIT 2019 está alinhado a outros frameworks. Cite um exemplo:", 
        a: ["ISO 9001", "HTML", "TCP/IP", "ITIL"], 
        correct: 3 },

    { q: "O que significa 'governança distinta do gerenciamento'?", 
        a: ["Automatizar RH", "Unificar execução", "Gerenciar ativos financeiros", "Separar decisão e execução"], 
        correct: 3 },

    { q: "Uma vantagem da implementação do COBIT é:", 
        a: ["Reduzir equipe", "Aumentar servidores", "Melhorar a segurança da informação", "Eliminar fornecedores"], 
        correct: 2 },

    { q: "Quantos conjuntos de princípios o COBIT 2019 apresenta?", 
        a: ["Dois", "Um", "Quatro", "Seis"], 
        correct: 0 },

    { q: "O que são 'áreas de foco' no COBIT 2019?", 
        a: ["Questões específicas relacionadas aos objetivos", "Tipos de servidores", "Orçamento", "Softwares"], 
        correct: 0 },

    { q: "Qual a relação entre COBIT e conformidade?", 
        a: ["Substitui leis", "Suporta controles de conformidade", "Ignora conformidade", "Não é aplicável a finanças"], 
        correct: 1 },

    { q: "Quem publica os guias oficiais do COBIT 2019?", 
        a: ["ISACA", "ISO", "NIST", "Microsoft"], 
        correct: 0 },


// Team 2 Set
    { q: "O que é governança de TI?", 
        a: ["Linguagem de programação", "Sistema operacional", "Conjunto de normas e práticas de TI", "Tipo de firewall"], 
        correct: 2 },

    { q: "Qual é um objetivo central da governança de TI?", 
        a: ["Aumentar internet", "Instalar servidores", "Escrever código", "Entregar valor ao negócio"], 
        correct: 3 },

    { q: "Segundo a IBM, a governança de TI ajuda a gerenciar:", 
        a: ["Apenas legados", "Somente fornecedores", "Apenas backups", "Riscos, conformidade e alinhamento"], 
        correct: 3 },

    { q: "Diferença entre governança e gerenciamento:", 
        a: ["Governança executa; gerenciamento decide", "Governança decide; gerenciamento executa", "Não há diferença", "TI = negócio"], 
        correct: 1 },

    { q: "Qual norma frequentemente citada junto à governança de TI?", 
        a: ["PCI-DSS", "Sarbanes-Oxley (SOX)", "HIPAA", "GDPR"], 
        correct: 1 },

    { q: "Quem deve participar da governança de TI?", 
        a: ["Apenas fornecedores", "Apenas desenvolvimento", "Executivos e stakeholders", "Apenas clientes"], 
        correct: 2 },

    { q: "Um dos benefícios da governança de TI:", 
        a: ["Alinhamento estratégico", "Redução de 90% de custos", "Automação total", "Eliminar governança"], 
        correct: 0 },

    { q: "O que é um comitê de governança de TI?", 
        a: ["Grupo que define decisões estratégicas", "Operação de redes", "RH", "Fornecedor"], correct: 0 },

    { q: "Governança de TI ajuda a:", 
        a: ["Aumentar ruído", "Escrever código rápido", "Selecionar fornecedores aleatórios", "Garantir que investimentos gerem valor"], 
        correct: 3 },

    { q: "O que costuma formalizar políticas de governança?", 
        a: ["Guias de estilo", "UML", "Testes unitários", "Políticas e frameworks internos"], correct: 3 },

    { q: "Governança de TI e compliance:", 
        a: ["Define controles que suportam requisitos legais", "Ignora regras", "Substitui leis", "Melhora interfaces"], 
        correct: 0 },

    { q: "Modelo de referência comum para processos de TI:", 
        a: ["Manifesto ágil", "HTML5", "TCP/IP", "ITIL"], 
        correct: 3 },

    { q: "A governança de TI é responsabilidade exclusiva de TI?", 
        a: ["Falso", "Verdadeiro", "Às vezes", "Depende"], 
        correct: 0 },

    { q: "Papel executivo envolvido na governança:", 
        a: ["Suporte nível 1", "Estagiário", "CIO", "Fornecedor"], 
        correct: 2 },

    { q: "O que significa alinhamento estratégico?", 
        a: ["TI opera sem supervisão", "TI define mercado", "TI impulsiona objetivos do negócio", "TI corta orçamento"], 
        correct: 2 },

    { q: "A governança de TI contribui para a gestão de riscos ligados a:", 
        a: ["Redes sociais", "Segurança e continuidade", "Design gráfico", "Impressoras"], 
        correct: 1 },

    { q: "Elemento chave da governança:", 
        a: ["Contratação", "KPIs e medição", "Terceirização", "Compra de hardware"], 
        correct: 1 },

    { q: "Framework NÃO usado para governança:", 
        a: ["ITIL (operações/serviços)", "COBIT", "NIST", "Agile"], 
        correct: 0 },

    { 
        q: "Prática recomendada para responsabilidade em TI:", 
        a: ["Deixar fornecedores decidirem", "Não documentar", "Trocar times", "Definir papéis claros (RACI)"], 
        correct: 3 },

    { q: "Governança de TI ajuda a otimizar:", 
        a: ["Design do site", "Investimentos e recursos", "Processo de contratação", "Cafeteria"], correct: 1 }
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

const team1ScoreText = document.getElementById('team1-score-text');
const team2ScoreText = document.getElementById('team2-score-text');
const team1AvatarDisplay = document.getElementById('team1-avatar-display');
const team2AvatarDisplay = document.getElementById('team2-avatar-display');

const turnIndicator = document.getElementById('turn-indicator');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const winnerText = document.getElementById('winner-text'); // Fixed ID
const questionCounter = document.getElementById('question-counter');

// Avatar Inputs
const team1AvatarInput = document.getElementById('team1-avatar-input');
const team2AvatarInput = document.getElementById('team2-avatar-input');
const team1Preview = document.getElementById('team1-preview');
const team2Preview = document.getElementById('team2-preview');

// VS Screen Elements
const vsScreen = document.getElementById('vs-screen');
const vsVideo = document.getElementById('vs-video');
const vsTeam1Avatar = document.getElementById('vs-team1-avatar');
const vsTeam1Name = document.getElementById('vs-team1-name');
const vsTeam2Avatar = document.getElementById('vs-team2-avatar');
const vsTeam2Name = document.getElementById('vs-team2-name');

// Options & Audio Elements
const optionsMenu = document.getElementById('options-menu');
const btnOptions = document.getElementById('btn-options');
const btnOptionsBack = document.getElementById('btn-options-back');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');

let musicEnabled = true;

const timerDisplay = document.getElementById('timer-display');
const container = document.querySelector('.container');

// Init
if (container) {
    container.style.backgroundImage = "url('img/olindadofuturo.jpg')";
}

// Options Menu Logic
if (btnOptions) {
    btnOptions.addEventListener('click', () => {
        mainMenu.classList.add('hidden');
        optionsMenu.classList.remove('hidden');
    });
}

if (btnOptionsBack) {
    btnOptionsBack.addEventListener('click', () => {
        optionsMenu.classList.add('hidden');
        mainMenu.classList.remove('hidden');
    });
}

if (musicToggle) {
    musicToggle.addEventListener('change', (e) => {
        musicEnabled = e.target.checked;
    });
}

// Avatar Upload Logic
function handleAvatarUpload(input, previewElement) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewElement.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

if (team1AvatarInput) {
    team1AvatarInput.addEventListener('change', () => handleAvatarUpload(team1AvatarInput, team1Preview));
}

if (team2AvatarInput) {
    team2AvatarInput.addEventListener('change', () => handleAvatarUpload(team2AvatarInput, team2Preview));
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
        
        // Save Logos (use default if not changed)
        gameState.team1.logo = team1Preview ? team1Preview.src : '';
        gameState.team2.logo = team2Preview ? team2Preview.src : '';
        
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
        showVsScreen();
    }
}

function showVsScreen() {
    if (vsScreen) {
        vsScreen.classList.remove('hidden');
        
        if (vsTeam1Name) vsTeam1Name.innerText = gameState.team1.name;
        if (vsTeam1Avatar) vsTeam1Avatar.src = gameState.team1.logo;
        
        if (vsTeam2Name) vsTeam2Name.innerText = gameState.team2.name;
        if (vsTeam2Avatar) vsTeam2Avatar.src = gameState.team2.logo;
        
        if (vsVideo) {
            vsVideo.currentTime = 0;
            vsVideo.play().catch(e => console.error("Video play failed", e));
            
            vsVideo.onended = () => {
                vsScreen.classList.add('hidden');
                startGame();
            };
        } else {
            // Fallback if video element missing
            setTimeout(() => {
                vsScreen.classList.add('hidden');
                startGame();
            }, 3000);
        }
    } else {
        startGame();
    }
}

function startGame() {
    gameState.score = 0; 
    gameState.questionsAnswered = 0;
    gameState.currentTurn = 1; 
    
    shuffle(questions);
    
    gameArea.classList.remove('hidden');
    updateUI();
    loadQuestion();

    if (musicEnabled && bgMusic) {
        bgMusic.volume = 0.3; // Set a reasonable volume
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
    }
}

function updateUI(addedPoints = 0) {
    let t1Text = `${gameState.team1.name}: ${gameState.team1.score}`;
    let t2Text = `${gameState.team2.name}: ${gameState.team2.score}`;
    
    if (addedPoints > 0) {
        if (gameState.currentTurn === 1) {
            t1Text += ` (+${addedPoints})`;
        } else {
            t2Text += ` (+${addedPoints})`;
        }
    }

    if (team1ScoreText) team1ScoreText.innerText = t1Text;
    if (team2ScoreText) team2ScoreText.innerText = t2Text;
    
    if (team1AvatarDisplay) team1AvatarDisplay.src = gameState.team1.logo;
    if (team2AvatarDisplay) team2AvatarDisplay.src = gameState.team2.logo;
    
    const currentName = gameState.currentTurn === 1 ? gameState.team1.name : gameState.team2.name;
    if (turnIndicator) turnIndicator.innerText = `Vez de: ${currentName}`;
    
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

    if (questionCounter) {
        const teamQuestionsAnswered = Math.floor(gameState.questionsAnswered / 2) + 1;
        questionCounter.innerText = `${teamQuestionsAnswered}/20`;
    }

    clearInterval(gameState.timer);
    gameState.timeLeft = 60;
    if(timerDisplay) timerDisplay.innerText = gameState.timeLeft;
    
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        if(timerDisplay) timerDisplay.innerText = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            clearInterval(gameState.timer);
            handleTimeOut();
        }
    }, 1000);

    const q = questions[gameState.questionsAnswered];
    if (questionText) questionText.innerText = q.q;
    
    let answerIndices = [0, 1, 2, 3];
    shuffle(answerIndices);
    
    if (answersContainer) {
        answersContainer.innerHTML = '';
        
        const colorClasses = ['btn-red', 'btn-blue', 'btn-yellow', 'btn-green'];
        const shapeClasses = ['shape-triangle', 'shape-diamond', 'shape-circle', 'shape-square'];
        
        answerIndices.forEach((index, i) => {
            const btn = document.createElement('button');
            btn.classList.add('answer-btn', colorClasses[i]);
            btn.dataset.originalIndex = index;
            
            const shape = document.createElement('div');
            shape.className = `shape ${shapeClasses[i]}`;
            
            const text = document.createElement('span');
            text.className = 'answer-text';
            text.innerText = q.a[index];
            
            btn.appendChild(shape);
            btn.appendChild(text);
            
            btn.addEventListener('click', (e) => handleAnswer(e.currentTarget, index, q.correct));
            answersContainer.appendChild(btn);
        });
    }
}

function handleTimeOut() {
    if (!answersContainer) return;
    const buttons = answersContainer.querySelectorAll('.answer-btn');
    const q = questions[gameState.questionsAnswered];
    
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';

        const index = parseInt(btn.dataset.originalIndex);
        if (index === q.correct) {
            btn.classList.add('correct-answer');
            const check = document.createElement('span');
            check.innerText = " ✔";
            check.style.fontSize = "30px";
            check.style.marginLeft = "10px";
            btn.appendChild(check);
        } else {
            btn.classList.add('unselected-wrong-answer'); 
            const x = document.createElement('span');
            x.innerText = " ✖";
            x.style.fontSize = "30px";
            x.style.marginLeft = "10px";
            btn.appendChild(x);
        }
    });

    setTimeout(() => {
        gameState.questionsAnswered++;
        gameState.currentTurn = gameState.currentTurn === 1 ? 2 : 1;
        updateUI();
        loadQuestion();
    }, 4000);
}

function handleAnswer(clickedBtn, selectedIndex, correctIndex) {
    clearInterval(gameState.timer); 
    
    const isCorrect = selectedIndex === correctIndex;
    const buttons = answersContainer ? answersContainer.querySelectorAll('.answer-btn') : [];
    let points = 0;

    if (isCorrect) {
        points = Math.floor((gameState.timeLeft / 60) * 1000);
        if (gameState.currentTurn === 1) {
            gameState.team1.score += points;
        } else {
            gameState.team2.score += points;
        }
    }
    
    buttons.forEach(btn => {
        btn.style.pointerEvents = 'none';
        
        const index = parseInt(btn.dataset.originalIndex);
        
        // Create spans for icon and points
        const feedbackContainer = document.createElement('span');
        feedbackContainer.style.marginLeft = 'auto'; 
        
        const pointsSpan = document.createElement('span');
        pointsSpan.style.fontSize = "20px";
        pointsSpan.style.fontWeight = "bold";
        pointsSpan.style.marginRight = "15px"; 
        pointsSpan.classList.add('feedback-points'); 

        const iconSpan = document.createElement('span');
        iconSpan.style.fontSize = "30px";
        
        if (index === correctIndex) {
            btn.classList.add('correct-answer');
            iconSpan.innerText = " ✔";
            
            if (btn === clickedBtn) { 
                pointsSpan.innerText = `+${points}`;
                btn.insertBefore(pointsSpan, btn.firstChild); // Left side
            }
        } else { 
            if (btn === clickedBtn) { 
                btn.classList.add('wrong-answer');
                iconSpan.innerText = " ✖";
                pointsSpan.innerText = `+0`;
                btn.insertBefore(pointsSpan, btn.firstChild); // Left side
            } else { 
                btn.classList.add('unselected-wrong-answer');
            }
        }
        feedbackContainer.appendChild(iconSpan);
        btn.appendChild(feedbackContainer);
    });
    
    updateUI(points); 
    
    setTimeout(() => {
        gameState.questionsAnswered++;
        gameState.currentTurn = gameState.currentTurn === 1 ? 2 : 1;
        updateUI(); 
        loadQuestion();
    }, 4000);
}

function endGame() {
    clearInterval(gameState.timer);
    gameArea.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');

    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
    
    let resultMsg = "";
    if (gameState.team1.score > gameState.team2.score) {
        resultMsg = `Vencedor: ${gameState.team1.name}!`;
    } else if (gameState.team2.score > gameState.team1.score) {
        resultMsg = `Vencedor: ${gameState.team2.name}!`;
    } else {
        resultMsg = "Empate!";
    }
    
    if (winnerText) {
        winnerText.innerText = `${resultMsg}\nPlacar Final:\n${gameState.team1.name}: ${gameState.team1.score}\n${gameState.team2.name}: ${gameState.team2.score}`;
    }
}
