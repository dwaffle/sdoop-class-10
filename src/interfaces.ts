import {LargeAnimal, Trailer} from './classes'

export interface IAnimal{
    name:string
    isLargeAnimal:boolean
    walk():any
}

export interface IVehicle{
    wheels:number
}

export interface ITowingVehicle extends IVehicle{
    hasTrailerAttached:boolean
    attachTrailer(trailer:Trailer):void
    removeTrailer(trailer:Trailer):void
}

export interface ITrailer{
    animals:LargeAnimal[]
    isTowed:boolean
}

export interface ILocation {
    location:string
}