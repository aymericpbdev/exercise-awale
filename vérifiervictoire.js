function checkWin() {
    // ===== PARTIE 1 : COMPTER LES GRAINES SUR LE PLATEAU =====
    // On additionne toutes les graines restantes sur les deux côtés du plateau
    
    const totalSeedsOnBoard = 
        gameState.board[0].reduce((a, b) => a+b, 0) + // Somme des graines du joueur 1
        gameState.board[1].reduce((a, b) => a+b, 0);  // Somme des graines du joueur 2
    
    // reduce() : additionne tous les nombres d'un tableau
    // Exemple : [2, 3, 1] devient 2+3+1 = 6


    // ===== PARTIE 2 : VÉRIFIER SI JOUEUR 1 A GAGNÉ =====
    // Un joueur gagne s'il capture 25 graines ou plus (majorité des 48 graines totales)
    
    if (gameState.scores[0] >= 25) {
        messageEL.textContent = `🎯 Player 1 reaches ${gameState.scores[0]} seeds`;
        endgame();  // Termine la partie
        return;     // Arrête la fonction ici
    }


    // ===== PARTIE 3 : VÉRIFIER SI JOUEUR 2 A GAGNÉ =====
    
    if (gameState.scores[1] >= 25) {  // CORRECTION NÉCESSAIRE
        messageEL.textContent = `🎯 Player 2 reaches ${gameState.scores[1]} seeds`;
        endgame();
        return;
    }


    // ===== PARTIE 4 : PLATEAU COMPLÈTEMENT VIDE =====
    // Si toutes les graines ont été capturées, la partie est finie
    
    if (totalSeedsOnBoard === 0) {
        messageEL.textContent = "Empty tray - End game";
        endgame();
        return;
    }


    // ===== PARTIE 5 : VÉRIFIER SI L'ADVERSAIRE PEUT ENCORE JOUER =====
    // Un joueur doit avoir au moins 1 graine dans ses trous pour jouer
    
    const player1HasSeeds = gameState.board[0].some(seeds => seeds > 0);
    const player2HasSeeds = gameState.board[1].some(seeds => seeds > 0); // CORRECTION
    
    // some() : retourne true si AU MOINS un élément respecte la condition
    // Exemple : [0, 0, 3, 0] → true (car il y a un 3)

    // Trouve l'index de l'adversaire (l'autre joueur)
    const opponentIndex = gameState.currentPlayer === 1 ? 1 : 0;
    // Opérateur ternaire : condition ? siVrai : siFaux
    // Si joueur actuel = 1, adversaire = index 1, sinon index 0
    
    const opponentHasSeeds = gameState.board[opponentIndex].some(seeds => seeds > 0);


    // ===== PARTIE 6 : ADVERSAIRE BLOQUÉ (SANS GRAINES) =====
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
            messageEL.textContent = `⚠️ Gamer ${gameState.currentPlayer === 1 ? 2 : 1} can no longer play`;
        }
        
        endgame();
        return;
    }


    // ===== PARTIE 7 : DÉTECTION DE PARTIE BLOQUÉE =====
    // Si la partie dure trop longtemps avec peu de graines, on l'arrête
    
    if (totalSeedsOnBoard < 6 && gameState.scores[0] === gameState.scores[1]) {
        // Condition : moins de 6 graines ET scores égaux
        
        if (gameState.history.length > 100) {
            // Si plus de 100 coups joués, c'est trop long
            
            messageEL.textContent = "Part too long - Automatic termination";
            
            // Distribue équitablement les graines restantes
            gameState.scores[0] += Math.floor(totalSeedsOnBoard / 2);  // Arrondi inférieur
            gameState.scores[1] += Math.ceil(totalSeedsOnBoard / 2);   // Arrondi supérieur
            
            // Math.floor(5/2) = 2 et Math.ceil(5/2) = 3 → total = 5 ✓
            
            // Vide le plateau
            gameState.board[0] = [0,0,0,0,0,0];
            gameState.board[1] = [0,0,0,0,0,0];
            
            endgame();
            return;
        }
    }

    // ===== PARTIE 8 : AUCUNE CONDITION DE FIN =====
    // Si on arrive ici, la partie continue normalement
    return;
}


/*
═══════════════════════════════════════════════════════════════════════════════
🗒️ RESUME DE checkWin()
═══════════════════════════════════════════════════════════════════════════════

ROLE : Vérifie après chaque coup si la partie d'Awélé est terminée et désigne le gagnant.

Les 8 VERIFICATIONS EFFECTUEES :
1. Compte les graines sur le plateau (lignes 31-33)
2. Victoire Joueur 1 → Si score ≥ 25 graines (lignes 40-45)
3. Victoire Joueur 1 → Si score ≥ 25 graines (lignes 51-56)
4. Plateau vide → Si toutes les graines sont capturées (lignes 62-66)
5. Vérifie si chaque joueur peut encore jouer (lignes 72-82)
6. Adversaire bloqué → Le joueur actif récupère ses graines (lignes 91-113)
7. Partie trop longue → Si < 6 graines, scores égaux et > 100 coups (lignes 119-142)
8. Sinon → La partie continue (ligne 146)

═══════════════════════════════════════════════════════════════════════════════
*/
