import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" options={{ title: "SplashScreen" }} />
      <Stack.Screen name="HomePage" options={{ title: "HomePage" }} />
      <Stack.Screen name="Signup_1" options={{ title: "Signup_1" }} />
      <Stack.Screen name="Signup_2" options={{ title: "Signup_2" }} />
      <Stack.Screen name="Signup_3" options={{ title: "Signup_3" }} />
      <Stack.Screen name="Signup_4" options={{ title: "Signup_4" }} />
      <Stack.Screen name="Signup_5" options={{ title: "Signup_5" }} />
      <Stack.Screen name="Login" options={{ title: "Login" }} />
      <Stack.Screen name="ChooseArtist" options={{ title: "ChooseArtist" }} />

      <Stack.Screen name="/app/(bottomTab)" />
    </Stack>
  )
}

export default _layout
