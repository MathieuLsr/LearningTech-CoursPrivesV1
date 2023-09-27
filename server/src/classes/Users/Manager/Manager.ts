import { ID, IUniqueIdentifier } from "../Identifier/ID";

export interface IManager<Value extends IUniqueIdentifier> extends Array<Value> {

  add(value : Value) : this ;
  get(id : ID) : Value | undefined ;
  contains(id : ID) : boolean ;
  remove(id : ID) : boolean ;

}

export class Manager<Value extends IUniqueIdentifier> extends Array<Value> implements IManager<Value> {
 
  get(id: ID): Value | undefined {
    return this.find(ele => ele.ID === id );
  }

  remove(id: ID): boolean {
    const obj : Value | undefined = this.get(id)
    if(obj === undefined) return false 
    const indice: number = this.indexOf(obj) ;
    this.splice(indice, 1)
    return true 
  }

  add(value : Value): this {
    this.push(value) 
    return this 
  }

  contains(id: ID): boolean {
    return this.filter(ele => ele.ID === id).length !== 0
  }


}

/************* PROBLEME AVEC LES MAP LORS DE LA DE/SERIALIZATION DONC PASSAGE EN LISTE  *************/
// A CHANGER PLUS TARD => COMPARER LES O(n) pour la complxité algorithmique même 
// si la plupart auront pas plus de 10 objets

/*
export interface IManager<Key, Value> extends Map<Key, Value> {

    MapKeyToValue : Map<Key, Value>
}

export class Manager<Key, Value> extends Map<Key, Value> implements IManager<Key, Value> {
    
  
    MapKeyToValue: Map<Key, Value> = new Map<Key, Value>();
    

    // Implementation de [Symbol.iterator] pour permettre la boucle for..of
    * [Symbol.iterator](): IterableIterator<[Key, Value]> {
        yield* this.entries();
    }

    get size(): number {
      return this.MapKeyToValue.size;
    }
  
    clear(): void {
      return this.MapKeyToValue.clear();
    }
  
    delete(key: Key): boolean {
      return this.MapKeyToValue.delete(key);
    }
  
    entries(): IterableIterator<[Key, Value]> {
      return this.MapKeyToValue.entries();
    }
  
    forEach(callbackfn: (value: Value, key: Key, map: Map<Key, Value>) => void, thisArg?: any): void {
      return this.MapKeyToValue.forEach(callbackfn, thisArg);
    }
  
    get(key: Key): Value | undefined {
      return this.MapKeyToValue.get(key);
    }
  
    has(key: Key): boolean {
      return this.MapKeyToValue.has(key);
    }
  
    keys(): IterableIterator<Key> {
      return this.MapKeyToValue.keys();
    }
  
    set(key: Key, value: Value): this {
      this.MapKeyToValue.set(key, value);
      return this ;
    }
  
    values(): IterableIterator<Value> {
      return this.MapKeyToValue.values();
    }

  
}
*/