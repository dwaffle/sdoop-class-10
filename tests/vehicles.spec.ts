import {expect} from 'chai'
import {Car, PickupTruck, CattleTrailer} from '../src/classes'

//Trunk capacity is in cubic meters

const truck = new PickupTruck()
const trailer = new CattleTrailer()

describe('Cars', () => {
    const car = new Car(20, 4, "V-8")
    it('should have four doors', ()=> {
        expect(car.noOfDoors).to.be.eq(4)
    })

    it('should have a capacity of 20 cubic meters', () => {
        expect(car.trunkCapacity).to.be.eq(20)
    })

    it('should have four wheels', ()=> {
        expect(car.wheels).to.be.eq(4)
    })

    it('should have a V-8 engine', ()=>{
        expect(car.engine).to.be.eq("V-8")
    })
})

describe("Trucks", () => {
    it('should be able to tow', () => {
        expect(truck.canTow).to.be.true
    })

    it('should have four wheels', () => {
        expect(truck.wheels).to.be.eq(4)
    })

    it('should be able to attach a trailer', () => {
        truck.attachTrailer(trailer)
        expect(truck.hasTrailerAttached).to.be.true
    })

    it('should already have a trailer attached', () => {
        expect(truck.attachTrailer(trailer)).to.be.eq("You must remove the attached trailer first.")
    })

    it('should remove the attached trailer', () => {
        truck.removeTrailer(trailer)
        expect(truck.hasTrailerAttached).to.be.false
    })

    it("shouldn't remove a non-existent trailer.", () => {
        expect(truck.removeTrailer(trailer)).to.be.eq("There is no attached trailer")
    })
})