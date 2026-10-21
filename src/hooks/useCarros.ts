//Importamos los hooks de tanstack query:
//-UseQuery: para constulas get
//useMutation: para operaciones POST/PUT/DELETE
//useQueryClient: para interactuar con la cache(invalidar,refrescar)
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import { carrosService } from '@/api/carros.service'

//Definir una constante key que servira como indetificador unico
//para las queries relacionadas con carros
const KEY = ['carros']

export function useCarros(){
    return useQuery({
        queryKey:['carros'],
        queryFn: ()=>{
            console.log("Get ejecutaod con TanStack")
            return carrosService.getAll()
        },
        //StaleTime no significa cuanto tiempo se guardan los datos en cache
        //si no cuanto tiempo los datos se consideran frescos
        staleTime: 1000*60*5//cache valido 5min

    })
}
//Hook personaliza useAgregar carro que encapsula la logica de agregar un carro nuevo 
//Usa useMutation con mutationFN que llama a carrosService.add()
//onSucces: invalida la query 'carros' para refrescar la lista automaticamente
export function useAgregarCarro(){
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (marcar:string) => carrosService.add(marcar),
        onSuccess :() => qc.invalidateQueries({queryKey: KEY}),
    })
}