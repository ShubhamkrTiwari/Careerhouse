import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

const ICON_KEY = 'app_icon_preference';

export interface AppIcon {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const AVAILABLE_ICONS: AppIcon[] = [
  {
    id: 'default',
    name: 'Default Blue',
    description: 'Original blue app icon',
    color: '#0369a1',
  },
  {
    id: 'purple',
    name: 'Purple',
    description: 'Modern purple variant',
    color: '#7c3aed',
  },
  {
    id: 'green',
    name: 'Green',
    description: 'Fresh green variant',
    color: '#059669',
  },
  {
    id: 'orange',
    name: 'Orange',
    description: 'Vibrant orange variant',
    color: '#ea580c',
  },
];

export const saveIconPreference = async (iconId: string): Promise<boolean> => {
  try {
    await SecureStore.setItemAsync(ICON_KEY, iconId);
    
    // Note: Actual icon switching requires native implementation
    // This is a placeholder for the UI flow
    Alert.alert(
      'Icon Updated',
      `App icon changed to ${AVAILABLE_ICONS.find(i => i.id === iconId)?.name}. Restart the app to see changes.`,
      [{ text: 'OK' }]
    );
    
    return true;
  } catch (error) {
    console.error('Error saving icon preference:', error);
    return false;
  }
};

export const getIconPreference = async (): Promise<string> => {
  try {
    const iconId = await SecureStore.getItemAsync(ICON_KEY);
    return iconId || 'default';
  } catch (error) {
    console.error('Error retrieving icon preference:', error);
    return 'default';
  }
};

export const getIconById = (iconId: string): AppIcon => {
  return AVAILABLE_ICONS.find(icon => icon.id === iconId) || AVAILABLE_ICONS[0];
};
