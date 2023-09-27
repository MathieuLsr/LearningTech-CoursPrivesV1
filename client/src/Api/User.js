Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUser = exports.User = void 0;
class User {
    constructor(ID) {
        this.DateCreationCompte = Date.now();
        this.Nom = "";
        this.Prenom = "";
        this.DateNaissance = Date.now();
        this.Email = "email@email.com";
        //this.Password = "sha256";
        this.Telephone = "001122334455";
        this.Photo = undefined;
        this.DescriptionPersonnelle = "";
        this.PorteFeuille = 0;
        this.ListeAvis = [];
        this.ListeSessionCours = [];
        this.ID = ID;
        this.TypeUser = 2;
    }
}
exports.User = User;
