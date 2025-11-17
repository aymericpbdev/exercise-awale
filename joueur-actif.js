// Joueur actif : 0 = Joueur 1, 1 = Joueur 2
let currentPlayer = 0;

// Pour arrêter la partie
let gameOver = false;

// Vérifie si c'est au joueur de jouer
function isPlayerTurn(player) {
    return player === currentPlayer;
}

// Vérifie si le joueur actif peut jouer (au moins une case non vide)
function activePlayerCanPlay() {
    let start = currentPlayer === 0 ? 0 : 6;
    let end   = currentPlayer === 0 ? 5 : 11;

    for (let i = start; i <= end; i++) {
        if (board[i] > 0) return true; 
    }
    return false;
}

// Déclare la partie nulle
function declareDraw() {
    gameOver = true;
    }

