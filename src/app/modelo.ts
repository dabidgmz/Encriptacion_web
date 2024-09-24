export interface Modelo<SubModelo> {
    message : String,
    data? : SubModelo,
    errors : Object,
    ignore : boolean,
    query : Object,
    originalText: string;
    
}
