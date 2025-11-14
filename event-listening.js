// Stocke le numéro du joueur qui peut jouer actuellement (1 ou 2)
let activePlayer = 1;

// Sélectionne toutes les cases du jeu
const cases = document.querySelectorAll('.case');

// Parcourt chaque case pour lui attacher un écouteur de clic
cases.forEach(caseElement => {
  // Quand cette case est cliquée, appelle la fonction handleCaseClick
  caseElement.addEventListener('click', handleCaseClick);
});

// Fonction appelée automatiquement quand une case est cliquée
// event : objet contenant toutes les informations sur le clic
function handleCaseClick(event) {

  // Récupère l'élément HTML précis qui a été cliqué
  const clickedCase = event.target;

  // Récupère le numéro du joueur propriétaire (attribut data-player)
  // parseInt() convertit le texte en nombre : "1" devient 1
  const casePlayer = parseInt(clickedCase.dataset.player);

  // Récupère le nombre de pions dans la case (attribut data-value)
  // parseInt() convertit le texte en nombre : "4" devient 4
  const caseValue = parseInt(clickedCase.dataset.value);

  // Condition 1 : Vérifie si la case appartient au joueur actif
  // Retourne true si les numéros correspondent, false sinon
  const belongsToActivePlayer = casePlayer === activePlayer;

  // Condition 2 : Vérifie si la case n'est pas vide
  // !== signifie "différent de"
  // Retourne true si la case contient des pions, false si vide
  const isNotEmpty = caseValue !== 0;

  // Si les DEUX conditions sont vraies (opérateur &&)
  if (belongsToActivePlayer && isNotEmpty) {
    
    // Alors on déclenche l'action de jeu
    executerAction(clickedCase, caseValue);  
  } else {    
    // Sinon, on affiche un message dans la console (optionnel)
    console.log("Case non valide : soit elle n'appartient pas au joueur actif, soit elle est vide");  
  }
}

// Fonction appelée quand une case valide est cliquée
// caseElement : l'élément HTML de la case cliquée
// value : le nombre de pions contenu dans cette case
function executerAction(caseElement, value) {
  
  // Affiche un message de confirmation dans la console du navigateur
  console.log(`Action déclenchée sur la case avec ${value} pions`);
}

/* Structure HTML qui m'a servi de base
<div class="game-board">
  <div class="player-side" data-player="1">
    <button class="case" data-player="1" data-value="4">4</button>
    <button class="case" data-player="1" data-value="4">4</button>
    <button class="case" data-player="1" data-value="4">4</button>
    <button class="case" data-player="1" data-value="4">4</button>
    <button class="case" data-player="1" data-value="4">4</button>
    <button class="case" data-player="1" data-value="4">4</button>
  </div>
  
  <div class="player-side" data-player="2">
    <button class="case" data-player="2" data-value="4">4</button>
    <button class="case" data-player="2" data-value="4">4</button>
    <button class="case" data-player="2" data-value="4">4</button>
    <button class="case" data-player="2" data-value="4">4</button>
    <button class="case" data-player="2" data-value="4">4</button>
    <button class="case" data-player="2" data-value="4">4</button>
  </div>
</div>
*/