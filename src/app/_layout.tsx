//Tab desde expo-router, define la navegacion de tipo stack
//importamos QueryClient y QueryClientProvider desde tanstack
//Estos se usan para configuarar y proveeder el cliente de queries en toda la app
import {Tabs} from 'expo-router'
import {SymbolView} from 'expo-symbols'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {StyleSheet} from 'react-native'


//Creamos una instancia de QueryClient
//Este objeto administra la cache y el ciclo de vida de las querys/mutations
const qc = new QueryClient()

//Componete layour, para envolver la navegacion dentro del QueryClientProvider
//Con esto , todos los componentes hijos pueden usar useQuery y useMutation
//Este es el punto de integracion entra Tanstack Query y la navegacion de Expo

export default function Layout(){
  
  return(
    <QueryClientProvider client = {qc}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ED3024',
          tabBarInactiveTintColor: '#7A858F',
          tabBarActiveBackgroundColor: '#FCEBE9',
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <SymbolView
                name={{ ios: 'house.fill', android: 'home', web: 'home' }}
                tintColor={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <SymbolView
                name={{ ios: 'car.side.fill', android: 'directions_car', web: 'directions_car' }}
                tintColor={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    height: 66,
    paddingTop: 6,
    paddingBottom: 5,
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E9EDEF',
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#243447',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tabBarItem: {
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 14,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
})