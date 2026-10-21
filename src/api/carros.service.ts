//importar el cliente de axios y el tipo carro
import { Carro } from '../types/carro'
import { client } from './client'

//Definir un servicio llamado carrosService
//El servicio centraliza las operaciones de la entidad carro
//Retorna una promesa con un arreglo de objeto
//poner metodos asincronicos para interactuar con la API

export const carrosService = {
    //Metodo GET
    getAll: async (): Promise<Carro[]> =>{
        const {data} = await client.get<Carro[]>('patio')
        return data
    },

    //Metodo POST: agregar un nuevo carro, retornar la promesa con el objeto creado
    add: async (marca:string): Promise<Carro> =>{
        const {data} = await client.post<Carro>('patio', {marca})
        return data
    }
}
