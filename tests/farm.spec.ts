import {expect} from 'chai'
import {Farm, Cow, Person, Trailer,Car, PickupTruck, CattleTrailer} from '../src/classes'

const f = new Farm()
const bob = new Person("Bob", "Robertson")
const cow = new Cow()
const truck = new PickupTruck()
const largeTrailer = new CattleTrailer()

describe("Person", () => {
    expect(bob.fullName).to.be.eq("Bob Robertson")
})

describe("Farm", () => {
    it('should add an owner.', () => {
        f.owner = bob
        expect(f.owner).to.be.eq(bob)
    })

    it('should add the cow to the animals', () => {
        f.addLargeAnimal(cow)
        expect(f.getLargeAnimals()).to.include(cow)
    })
    
    it('should have a name', () => {
        f.name = "Old McDonald's"
        expect(f.name).to.be.eq("Old McDonald's")
    })

    it('should remove an animal from the farm.', () => {
        f.addLargeAnimal(cow)
        f.removeAnimal(cow)
        expect(f.getLargeAnimals).to.not.include(cow)
    })

    it('should add a trailer to the farm.', () => {
        f.trailers.push(largeTrailer)
        expect(f.trailers).to.include(largeTrailer)
    })

    it('should add a vehicle to the farm', () => {
        f.vehicles.push(truck)
        expect(f.vehicles).to.include(truck)
    })

    it('should have some cash on hand', () => {
        f.cashOnHand = 1000
        expect(f.cashOnHand).to.be.eq(1000)
    })
})