function territoireAdverseVide(joueur) {
    const debutAdversaire = joueur === 1 ? 6 : 0;
    const finAdversaire = joueur === 1 ? 11 : 5;
    
    for (let i = debutAdversaire; i <= finAdversaire; i++) {
      if (plateau[i] > 0) {
        return false;
      }
    }
    
    return true;
  }


  function capturePions(index, joueur) {
    const debutAdversaire = joueur === 1 ? 6 : 0;
    const finAdversaire = joueur === 1 ? 11 : 5;
    
    while (index >= 0 && index <= 11) {
      const pions = plateau[index];
      if ((pions === 2 || pions === 3) && index >= debutAdversaire && index <= finAdversaire) {
        plateau[index] = 0;
        
        // Vérifier si l'adversaire est affame 
        if (territoireAdverseVide(joueur)) {
          plateau[index] = pions; // Restaure les pions
          break;
        }
        
        scores[`joueur${joueur}`] += pions;
        index--;
      } else {
        break;
      }
    }
  }


  //modifie a faire / probleme a résoudre avec cette version si affame, la restoration n'est faite que sur la derniere case vérifié et pas sur les précedente en cas d'enchainement 

  // reste a faire / regle de nourir avec le message 
