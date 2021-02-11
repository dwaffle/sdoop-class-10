type Constructor = new (...args: any[]) => {};
export function withLocation<Parent extends Constructor>( MixOn:Parent ){
    return class /* anon class "input class" */ extends MixOn {
        location:string
    }
}