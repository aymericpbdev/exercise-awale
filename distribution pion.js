function distributeSeeds(board, startIndex) {
    let seeds = board[startIndex]; // nombre de graines à distribuer
    board[startIndex] = 0;         // on vide la case de départ

    let index = startIndex;

    while (seeds > 0) {

        // Avancer d'une case en bouclant
        index = (index + 1) % board.length;

        // Ne pas redéposer dans la case de départ
        if (index === startIndex) {
            index = (index + 1) % board.length;
        }

        // Déposer une graine
        board[index]++;
        seeds--;
    }

    return index; // la dernière case arrosée
}
