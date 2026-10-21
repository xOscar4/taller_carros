//Tab desde expo-router, define la navegacion de tipo stack
//importamos QueryClient y QueryClientProvider desde tanstack
//Estos se usan para configuarar y proveeder el cliente de queries en toda la app
import {Tabs} from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


//Creamos una instancia de QueryClient
//Este objeto administra la cache y el ciclo de vida de las querys/mutations
const qc = new QueryClient()

//Componete layour, para envolver la navegacion dentro del QueryClientProvider
//Con esto , todos los componentes hijos pueden usar useQuery y useMutation
//Este es el punto de integracion entra Tanstack Query y la navegacion de Expo

export default function Layout(){
  
  return(
    <QueryClientProvider client = {qc}>
      <Tabs>
        <Tabs.Screen name= "index" options={{title: 'Home'}}/>
         <Tabs.Screen name= "explore" options={{title: 'Explore'}}/>
      </Tabs>
    </QueryClientProvider>
  )
}