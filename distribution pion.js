function distributeSeeds(board, startIndex) {
    let seeds = board[startIndex]; // nombre de graines à distribuer
    board[startIndex] = 0;         // on vide la case de départ

    let index = startIndex;

    while (seeds > 0) {
        index = (index + 1) % board.length; // avance en boucle (0→11→0→...)
        board[index]++;                     // dépose une graine
        seeds--;
    }

    return index; // la dernière case arrosée
}
