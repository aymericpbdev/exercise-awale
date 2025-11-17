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
    // ===== PARTIE 2 : AUCUNE CONDITION DE FIN =====
    // Si on arrive ici, la partie continue normalement
    return;
}

