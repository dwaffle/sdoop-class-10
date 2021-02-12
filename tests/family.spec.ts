import {expect} from 'chai'
import {Family, Person, Cat} from '../src/classes'

const bob = new Person("Bob", "Robertson")
const family = new Family([bob])
const cat = new Cat("Fluffy", bob);

describe("Families", () => {

    it('should get the family members', () => {
        expect(family.getPeople()).to.contain(bob)
    })

    it('should add a new person to the family', () => {
        const alan = new Person("Alan", "Smithee")
        family.addPerson(alan)
        expect(family.getPeople()).to.contain(alan)
    } )

    it('should add a pet to the family', () => {
        family.addPet(cat)
        expect(family.findPet(cat)).to.be.eq(cat)
    })

    it('should remove a person from the family', () => {
        family.removePerson(bob)
        expect(family.getPeople()).to.not.include(bob)
    })
    
    it('should remove a pet from the family', () => {
        family.removePet(cat)
        expect(family.findPet(cat)).to.not.exist
    })
})