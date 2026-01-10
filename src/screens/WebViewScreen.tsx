import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { RootStackParamList } from '../navigation/AppNavigator';
import { requestNotificationPermissions, scheduleLocalNotification } from '../utils/notifications';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'WebView'>;

const WebViewScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const handleTriggerNotification1 = async () => {
    await scheduleLocalNotification(
      'Notification 1',
      'This is the first notification message!',
      3
    );
  };

  const handleTriggerNotification2 = async () => {
    await scheduleLocalNotification(
      'Notification 2',
      'This is the second notification message!',
      5
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webViewContainer}>
        <WebView 
          source={{ uri: 'https://expo.dev' }} 
          style={styles.webView}
        />
      </View>
      
      <Card style={styles.controlsCard}>
        <Card.Content>
          <Title>Notifications</Title>
          <Paragraph>Trigger local notifications with a delay.</Paragraph>
          <View style={styles.buttonRow}>
            <Button 
              mode="contained" 
              onPress={handleTriggerNotification1}
              style={styles.notificationButton}
            >
              Notify (3s)
            </Button>

            <Button 
              mode="contained" 
              onPress={handleTriggerNotification2}
              style={styles.notificationButton}
            >
              Notify (5s)
            </Button>
          </View>

          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('VideoPlayer')}
            style={styles.navigationButton}
            icon="play-circle"
          >
            Go to Video Player
          </Button>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webViewContainer: {
    flex: 0.65,
  },
  webView: {
    flex: 1,
  },
  controlsCard: {
    margin: 16,
    elevation: 4,
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  notificationButton: {
    flex: 0.48,
  },
  navigationButton: {
    marginTop: 8,
  },
});

export default WebViewScreen;
