//Configuration et Sélection d'Éléments
const apiUrlWorks = 'http://localhost:5678/api/works';
const galleryContainer = document.querySelector(".gallery"); 

// Variable pour stocker TOUS les travaux
let allWorks = [];

//la fonction pour construire l'element HTML
function createWorkElement(work) {
    //Création des noeuds isolés
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    img.alt = work.title;
    figcaption.textContent = work.title;

    //Définir les enfants pour créér l'hiérarchie html (les enfants de figure)
    figure.appendChild(img);
    figure.appendChild(figcaption);
    return figure;
}

function displayWorks() {
    galleryContainer.innerHTML = "";
    
    // Afficher tous les travaux stockés
    if (allWorks.length > 0) {
        allWorks.forEach(work => {
            const workElement = createWorkElement(work); 
            galleryContainer.appendChild(workElement);
        });
    } else {
        galleryContainer.innerHTML = `<p style="text-align: center;">Aucun travail trouvé.</p>`;
    }
}

// Fonction Principale d'Initialisation 
async function initializePortfolio() {
    try {
        // TÉLÉCHARGEMENT : des travaux
        const worksResponse = await fetch(apiUrlWorks);
        if (!worksResponse.ok) {
            throw new Error(`Erreur HTTP travaux!`);
        }
        allWorks = await worksResponse.json(); // <-- Stockage des données
        
        // AFFICHAGE INITIAL
        displayWorks(); 

    } catch (error) {
        console.error("Échec critique de l'initialisation du portfolio :", error);
        if (galleryContainer) {
            galleryContainer.innerHTML = `<p style="text-align: center; color: red;">Échec du chargement. Vérifiez que le serveur backend est lancé.</p>`;
        }
    }
}

initializePortfolio();