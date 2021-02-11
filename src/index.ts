import {Farm, Cow, SmallTrailer, Family, Truck, Person, Cat, Sheep} from './classes'

//Declarations.  Create two farms, a family, a small animal, and a vehicle.
const OldMcDonald = new Farm()
const SecondFarm = new Farm()
const sheepy = new Sheep()
let trailer = new SmallTrailer();
let bessie = new Cow();
let person1 = new Person("a", "b")
let person2 = new Person("c", "d")
let person3 = new Person("e", "f")
let people:Person[]=[] //I have to remember to add at least an empty array.
let kitty = new Cat()
//A family must have at least one person in it.
let family = new Family(people)
let ford = new Truck()
//Name our second farm and cat.
SecondFarm.name = "Second Farm"
kitty.name = "Kitty!"
//Add people and the catto the family.
people.push(person1, person2)
family.addPerson(person3)
family.addPet(kitty)
//Name our first farm and give it an owner and a sheep.
OldMcDonald.name = "EIEIO"
OldMcDonald.owners = family
//Attach the trailer to the truck.
ford.attachTrailer(trailer)
//Name our cow and add it to the farm.
bessie.name = "Bessie"
OldMcDonald.addLargeAnimal(bessie)
//Put our trailer on the farm.
OldMcDonald.trailers.push(trailer)
//Load the cow onto the trailer.
trailer.loadAnimal(bessie, OldMcDonald)
//Add the sheep to the farm.  Attempt to load it into a full trailer.
OldMcDonald.addLargeAnimal(sheepy)
trailer.loadAnimal(sheepy, OldMcDonald)
//Which animals are on our farm?
console.log(OldMcDonald.getLargeAnimals())
//Which animals are on the trailer.
console.log(trailer)
//Farm status.
console.log(OldMcDonald)
//Truck status.
console.log(ford)
ford.removeTrailer(trailer)
console.log(ford)
//Unload the animal at the second farm.
trailer.unloadAnimal(bessie, SecondFarm)
//Status of the second farm.
console.log(SecondFarm.name + ":")
console.log(SecondFarm)
//Log the empty trailer.
console.log(trailer)
//Kitty!
console.log(kitty)