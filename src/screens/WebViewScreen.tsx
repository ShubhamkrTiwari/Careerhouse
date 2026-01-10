import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, Title, Paragraph, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Bell, Play, Globe, ChevronRight } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { requestNotificationPermissions, scheduleLocalNotification } from '../utils/notifications';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'WebView'>;
const { width } = Dimensions.get('window');

const WebViewScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    requestNotificationPermissions();
  }, []);

  const handleTriggerNotification1 = async () => {
    await scheduleLocalNotification(
      'Assignment Update',
      'The first notification triggered successfully (3s)!',
      3
    );
  };

  const handleTriggerNotification2 = async () => {
    await scheduleLocalNotification(
      'Alert: New Stream',
      'Check out the new HLS stream available now (5s)!',
      5
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <MotiView 
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 1000 }}
            style={styles.headerContent}
          >
            <Title style={styles.headerTitle}>Careerhouse App</Title>
            <Paragraph style={styles.headerSubtitle}>Exploring WebView & Notifications</Paragraph>
          </MotiView>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.contentContainer}>
        <Surface style={styles.webViewSurface} elevation={4}>
          <WebView 
            source={{ uri: 'https://expo.dev' }} 
            style={styles.webView}
            startInLoadingState={true}
          />
        </Surface>
        
        <MotiView 
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 500 }}
          style={styles.controlsContainer}
        >
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Bell size={20} color="#3b5998" />
                <Title style={styles.sectionTitle}>Interactive Notifications</Title>
              </View>
              <View style={styles.buttonRow}>
                <Button 
                  mode="contained" 
                  onPress={handleTriggerNotification1}
                  style={styles.notifyButton}
                  buttonColor="#3b5998"
                  icon={({ size, color }) => <Bell size={size} color={color} />}
                >
                  3s Delay
                </Button>

                <Button 
                  mode="contained" 
                  onPress={handleTriggerNotification2}
                  style={styles.notifyButton}
                  buttonColor="#4c669f"
                  icon={({ size, color }) => <Bell size={size} color={color} />}
                >
                  5s Delay
                </Button>
              </View>

              <Button 
                mode="elevated" 
                onPress={() => navigation.navigate('VideoPlayer')}
                style={styles.videoButton}
                textColor="#fff"
                buttonColor="#34C759"
                contentStyle={styles.videoButtonContent}
                icon={({ size, color }) => <Play size={size} color={color} fill={color} />}
              >
                Launch Video Player
              </Button>
            </Card.Content>
          </Card>
        </MotiView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerGradient: {
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
    paddingHorizontal: 16,
  },
  webViewSurface: {
    height: 350,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  webView: {
    flex: 1,
  },
  controlsContainer: {
    marginTop: 20,
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  notifyButton: {
    flex: 0.48,
    borderRadius: 12,
  },
  videoButton: {
    borderRadius: 12,
    marginTop: 5,
  },
  videoButtonContent: {
    height: 48,
    flexDirection: 'row-reverse',
  },
});

export default WebViewScreen;
