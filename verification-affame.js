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
    const debutAdversaire = joueur === 1 ? 6 : 0; // definir les variable debuts et fin, hors des fonction (doublons ?)
    const finAdversaire = joueur === 1 ? 11 : 5;
    const capturesEffectuees = []; 
    
    while (index >= 0 && index <= 11) {
      const pions = plateau[index];
      
      if ((pions === 2 || pions === 3) && index >= debutAdversaire && index <= finAdversaire) {
        plateau[index] = 0;
        capturesEffectuees.push({ index, pions }); 
        

        if (territoireAdverseVide(joueur)) {
          for (const capture of capturesEffectuees) {
            plateau[capture.index] = capture.pions;
          }
          break;
        }
        
        scores[`joueur${joueur}`] += pions;
        index--;
      } else {
        break;
      }
    }
  }



  // reste a faire / regle de nourir avec le message 


