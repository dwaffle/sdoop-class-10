import {Farm, Cow, SmallTrailer} from './classes'

const OldMcDonald = new Farm();

OldMcDonald.name = "EIEIO"
let trailer = new SmallTrailer();
let bessie = new Cow();
bessie.name = "Bessie"
OldMcDonald.addLargeAnimal(bessie)
trailer.loadAnimal(bessie, OldMcDonald)
console.log(trailer)
console.log(OldMcDonald)