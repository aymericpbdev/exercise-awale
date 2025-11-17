
//fonction pour verifier affamé
function territoireAdverseVide(joueur) {
    const debutAdversaire = joueur === 1 ? 6 : 0;  //defnir le plateau adverse et le plateau du jouer actif 
    const finAdversaire = joueur === 1 ? 11 : 5;   
    
    // on defnit la partie adverse du plateau et regarde si le tout et plus grand que 0, si oui territoire adverse n'est pas vide(fasle) sinon il est vide (true)
    for (let i = debutAdversaire; i <= finAdversaire; i++) {
      if (plateau[i] > 0) {
        return false;
      }
    }
    
    return true;
  }


  //fonction de capture des pions (avec regle de l'affamé) (index correpond à la case)
  function capturePions(index, joueur) {
    const debutAdversaire = joueur === 1 ? 6 : 0; // definir les variable debuts et fin, hors des fonction (doublons ?)
    const finAdversaire = joueur === 1 ? 11 : 5;
    const capturesEffectuees = []; // pour stocker les pions capturé temporairement et les restaurer si capture annulé 
    
    //boucle qui tourne tant qu'on est sur le plateau 
    while (index >= 0 && index <= 11) {
      const pions = plateau[index]; // valeur de la case du plateau correspond au nombre de pions 
      
      //les deux conditions de vérification nb de pions sur la case et casea dverse, si validé  
      if ((pions === 2 || pions === 3) && index >= debutAdversaire && index <= finAdversaire) {
        plateau[index] = 0;
        capturesEffectuees.push({ index, pions }); // vide la case et on enregistre la capture avec la position et le nb de pions capturé 
        
        // apppelle la fonction territoire vide pour vérifier si l'adverasire n'a plus de pions, si oui on remet les pions capturé sur le plateau
        if (territoireAdverseVide(joueur)) {
          for (const capture of capturesEffectuees) {
            plateau[capture.index] = capture.pions;
          }
          break;
        }
        
        scores[`joueur${joueur}`] += pions; // ajoute les pions capturé au score du joueur 
        index--;
      } else {
        break;
      }
    }
  }



  
  function Nourrir(joueur) {
    const debutAdversaire = joueur === 1 ? 6 : 0; // definir les variable debuts et fin, hors des fonction (doublons ?)
    const finAdversaire = joueur === 1 ? 11 : 5;
    
    // Vérifier si territoire adverse est vide
    for (let i = debutAdversaire; i <= finAdversaire; i++) {
      if (plateau[i] > 0) {
        return; // Territoire non vide, rien à signaler
      }
    }
    
    // Territoire adverse vide msg 
    alert("OBLIGATION : Vous devez donner des pions à l'adversaire si possible !");
  }

