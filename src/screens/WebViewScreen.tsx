import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Sentry from '@sentry/react-native';
import { Bell, Zap, Settings as SettingsIcon, Globe } from 'lucide-react-native';

import { RootStackParamList } from '../navigation/AppNavigator';
import { requestNotificationPermissions, scheduleLocalNotification } from '../utils/notifications';
import ScreenHeader from '../components/ScreenHeader';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'WebView'>;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  scrollContent: { paddingBottom: 20 },
  label: { color: '#94a3b8', fontSize: 10, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  sectionPadding: { paddingHorizontal: 16 },
});

const WebViewScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestNotificationPermissions();
    Sentry.captureMessage('WebView Screen Opened', 'info');
  }, []);

  const handleTriggerNotification = async (title: string, body: string, delay: number) => {
    try {
      await scheduleLocalNotification(title, body, delay);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScreenHeader 
        title="Careerhouse" 
        subtitle="Digital Experience Platform" 
        rightIcon={SettingsIcon}
        onRightPress={() => navigation.navigate('Settings')}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Full Width WebView Section */}
        <Animated.View style={{ marginBottom: 12 }}>
          <View style={{ paddingHorizontal: 16, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Globe size={14} color="#64748b" />
            <Text style={styles.label}>Live Preview</Text>
          </View>
          
          <GlassCard style={{ height: 340 }}>
            {isLoading && (
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
                <View 
                  style={{ height: 6, backgroundColor: '#3b82f6', shadowColor: '#3b82f6', shadowOpacity: 0.5, shadowRadius: 8, width: `${progress * 100}%` }} 
                />
              </View>
            )}
            <WebView 
              source={{ uri: 'https://expo.dev' }} 
              style={{ flex: 1, opacity: 0.95 }}
              onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
            />
          </GlassCard>
        </Animated.View>

        {/* Action Controls Section */}
        <View style={styles.sectionPadding}>
          <Text style={[styles.label, { paddingHorizontal: 8, marginBottom: 10 }]}>
            Interaction Center
          </Text>
          
          <GlassCard style={{ paddingVertical: 16, paddingHorizontal: 16, marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <View style={{ padding: 12, borderRadius: 16, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderWidth: 1, borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                <Bell size={18} color="#3b82f6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Push Console</Text>
                <Text style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>Instant notification testing</Text>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <GradientButton
                title="Quick Alert (3s)"
                icon={Zap}
                onPress={() => handleTriggerNotification('🎯 Assignment Update', 'First notification (3s)!', 3)}
              />
              
              <GradientButton
                title="Stream Update (5s)"
                icon={Bell}
                colors={['#06b6d4', '#0891b2']}
                onPress={() => handleTriggerNotification('🎬 Stream Update', 'New HLS stream (5s)!', 5)}
              />
            </View>
          </GlassCard>

          <Animated.View>
            <GlassCard style={{ paddingVertical: 16, paddingHorizontal: 16, backgroundColor: 'rgba(96, 165, 250, 0.05)', borderColor: 'rgba(59, 130, 246, 0.1)' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1, paddingRight: 16 }}>
                  <Text style={{ color: '#60a5fa', fontWeight: '700', fontSize: 10, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>Status</Text>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>System Online</Text>
                </View>
                <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#10b981', shadowColor: '#10b981', shadowOpacity: 0.5, shadowRadius: 4 }} />
              </View>
            </GlassCard>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WebViewScreen;
