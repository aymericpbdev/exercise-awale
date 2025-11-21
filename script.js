// Plateau de jeu : 12 cases avec 4 graines chacune au départ
// Index 0-5 : Joueur 1 (côté bas)
// Index 6-11 : Joueur 2 (côté haut)
let board = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

// état général du jeu initialisé dans 1 seule variable
let gameState = {
    currentPlayer: 0,  // 0 = Joueur 1, 1 = Joueur 2
    scores: [0, 0],    // scores[0] = Joueur 1, scores[1] = Joueur 2
    gameOver: false
};

// éléments DOM
const holes = document.querySelectorAll('.hole');
const score1Element = document.getElementById('score1');
const score2Element = document.getElementById('score2');
const turnDisplay = document.getElementById('turn-display');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button'); // nouvelle variable ppur la reinitialisation 

// Initialise une nouvelle partie
function initializeGame() {
    board = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
    gameState.currentPlayer = 0;
    gameState.scores = [0, 0];
    gameState.gameOver = false;
    updateDisplay();
    messageElement.textContent = '';
    // Activer les cases du joueur 1
    enablePlayerHoles(0);
}

// Met à jour l'affichage du plateau et des scores
function updateDisplay() {
    // Mettre à jour les cases
    holes.forEach((hole) => {
        const player = parseInt(hole.dataset.player);
        const holeIndex = parseInt(hole.dataset.index);
        // Calculer l'index réel dans le tableau board
        // Joueur 1 : data-index 0-5 => board 0-5
        // Joueur 2 : data-index 5-0 (inversé) => board 6-11
        const boardIndex = player === 1 ? holeIndex : 6 + (5 - holeIndex);
        hole.textContent = board[boardIndex];
    });
    // Mettre à jour les scores
    score1Element.textContent = gameState.scores[0];
    score2Element.textContent = gameState.scores[1];
    // Mettre à jour l'indicateur de tour
    turnDisplay.textContent = `Tour: Joueur ${gameState.currentPlayer + 1}`;
}

// Active les cases cliquables pour le joueur actif
// player : 0 ou 1
function enablePlayerHoles(player) {
    holes.forEach(hole => {
        const holePlayer = parseInt(hole.dataset.player) - 1; // Convertir 1/2 en 0/1
        if (holePlayer === player) {
            hole.disabled = false;
            hole.classList.add('active');
        } else {
            hole.disabled = true;
            hole.classList.remove('active');
        }
    });
}

// Distribue les graines d'une case sur le plateau
// startIndex : case de départ (0-11)
// Retourne : dernière case où une graine a été déposée
function distributeSeeds(startIndex) {
    let seeds = board[startIndex];
    board[startIndex] = 0;
    let currentIndex = startIndex;
    while (seeds > 0) {
        // Avancer d'une case en bouclant sur le plateau
        currentIndex = (currentIndex + 1) % board.length;
        // Ne pas redéposer dans la case de départ
        if (currentIndex === startIndex) {
            currentIndex = (currentIndex + 1) % board.length;
        }
        // Déposer une graine
        board[currentIndex]++;
        seeds--;
    }
    return currentIndex;
}

// Vérifie si le territoire adverse est vide
// player : joueur actif (0 ou 1)
// Retourne : true si l'adversaire n'a plus de graines
function isOpponentTerritoryEmpty(player) {
    const opponentStart = player === 0 ? 6 : 0;
    const opponentEnd = player === 0 ? 11 : 5;
    for (let i = opponentStart; i <= opponentEnd; i++) {
        if (board[i] > 0) {
            return false;
        }
    }
    return true;
}



function wouldCaptureStarveOpponent(captureIndices, player) {
    // Déterminer le territoire de l'adversaire
    const opponentStart = player === 0 ? 6 : 0;
    const opponentEnd = player === 0 ? 11 : 5;
    
    // Vérifier s'il reste des graines dans le territoire adverse après simulation
    for (let i = opponentStart; i <= opponentEnd; i++) {
        // Si la case n'est pas dans les captures ET contient des graines
        if (!captureIndices.includes(i) && board[i] > 0) {
            return false; // L'adversaire aurait encore au moins une graine
        }
    }
    
    return true; // L'adversaire serait affamé
}


function captureSeeds(lastIndex, player) {
    const opponentStart = player === 0 ? 6 : 0;
    const opponentEnd = player === 0 ? 11 : 5;
    const captureIndices = [];
    let currentIndex = lastIndex;
    
    // Étape 1 : Identifier toutes les cases à capturer (en remontant)
    while (currentIndex >= opponentStart && currentIndex <= opponentEnd) {
        const seedsInHole = board[currentIndex];
        
        
        if (seedsInHole === 2 || seedsInHole === 3) {
            captureIndices.push(currentIndex);
            currentIndex--;
        } else {
            break; // Arrêter si la condition n'est plus remplie
        }
    }
    
    // Si aucune capture possible, sortir
    if (captureIndices.length === 0) {
        return;
    }
    
    // Étape 2 : Vérifier si la capture affamerait l'adversaire
    if (wouldCaptureStarveOpponent(captureIndices, player)) {
        messageElement.textContent = '⚠️ Capture annulée : vous ne pouvez pas affamer l\'adversaire';
        return;
    }
    
    // Étape 3 : Effectuer la capture (seulement si validée)
    for (const index of captureIndices) {
        gameState.scores[player] += board[index];
        board[index] = 0;
    }
}





// Vérifie si le joueur doit nourrir l'adversaire
// player : joueur actif (0 ou 1)
function checkFeedingObligation(player) {
    if (isOpponentTerritoryEmpty(player)) {
        messageElement.textContent = '⚠️ OBLIGATION : Vous devez donner des graines à l\'adversaire si possible !';
    }
}

// Vérifie si c'est au tour du joueur spécifié
// player : joueur à vérifier (0 ou 1)
// Retourne : true si c'est son tour
function isPlayerTurn(player) {
    return player === gameState.currentPlayer;
}

// Vérifie si le joueur actif peut jouer
// Retourne : true si au moins une case non vide
function canActivePlayerPlay() {
    const start = gameState.currentPlayer === 0 ? 0 : 6;
    const end = gameState.currentPlayer === 0 ? 5 : 11;
    for (let i = start; i <= end; i++) {
        if (board[i] > 0) {
            return true;
        }
    }
    return false;
}

// Passe au joueur suivant
function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 0 ? 1 : 0;
    enablePlayerHoles(gameState.currentPlayer);
    updateDisplay();
    // Vérifier l'obligation de nourrir
    checkFeedingObligation(gameState.currentPlayer);
}

// Vérifie les conditions de victoire
// Un joueur gagne avec 25 graines ou plus
// Retourne : true si la partie est terminée
function checkVictory() {
    // Vérifier si un joueur a atteint 25 graines
    for (let i = 0; i < 2; i++) {
        if (gameState.scores[i] >= 25) {
            endGame(`🎯 Joueur ${i + 1} gagne avec ${gameState.scores[i]} graines !`);
            return true;
        }
    }
    // Vérifier si le joueur actuel ne peut plus jouer
    if (!canActivePlayerPlay()) {
        // Sauvegarder le joueur actuel
        const blockedPlayer = gameState.currentPlayer;
        // Vérifier si l'adversaire peut jouer
        const opponent = blockedPlayer === 0 ? 1 : 0;
        const opponentStart = opponent === 0 ? 0 : 6;
        const opponentEnd = opponent === 0 ? 5 : 11;
        let opponentCanPlay = false;
        for (let i = opponentStart; i <= opponentEnd; i++) {
            if (board[i] > 0) {
                opponentCanPlay = true;
                break;
            }
        }
        // Si l'adversaire ne peut pas non plus jouer alors partie nulle
        if (!opponentCanPlay) {
            declareDraw();
            return true;
        }
        // Si l'adversaire peut jouer mais le joueur bloqué ne peut pas alors partie nulle aussi
        // Car l'adversaire devrait nourrir mais si on est ici c'est que ce n'est pas possible
        declareDraw();
        return true;
    }
    return false;
}

// Déclare une partie nulle
function declareDraw() {
    // NOTE POUR DISCUSSION :
    // Apparemment, selon les règles officielles de l'Awalé quand la partie se termine chaque joueur devrait récupérer les graines restantes dans son camp.
    // Code commenté ci-dessous si vous souhaitez l'implémenter :
    
    /*
    // Récupérer les graines restantes sur le plateau
    let remainingSeeds1 = 0;
    let remainingSeeds2 = 0;
    
    // Cases du joueur 1 (0-5)
    for (let i = 0; i <= 5; i++) {
        remainingSeeds1 += board[i];
    }
    
    // Cases du joueur 2 (6-11)
    for (let i = 6; i <= 11; i++) {
        remainingSeeds2 += board[i];
    }
    
    // Ajouter les graines restantes aux scores
    gameState.scores[0] += remainingSeeds1;
    gameState.scores[1] += remainingSeeds2;
    */
    const finalScore1 = gameState.scores[0];
    const finalScore2 = gameState.scores[1];
    let message = '🤝 Partie nulle ! ';
    if (finalScore1 === finalScore2) {
        message += `Égalité parfaite : ${finalScore1} - ${finalScore2}`;
    } else if (finalScore1 > finalScore2) {
        message += `Joueur 1 : ${finalScore1} - Joueur 2 : ${finalScore2}`;
    } else {
        message += `Joueur 2 : ${finalScore2} - Joueur 1 : ${finalScore1}`;
    }
    endGame(message);
}

// Termine la partie
// message : message à afficher
function endGame(message) {
    gameState.gameOver = true;
    messageElement.textContent = message;
    // Désactiver toutes les cases
    holes.forEach(hole => {
        hole.disabled = true;
        hole.classList.remove('active');
    });
}

// Joue un tour complet
// boardIndex : case choisie par le joueur (0-11)
// Retourne : true si le tour s'est bien joué, false sinon
function playTurn(boardIndex) {
    // Vérifier que la partie n'est pas terminée
    if (gameState.gameOver) return false;
    // Vérifier que la case n'est pas vide
    if (board[boardIndex] === 0) return false;
    // Vérifier que c'est bien une case du joueur actif
    const start = gameState.currentPlayer === 0 ? 0 : 6;
    const end = gameState.currentPlayer === 0 ? 5 : 11;
    if (boardIndex < start || boardIndex > end) return false;
    // Effacer le message précédent
    messageElement.textContent = '';
    // étape 1 : Distribuer les graines
    const lastIndex = distributeSeeds(boardIndex);
    updateDisplay();
    // étape 2 : Vérifier les captures
    captureSeeds(lastIndex, gameState.currentPlayer);
    updateDisplay();
    // étape 3 : Vérifier la victoire
    if (checkVictory()) {
        return true;
    }
    // étape 4 : Passer au joueur suivant
    switchPlayer();
    return true;
}

// Gère le clic sur une case du plateau
// event : événement de clic
function handleHoleClick(event) {
    const clickedHole = event.target;
    const holePlayer = parseInt(clickedHole.dataset.player);
    const holeIndex = parseInt(clickedHole.dataset.index);
    // Calculer l'index réel dans le tableau board
    // Joueur 1 : data-index 0-5 => board 0-5
    // Joueur 2 : data-index 5-0 (inversé) => board 6-11
    const boardIndex = holePlayer === 1 ? holeIndex : 6 + (5 - holeIndex);
    // Convertir holePlayer (1/2) en player (0/1)
    const player = holePlayer - 1;    
    // Condition 1 : Vérifie si la case appartient au joueur actif
    const belongsToActivePlayer = player === gameState.currentPlayer;    
    // Condition 2 : Vérifie si la case n'est pas vide
    const isNotEmpty = board[boardIndex] !== 0;    
    // Si les DEUX conditions sont vraies
    if (belongsToActivePlayer && isNotEmpty) {
        // Jouer le tour complet
        playTurn(boardIndex);
    } else {
        // Afficher un message d'erreur
            messageElement.textContent = '❌ Erreur';
        }
}

// Initialise les écouteurs d'événements
function setupEventListeners() {
    // écouteurs pour les cases du plateau
    holes.forEach(hole => {
        hole.addEventListener('click', handleHoleClick);
    });
}

//Ecoute le click sur le bouton de reinitilisation et le focntion initializeGame()
resetButton.addEventListener('click', () => {
    initializeGame();
    messageElement.textContent = 'Nouvelle partie commencé ! (tour du joueur 1)';
});

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initializeGame();
    messageElement.textContent = '🎮 Partie commencée ! Joueur 1 commence.';
});
