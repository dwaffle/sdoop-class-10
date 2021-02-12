import {IAnimal, IVehicle, ITrailer, ILocation, ITowingVehicle} from './interfaces'
import {withLocation} from './mixins'

class Entity{
    name:string
}

class Business extends Entity{
    cashOnHand:number
    owner:Person
}

export class Person extends Entity{
    private firstName:string
    private lastName:string
    
    get fullName(){
        return this.firstName + " " + this.lastName
    }

    constructor(firstName:string, lastName:string){
        super()
        this.firstName = firstName
        this.lastName = lastName
    }
}

//Family is defined as at least one person.
export class Family{
    private family:Person[]=[]
    private pets:SmallAnimal[]=[]
    constructor(people:Person[]){
        this.family = people
    }

    addPerson(person:Person){
        this.family.push(person)
    }

    getPeople(){
        return this.family
    }

    removePerson(person:Person){
        this.family = this.family.filter(p => p.fullName != person.fullName)
    }

  
   addPet(pet:SmallAnimal){
       this.pets.push(pet)
   }

   findPet(pet:SmallAnimal){
       const animal = this.pets.find(p => p.name === pet.name)
       return animal
   }

   removePet(pet:SmallAnimal){
       this.pets = this.pets.filter(p => p.name !== pet.name)
   }
}

//These farms are family owned businesses.
//Animals are large animals.  Pets are small animals.
export class Farm extends Business{
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
        this.animals = this.animals.filter(a => a.name !== animal.name)
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
    name:string
    constructor(name:string, owner:Person){
        super()
        this.name = name
        this.owner = owner
    }
}

export class Horse extends LargeAnimal{
    whinny(){
        return "Neigh!"
    }
}

export class Cow extends LargeAnimal{
    moo(){
        return "Moo"
    }
    milk(){
        this.isMilked=true;
    }
    isMilked:boolean
}

export class Sheep extends LargeAnimal{
    baa(){
        return "Baaaaaaa!"
    }
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
    readonly wheels = 4
    constructor(public trunkCapacity:number, public noOfDoors:number, public engine:string){
        super()
    }

}

export class PickupTruck extends Vehicle implements ITowingVehicle{
    readonly canTow = true;
    readonly wheels = 4
    hasTrailerAttached = false
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
        return this.capacity <= this.animals.length
    }

    count(){
        return this.animals.length
    }

    loadAnimal(animal:LargeAnimal, farm:Farm){
        const animalsOnFarm = farm.getLargeAnimals()
        const animalToLoad = animalsOnFarm.filter(a => a.name === animal.name)
        if(!this.isFull() && animalToLoad){
            this.animals.push(animal)
            farm.removeAnimal(animal)
        } else {
            console.log("This trailer is full, or that animal does not exist on that farm.")
            return "This trailer is full, or that animal does not exist on that farm."
        }
    }

    unloadAnimal(animal:LargeAnimal, farm:Farm){
        const animalOnTrailer = this.animals.find(a => a.name === animal.name)
        if(animalOnTrailer){
            farm.addLargeAnimal(animalOnTrailer)
            this.animals = this.animals.filter(a => a.name !== animalOnTrailer.name)
        } else {
            console.log("That animal isn't on this trailer.")
            return "That animal isn't on this trailer"
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

export const FarmWithLocation = withLocation(Farm)