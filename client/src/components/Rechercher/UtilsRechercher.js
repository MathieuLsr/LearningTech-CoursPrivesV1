export async function rechercher(CoursTypeCours, CoursNiveauScolaire, CoursPrixMini, CoursPrixMaxi, CoursDureeMini, CoursDureeMaxi, setListCoursFilter) {

    
    const allParams = {
        typeCours: CoursTypeCours,
        niveauScolaire: CoursNiveauScolaire,
        prixMin: CoursPrixMini,
        prixMax: CoursPrixMaxi,
        dureeMin : CoursDureeMini,
        dureeMax : CoursDureeMaxi
    };

    const params = {}

    for(var key in allParams)
        if(allParams[key] !== undefined && allParams[key] !== "") params[key] = allParams[key]
    
    
    const queryString = Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])) 
        .join('&');
    
    try {
        const response = await fetch(`http://192.168.1.208:3001/api/coursEnseignes/search?${queryString}`);
        const data = await response.json();
        setListCoursFilter(data)
    } catch (error) {
        console.error('Erreur lors de la récupération des cours:', error);
    }

}