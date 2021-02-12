import {expect} from 'chai'
import {SmallTrailer, Cow, Farm, Horse, PickupTruck, HorseTrailer} from '../src/classes'

const farm = new Farm()
const trailer = new SmallTrailer()
const horseTrailer = new HorseTrailer()
const truck = new PickupTruck()
const cow = new Cow()
const horse = new Horse()

describe("Trailer tests", () => {
    it('should be empty', () => {
        expect(trailer.count()).to.be.eq(0)
    })

    it('should contain the cow.', () => {
        farm.addLargeAnimal(cow)
        trailer.loadAnimal(cow, farm)
        expect(trailer.animals).to.include(cow)
        trailer.unloadAnimal(cow, farm)
    })

    it('should take the animal off the farm.', () => {
        farm.addLargeAnimal(cow)
        trailer.loadAnimal(cow, farm)
        expect(farm.getLargeAnimals).to.not.include(cow)
        trailer.unloadAnimal(cow,farm) 
    })

    it("Shouldn't allow removal of an animal that isn't on the trailer.", () => {
        expect(trailer.unloadAnimal(cow, farm)).to.be.eq("That animal isn't on this trailer")
    })

    it('should return the animal to the farm', ()=> {
        trailer.loadAnimal(cow, farm)
        trailer.unloadAnimal(cow,farm)
        expect(farm.getLargeAnimals()).to.include(cow)
    })

    it("should say it's full", () => {
        farm.addLargeAnimal(cow)
        farm.addLargeAnimal(horse)
        trailer.loadAnimal(cow, farm)
        expect(trailer.loadAnimal(horse, farm)).to.be.eq("This trailer is full, or that animal does not exist on that farm.")
        trailer.unloadAnimal(cow, farm)
    })

    it("should say it's capacity", () => {
        expect(trailer.capacity).to.be.eq(1)
    })

    it('should be towed', () => {
        truck.attachTrailer(trailer)
        expect(trailer.isTowed).to.be.true;
    })

    it('should have a capacity of 2', () => {
        expect(horseTrailer.capacity).to.be.eq(2)
    })
})