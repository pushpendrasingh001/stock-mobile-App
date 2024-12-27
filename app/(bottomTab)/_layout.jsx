 
import React from 'react'
import {Tabs} from 'expo-router'
import IconSVG from '../../assets/svg'

const _layout = () => {
  return (
   <Tabs screenOptions={{headerShown:false,tabBarStyle: {
    backgroundColor: '#121212',
    height: 55,
  }}}>
    <Tabs.Screen name="search" options={{ tabBarLabel:'Search',tabBarIcon:()=><IconSVG name='search'/>}} />
     <Tabs.Screen name="home" options={{ tabBarLabel:"Home" ,tabBarIcon:()=><IconSVG name='homeBottom'/>}}/>
     <Tabs.Screen name="profile" options={{ tabBarLabel:'Profile',tabBarIcon:()=><IconSVG name='profileBottom'/>}} />
   </Tabs>
  )
}

export default _layout