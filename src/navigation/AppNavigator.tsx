import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebViewScreen from '../screens/WebViewScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';

export type RootStackParamList = {
  WebView: undefined;
  VideoPlayer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="WebView">
      <Stack.Screen 
        name="WebView" 
        component={WebViewScreen} 
        options={{ title: 'WebView & Notifications' }}
      />
      <Stack.Screen 
        name="VideoPlayer" 
        component={VideoPlayerScreen} 
        options={{ title: 'HLS Video Player' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
