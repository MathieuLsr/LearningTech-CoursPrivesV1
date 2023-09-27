import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export type ID = UUID ;

export interface IUniqueIdentifier {

    ID : ID

}
