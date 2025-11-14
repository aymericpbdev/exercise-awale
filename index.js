function checkWin() {
    // Calcule le total des graines sur le plateau
    const totalSeedsOnBoard = gameState.board[0].reduce((a, b) => a+b, 0) +
                              gameState.board[1].reduce((a, b) => a+b, 0);
    }

    // Vérifie si un joueur a capturé plus de 50% des graines (25 ou plus)
    if (gameState.scores[0] >= 25){
        messageEL.textContent = '🎯Joueur 1 atteint ${gameState.scores[0]} graines'
        endgame();
        return
    }
    if (gameState.scores[0] >= 25){
        messageEL.textContent = '🎯Joueur 2 atteint ${gameState[0]} graines'
    }

    // Vérifie si le plateau est vide (toutes les graines capturées)