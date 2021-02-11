import {IAnimal, IVehicle, ITrailer, ILocation, ITowingVehicle} from './interfaces'

class Entity{
    name:string
}

class Business extends Entity{
    cashOnHand:number
    owner:Person
}

class Person extends Entity{
    firstName:string
    lastName:string

    get fullName(){
        return this.firstName + " " + this.lastName
    }
}

class Family{
    private family:Person[]
    private pets:SmallAnimal[]
    constructor(people:Person[]){
        this.family = people
    }

    addPerson(person:Person){
        this.family.push(person)
    }

    removePerson(person:Person){
        this.family.filter(p => p.fullName != person.fullName)
    }

  
   addPet(pet:SmallAnimal){
       this.pets.push(pet)
   }

   findPet(pet:SmallAnimal){
       return this.pets.filter(p => p.name === pet.name)
   }

   removePet(pet:SmallAnimal){
       this.pets.filter(p => p.name !== pet.name)
   }
}

//These farms are family owned businesses.
//Animals are large animals.  Pets are small animals.
export class Farm extends Business implements ILocation{
    readonly location = "Farm"
    private animals:LargeAnimal[]=[]
    owners:Family
    vehicles:IVehicle[]=[]
    trailers:ITrailer[]=[]
    name:string

    addLargeAnimal(animal:LargeAnimal){
        
        this.animals.push(animal)
    }

    getLargeAnimals(){
        return this.animals
    }

    removeAnimal(animal:IAnimal){
        this.animals.filter(a => a.name !== animal.name)
    }
    
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

export class SmallAnimal extends Animal implements IAnimal{
    readonly isLargeAnimal = false
    owner:Person
}

export class Horse extends LargeAnimal{
    whinny(){
        return "Neigh!"
    }
}

export class Cow extends LargeAnimal{
    moo(){
        return "Moooooooooo"
    }
    milk(){
        this.isMilked=true;
    }
    isMilked:boolean
}

export class Cat extends SmallAnimal{
    meow(){
        return "mew?"
    }
}

export class Dog extends SmallAnimal{
    bark(){
        return "Woof!"
    }
}

class Vehicle{
    engine:string
    wheels:number
}

export class Car extends Vehicle{
    trunkCapacity:number
    noOfDoors:number = 4
}

export class Truck extends Vehicle implements ITowingVehicle{
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
    protected capacity:number
    animals:LargeAnimal[]=[]
    isTowed:boolean
    isFull(){
        return this.capacity < this.animals.length
    }

    loadAnimal(animal:LargeAnimal, farm:Farm){
        const animalsOnFarm = farm.getLargeAnimals()
        const animalToLoad = animalsOnFarm.filter(a => a.name === animal.name)
        console.log(animalToLoad)
        if(!(this.isFull()) && animalToLoad){
            this.animals.push(animal)
        } else {
            return "This trailer is full, or that animal does not exist on that farm."
        }
    }

    unloadAnimal(animal:LargeAnimal, farm:Farm){
        const animalOnTrailer = this.animals.find(a => a.name === animal.name)
        if(animalOnTrailer){
            this.animals.filter(a => a.name !== animal.name)
            farm.addLargeAnimal(animalOnTrailer)
        } else {
            return "That animal isn't on this trailer."
        }
    }
}

export class SmallTrailer extends Trailer{
   readonly capacity = 1
}

export class HorseTrailer extends Trailer{
    readonly capacity = 2
}

export class CattleTrailer extends Trailer{
    readonly capacity = 20
}