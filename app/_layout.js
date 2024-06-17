import { Slot, Stack } from 'expo-router';

export default function HomeLayout() {
  return <Stack>
            <Stack.Screen name='index' options={ {headerTitle:"Start Page"}}/>
            <Stack.Screen name='home' options={ {headerTitle:"Home Page 2"}}/>
            <Stack.Screen name='about' options={ {headerTitle:"About Page "}}/>
        </Stack>
}