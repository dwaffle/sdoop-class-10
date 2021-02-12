import {expect} from 'chai'
import {Person} from '../src/classes'
import {Cow, Horse, Cat, Dog, Sheep} from '../src/classes'

const petOwner = new Person("Alan", "Smithee")
const cow = new Cow()
const horse = new Horse()
const cat = new Cat("Shadow", petOwner)
const dog = new Dog("Rover", petOwner)
const sheep = new Sheep()

describe("Sheep", () => {
    it('should say Baa', () => {
        expect(sheep.baa()).to.be.eq("Baaaaaaa!")
    })
})

describe("Cows", () => {
    it('should say moo', ()=> {
        expect(cow.moo()).to.be.eq("Moo")
    })

    it("should milk the cow.", ()=> {
    cow.milk()
    expect(cow.isMilked).to.be.true
    })

    it('should be a large animal', () => {
        expect(cow.isLargeAnimal).to.be.true
    })
})

describe("Horses", () => {
    it('should whinny', ()=>{
        expect(horse.whinny()).to.be.eq("Neigh!")
    })

    it("should be a large animal", () => {
        expect(horse.isLargeAnimal).to.be.true
    })
})

describe('Cats', () => {
    it("should not be a large animal", () => {
        expect(cat.isLargeAnimal).to.be.false
    })

    it('should have a name', ()=> {
        expect(cat.name).to.be.eq("Shadow")
    })

    it('should have an owner', () => {
        expect(cat.owner).to.be.eq(petOwner)
    })

    it('should meow', () => {
        expect(cat.meow()).to.be.eq("mew?")
    })
})

describe("Dogs", () => {
    it('should have a name', () => {
        expect(dog.name).to.be.eq("Rover")
    })

    it('should have an owner', () => {
        expect(dog.owner).to.be.eq(petOwner)
    })

    it('should not be a large animal', () => {
        expect(dog.isLargeAnimal).to.be.false
    })

    it('should bark', () => {
        expect(dog.bark()).to.be.eq("Woof!")
    })
})
