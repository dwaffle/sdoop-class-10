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
    capacity:number
    animals:LargeAnimal[]
    isTowed:boolean
    isFull():boolean
}

export interface ILocation {
    location:string
}