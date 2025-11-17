function checkWin() {
    
    // ===== PARTIE 1 : VÉRIFIER SI JOUEUR 1 A GAGNÉ =====
    // Un joueur gagne s'il capture 25 graines ou plus (majorité des 48 graines totales)
    
    for (let i = 0; i < 2; i++){
        if (gameState.scores[i] >= 25){
            messageEL.textContent = `🎯 Player ${i + 1} reaches ${gameState.scores[i]} seeds`;
        endgame();  // Termine la partie
        return;     // Arrête la fonction ici
    }
}

  // ===== PARTIE 2 : PLATEAU COMPLÈTEMENT VIDE =====
    // Si toutes les graines ont été capturées, la partie est finie
    
    if (totalSeedsOnBoard === 0) {
        messageEL.textContent = "Empty tray - End game";
        endgame();
        return;
    }


    // ===== PARTIE 3 : VÉRIFIER SI L'ADVERSAIRE PEUT ENCORE JOUER =====
    // Un joueur doit avoir au moins 1 graine dans ses trous pour jouer
    
    // Trouve l'index de l'adversaire (l'autre joueur)
    const opponentIndex = gameState.currentPlayer === 1 ? 1 : 0;
    // Opérateur ternaire : condition ? siVrai : siFaux
    // Si joueur actuel = 1, adversaire = index 1, sinon index 0
    
    const opponentHasSeeds = gameState.board[opponentIndex].some(seeds => seeds > 0);
    // some() : retourne true si AU MOINS un élément respecte la condition
    // Exemple : [0, 0, 3, 0] → true (car il y a un 3)


    // ===== PARTIE 4 : ADVERSAIRE BLOQUÉ (SANS GRAINES) =====
    // Si l'adversaire ne peut plus jouer, le joueur actuel récupère ses graines restantes
    
    if (!opponentHasSeeds) {
        // ! signifie "NON" → si l'adversaire N'A PAS de graines
        
        const currentPlayerIndex = gameState.currentPlayer - 1;
        // Convertit joueur 1 ou 2 en index 0 ou 1 pour le tableau
        
        const remainingSeeds = gameState.board[currentPlayerIndex].reduce((a,b) => a+b, 0);
        // Calcule combien de graines il reste au joueur actuel

        if (remainingSeeds > 0) {
            // Ajoute ces graines au score du joueur
            gameState.scores[currentPlayerIndex] += remainingSeeds;
            
            // Vide tous les trous du joueur
            gameState.board[currentPlayerIndex] = [0,0,0,0,0,0];
            messageEL.textContent = `⚠️ Player ${gameState.currentPlayer === 1 ? 2 : 1} can no longer play`;
        }
        
        endgame();
        return;
    }

    // ===== PARTIE 5 : AUCUNE CONDITION DE FIN =====
    // Si on arrive ici, la partie continue normalement
    return;
}

/*
═══════════════════════════════════════════════════════════════════════════════
🗒️ RÉSUMÉ DE checkWin()
═══════════════════════════════════════════════════════════════════════════════

RÔLE : Vérifie après chaque coup si la partie d'Awélé est terminée et désigne le gagnant.

Les 8 VÉRIFICATIONS EFFECTUÉES :

1. Victoire Joueur actif → Si score ≥ 25 graines (lignes 6-12)
2. Plateau vide → Si toutes les graines sont capturées (lignes 17-21)
3. Vérifie si l'adversaire peut encore jouer (lignes 27-34)
4. Adversaire bloqué → Le joueur actif récupère ses graines (lignes 40-58)
5. Sinon → La partie continue (ligne 108)

═══════════════════════════════════════════════════════════════════════════════
*/