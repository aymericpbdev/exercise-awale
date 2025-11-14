function onHoleClick(player, index) {

    // Vérification du tour
    if (!isPlayerTurn(player)) {
        console.log(`Ce n'est pas ton tour ! C'est au joueur ${currentPlayer}.`);
        return;
    }

    console.log(`Le joueur ${player} joue la case ${index}`);

    // ... ici la distribution des graines ...

    // Changer de joueur
    switchPlayer();
    console.log(getCurrentPlayerText());
}
