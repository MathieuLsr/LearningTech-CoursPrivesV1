import { User } from "../User/User";

export class UsersManager {
    
    constructor(){}

    async getUserFromEmail(email: string): Promise<User | null> {
        
        const user : User | null = await User.findOne({
            where: {
                Email : email 
            }
        })
        return user ;
    }

    async getUserFromUUID(uuid : string): Promise<User | null> {
        const user : User | null = await User.findByPk(uuid)
        return user ;
    }

    async containsEmail(email: string): Promise<boolean> {
        const user : User | null = await this.getUserFromEmail(email) ;
        return user != null ; 
    }
    
}