 
import React from 'react'
import {Tabs} from 'expo-router'
import IconSVG from '../../assets/svg'

const _layout = () => {
  return (
   <Tabs screenOptions={{headerShown:false}}>
     <Tabs.Screen name="home" options={{ tabBarLabel:"Home" ,tabBarIcon:()=><IconSVG name='homeBottom'/>}}/>
     <Tabs.Screen name="search" options={{ tabBarLabel:'Search',tabBarIcon:()=><IconSVG name='search'/>}} />
     <Tabs.Screen name="profile" options={{ tabBarLabel:'Profile',tabBarIcon:()=><IconSVG name='profileBottom'/>}} />
   </Tabs>
  )
}

export default _layout