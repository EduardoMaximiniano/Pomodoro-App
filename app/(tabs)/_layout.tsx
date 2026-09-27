import { Tabs } from 'expo-router';
import React from 'react';

import { useFonts } from 'expo-font'; // importa de 'expo-font' diretamente, não de um pacote específico
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
  
export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  const [fonstLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  if (!fonstLoaded) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
