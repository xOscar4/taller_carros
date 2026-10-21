import {useState} from 'react'
import {View,Text,TextInput,Button,FlatList} from 'react-native'
import { Carro } from '../types/carro'
import { carrosService } from '../api/carros.service'
import { useCarros, useAgregarCarro } from '@/hooks/useCarros'



//URL base de la API, tomada de variables de entorno de EXPO
//const URL = `${process.env.EXPO_PUBLIC_API_URL}patio`

export default function App() {
  //Estado para manejar el texto ingresado en el input(marca del carro)
  const[marca,setMarca]= useState('')

  //Get de tanstack query para manejar la carga, el cache y los estados
  const {data:carros= [], isLoading, error} = useCarros()

  //Post: la mutacion invalida la query 'carros' y lista se refresca
  const {mutate: agregarCarro} = useAgregarCarro()


  const agregar = async () => {
    agregarCarro(marca, {onSuccess: () => setMarca('')})
  }

  //isLoading es true solo durante la primera carga, cuando aun no hay datos 
  //Mientras tanto mostramos un texto en lugar de la pantalla con la lista vacia
  if(isLoading) return <Text> Cargando... </Text>


  //Si el get fallo(sin red,servidor caido, etc) 'el metodo traer' trae la excepcion
  //Mostramos un mensaje y no seguimos al return principal
  if(error) return <Text>Error: {error.message}</Text>


  return(
    <View style = {{flex: 1, paddingTop: 60, backgroundColor: '#fff'}}>
      <TextInput
        value={marca}
        onChangeText = {setMarca}
        style = {{borderWidth:3}}      
      />
      <Button title= "Aregar" onPress={agregar}/>
      <FlatList
        data={carros}
        keyExtractor={item => item.id}
        renderItem = {({item}) => 
          <Text>{item.id}- {item.marca}</Text>
        }
      />
    </View>
  )
  
}