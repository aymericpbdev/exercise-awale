//dom, variables a mettre a jour pour l'affichage 
/*
const boxOne = document.getElementById("box1");
const boxTwo = document.getElementById("box2");
const boxThree = document.getElementById("box3");
const boxFour = document.getElementById("box4");
const boxFive = document.getElementById("box5");
const boxSixt = document.getElementById("box6");
const boxSeven = document.getElementById("box7");
const boxEight = document.getElementById("box8");
const boxNine = document.getElementById("box9");
const boxTen = document.getElementById("box10");
const boxEleven = document.getElementById("box11");
const boxTwelve = document.getElementById("box12");

let player1Boxes = [boxOne, boxTwo, boxThree, boxFour, boxFive, boxSixt ];
let player2Boxes = [boxSeven, boxEight, boxNine, boxTen, boxEleven, boxTwelve];

//score joueur 1
let scroreP1 = document.getElementById("score-player-1");
//score joueur 2
let scoreP2 = document.getElementById("score-player-2");
*/



//variables, element du jeu 
let plateau = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
let scores = { joueur1: 0, joueur2: 0 };

/* les deux parametres quil faut pour lancer ma fonction 

index - Index de la dernière case (0-11)
joueur - Joueur actuel (1 ou 2)

*/



//fonction capture des pions apres vérification 
function capturePions(index, joueur) {
  const debutAdversaire = joueur === 1 ? 6 : 0;
  const finAdversaire = joueur === 1 ? 11 : 5;
  
  while (index >= 0 && index <= 11) {
    const pions = plateau[index];
    
    if ((pions === 2 || pions === 3) && index >= debutAdversaire && index <= finAdversaire) {
      scores[`joueur${joueur}`] += pions;
      plateau[index] = 0;
      index--;
    } else {
      break;
    }
  }
}