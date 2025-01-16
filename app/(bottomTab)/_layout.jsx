 
import React from 'react'
import {Tabs} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
const _layout = () => {
  return (
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#121212',
      
      },
      tabBarShowLabel: false,
    }}
  >
    <Tabs.Screen
      name="search"
      options={{
        tabBarIcon: ({ focused }) => (
          <Feather
            name="search"
            size={28}
            color={focused ? '#1164f2' : '#ffffff'}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="home"
      options={{
        tabBarIcon: ({ focused }) => (
          <Entypo
            name="home"
            size={28}
            color={focused ? '#1164f2' : '#ffffff'}
          />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name="people-circle-outline"
            size={28}
            color={focused ? '#1164f2' : '#ffffff'}
          />
        ),
      }}
    />
  </Tabs>
  
  
  )
}

export default _layout