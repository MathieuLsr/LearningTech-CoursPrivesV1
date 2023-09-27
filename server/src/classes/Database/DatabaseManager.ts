import { type } from 'os';
import { DataTypes, Model, ModelStatic, Sequelize } from 'sequelize';
import { } from 'typeorm'
import { Cfg_NiveauScolaire, initCfgNiveauScolaireAdapter } from '../Entities/Cfg_NiveauScolaire';
import { Cfg_TypeCours, initCfgTypeCoursAdapter } from '../Entities/Cfg_TypeCours';
import { Cfg_TypeUser, initCfgTypeUserAdapter } from '../Entities/Cfg_TypeUser';
import { initPostForumAdapter, PostForum } from '../Forum/PostForum';
import { Avis, initAvisAdapter } from '../Users/Avis/Avis';
import { initSessionCoursAdapter, SessionCours } from '../Users/Sessions/SessionCours';
import { initTimeSlotAdapter, TimeSlot } from '../Users/Sessions/TimeSlot';
import { CoursEnseigne, initCoursEnseigneAdapter } from '../Users/User/DetailsProf/CoursEnseigne';
import { initUserModel, User } from '../Users/User/User';


//const { Sequelize } = require('sequelize');

//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') 

const sequelize : Sequelize = new Sequelize({
    dialect: 'postgres',
    host: '192.168.1.208',
    port: 5432,
    username: 'server_api',
    password: 'server_api_pw',
    database: 'coursprives_v1',
    logging: false // pour désactiver les logs
});
  
try {
    sequelize.authenticate().then(() => {
    
        initTimeSlotAdapter() ;
        initSessionCoursAdapter() ;
        initAvisAdapter() ;
        initCoursEnseigneAdapter() ;
        initUserModel() ;
        initCfgTypeCoursAdapter(sequelize)
        initCfgNiveauScolaireAdapter(sequelize)
        initCfgTypeUserAdapter(sequelize)
        initPostForumAdapter(sequelize) 
        
        //initUserProfModel() ;
        //initUserAdminModel() ;

        TimeSlot.hasOne(SessionCours, { foreignKey: 'CreneauID' });
        SessionCours.belongsTo(TimeSlot, { foreignKey: 'CreneauID' });

        
        CoursEnseigne.hasMany(Avis, {
            as: 'ListeAvis_',
            foreignKey: 'CoursEnseigneID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });

        Avis.belongsTo(CoursEnseigne, {
            as: 'CoursEnseigne',
            foreignKey: 'CoursEnseigneID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        /*
        User.hasMany(Avis, {
            as: 'ListeAvis',
            foreignKey: 'UserID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        Avis.belongsTo(User, {
            as: 'User',
            foreignKey: 'UserID',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        */
        /*
        UserModel.belongsToMany(SessionCours, {
            through: "ListeSessionCoursSuivis",
            foreignKey: "ListeSessionCoursSuivisID",
        });
        */
        
        /*
       const queryInterface = sequelize.getQueryInterface();
       queryInterface.addColumn('SessionCours', 'NomSession', {
         type: DataTypes.STRING,
         defaultValue:""
       });
       */

       //PostForum.sync({force: true})

       /*
       Cfg_NiveauScolaire.sync({force: true})
       Cfg_TypeCours.sync({force: true})
       Cfg_TypeUser.sync({force: true})
       */

        // Synchronisation
        /*
        sequelize.sync({force: true}).then(() => {
            console.log("Les tables ont été synchronisées.");
        });
        */
        
    }) ;
    console.log('Connexion avec la database a été établie.');
} catch (error) {
    console.error('Erreur avec la connexion à la database:', error);
}

export default sequelize ;


export interface IDatabaseManager {
}

export class DatabaseManager implements IDatabaseManager {
    
    constructor(){

    }


}