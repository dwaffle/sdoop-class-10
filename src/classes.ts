import {IAnimal, IVehicle, ITrailer, ILocation, ITowingVehicle} from './interfaces'

class Entity{

}

class Business extends Entity{
    cashOnHand:number
    owner:Person
}

class Person{
    firstName:string
    lastName:string

    get fullName(){
        return this.firstName + " " + this.lastName
    }
}

class Family{
    family:Person[]
    constructor(people:Person[]){
        this.family = people
    }

    addPerson(person:Person){
        this.family.push(person)
    }
}

//These farms are family owned businesses.
class Farm extends Business implements ILocation{
    readonly location = "Farm"
    private animals:IAnimal[]=[]

    addAnimal(animal:IAnimal){
        this.animals.push(animal)
    }

    getAnimals(){
        return this.animals
    }

    owners:Family
    vehicles:IVehicle[]=[]
    trailers:ITrailer[]=[]
}

//Business decision: all animals have a name to be identified by.  For cows and horses, this may be a brand.
class Animal{
    name:string
    
    walk(){

    }
}

class FarmAnimal extends Animal{
    farm:Farm
}

export class LargeAnimal extends FarmAnimal implements IAnimal{
    readonly isLargeAnimal = true
}

class SmallAnimal extends FarmAnimal implements IAnimal{
    readonly isLargeAnimal = false
    owner:Person
}

class Horse extends LargeAnimal{
    whinny(){
        return "Neigh!"
    }
}

class Cow extends LargeAnimal{
    moo(){
        return "Moooooooooo"
    }
    milk(){
        this.isMilked=true;
    }
    isMilked:boolean
}

class Cat extends SmallAnimal{
    meow(){
        return "mew?"
    }
}

class Dog extends SmallAnimal{
    bark(){
        return "Woof!"
    }
}

class Vehicle{
    engine:string
    wheels:number
}

class Car extends Vehicle{
    trunkCapacity:number
    noOfDoors:number = 4
}

class Truck extends Vehicle implements ITowingVehicle{
    readonly canTow = true;
    hasTrailerAttached:boolean = false
    attachedTrailer:Trailer
    attachTrailer(trailer:Trailer){
        if(this.hasTrailerAttached){
            return "You must remove the attached trailer first."
        }
        this.attachedTrailer = trailer;
        this.hasTrailerAttached = true
        trailer.isTowed = true
    }
    removeTrailer(trailer:Trailer){
        if(!this.hasTrailerAttached){
            return "There is no attached trailer"
        }
        this.attachedTrailer = null
        this.hasTrailerAttached = false
        trailer.isTowed = false
    }
}

export class Trailer implements ITrailer{
    capacity:number
    animals:LargeAnimal[]
    isTowed:boolean
    isFull(){
        return this.capacity >= this.animals.length
    }

    loadAnimal(animal:LargeAnimal){

        if(!this.isFull()){
            this.animals.push(animal)
        } else {
            return "This trailer is full."
        }
    }

    unloadAnimal(animal:LargeAnimal){
        if(this.animals.find(a => a.name === animal.name)){
            this.animals.filter(a => a.name !== animal.name)
        } else {
            return "That animal isn't on this trailer."
        }
    }
}

class SmallTrailer extends Trailer{
   readonly capacity = 1
}

class HorseTrailer extends Trailer{
    readonly capacity = 2
}

class CattleTrailer extends Trailer{
    readonly capacity = 20
}