import { IOrganization, IPerson } from "./interfaces";

class Entity {

    name:string;

}

class Organization extends Entity implements IOrganization {

    owners:Entity[]=[];

    get ownerNames(){
        return this.owners.map(owner => owner.name).join(",");
    }
    
    addOwner( owner:Entity ){
        this.owners.push( owner );
    }

}

class Person extends Entity implements IPerson {

    age:number;

    constructor( public fname:string, public lname:string ){
        super();
        this.name = `${fname} ${lname}`;
    }

}

const acmeInc = new Organization();
acmeInc.name = "ACME Inc.";

const john = new Person("John","Doe");
acmeInc.addOwner(john);

console.log( acmeInc.ownerNames );