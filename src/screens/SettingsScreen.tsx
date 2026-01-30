import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Animated, StyleSheet } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Palette, AlertCircle, Check, Bell, Shield, Info, Moon, User } from 'lucide-react-native';
import * as Sentry from '@sentry/react-native';

import { AVAILABLE_ICONS, getIconPreference, saveIconPreference } from '../utils/iconManager';
import ScreenHeader from '../components/ScreenHeader';
import GradientButton from '../components/GradientButton';

const SettingsScreen = () => {
  const [currentIcon, setCurrentIcon] = useState<string>('default');
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadIconPreference();
  }, []);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const loadIconPreference = async () => {
    try {
      const icon = await getIconPreference();
      setCurrentIcon(icon);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading icon preference:', error);
      Sentry.captureException(error);
      setIsLoading(false);
    }
  };

  const handleIconChange = async (iconId: string) => {
    setCurrentIcon(iconId);
    const success = await saveIconPreference(iconId);
    if (success) {
      Sentry.captureMessage(`User changed app icon to: ${iconId}`, 'info');
      Alert.alert('✅ Success', `Icon changed to "${iconId}"\nRestart app to apply`, [{ text: 'OK' }]);
    }
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    Sentry.captureMessage(`Notifications ${value ? 'enabled' : 'disabled'}`, 'info');
  };

  const handleTestError = () => {
    try {
      throw new Error('Test error from Settings');
    } catch (error) {
      Sentry.captureException(error);
      Alert.alert('✅ Error Logged', 'Sent to Sentry', [{ text: 'OK' }]);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Animated.View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            borderWidth: 4,
            borderColor: '#3b82f6',
            borderTopColor: 'transparent',
            transform: [{ rotate: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }],
          }}
        />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScreenHeader
        title="Settings"
        subtitle="Customize your experience"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Section */}
        <LinearGradient
          colors={['#eff6ff', '#e0e7ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          <View style={styles.profileContent}>
            <LinearGradient
              colors={['#3b82f6', '#8b5cf6']}
              style={styles.profileAvatar}
            >
              <User size={36} color="#ffffff" />
            </LinearGradient>
            <View style={styles.profileText}>
              <Text style={styles.profileName}>CareerHouse User</Text>
              <Text style={styles.profileSubtitle}>Manage your account settings</Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.profileAction}>
              <Palette size={24} color="#6366f1" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Icon Theme Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Visual Style</Text>
          <View style={styles.iconList}>
            {AVAILABLE_ICONS.map((icon, _index) => (
              <TouchableOpacity
                key={icon.id}
                onPress={() => handleIconChange(icon.id)}
                activeOpacity={0.8}
                style={[
                  styles.iconCard,
                  currentIcon === icon.id && styles.iconCardSelected
                ]}
              >
                <View style={styles.iconCardContent}>
                  <View style={[styles.iconPreview, { backgroundColor: icon.color }]}>
                    <View style={styles.iconInner} />
                  </View>
                  <View style={styles.iconText}>
                    <Text style={[
                      styles.iconName,
                      currentIcon === icon.id && styles.iconNameSelected
                    ]}>
                      {icon.name}
                    </Text>
                    <Text style={[
                      styles.iconDescription,
                      currentIcon === icon.id && styles.iconDescriptionSelected
                    ]}>
                      {icon.description}
                    </Text>
                  </View>
                </View>
                {currentIcon === icon.id && (
                  <LinearGradient
                    colors={['#3b82f6', '#2563eb']}
                    style={styles.checkIcon}
                  >
                    <Check size={20} color="#ffffff" strokeWidth={3} />
                  </LinearGradient>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Preferences</Text>
          <View style={styles.preferencesCard}>
            <View style={styles.preferenceItem}>
              <LinearGradient
                colors={['#dbeafe', '#bfdbfe']}
                style={styles.preferenceIcon}
              >
                <Bell size={24} color="#3b82f6" />
              </LinearGradient>
              <View style={styles.preferenceText}>
                <Text style={styles.preferenceTitle}>Push Notifications</Text>
                <Text style={styles.preferenceSubtitle}>Stay updated with alerts</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationToggle}
                color="#3b82f6"
                trackColor={{ false: '#e5e7eb', true: '#dbeafe' }}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.preferenceItem}>
              <LinearGradient
                colors={['#fef3c7', '#fde68a']}
                style={styles.preferenceIcon}
              >
                <Moon size={24} color="#f59e0b" />
              </LinearGradient>
              <View style={styles.preferenceText}>
                <Text style={styles.preferenceTitle}>Dark Mode</Text>
                <Text style={styles.preferenceSubtitle}>Toggle theme appearance</Text>
              </View>
              <Switch
                value={false}
                onValueChange={() => {}}
                color="#f59e0b"
                trackColor={{ false: '#e5e7eb', true: '#fef3c7' }}
              />
            </View>
          </View>
        </View>

        {/* System Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔧 Diagnostics</Text>
          <View style={styles.diagnosticsCard}>
            <View style={styles.diagnosticItem}>
              <LinearGradient
                colors={['#fee2e2', '#fecaca']}
                style={styles.diagnosticIcon}
              >
                <Shield size={24} color="#ef4444" />
              </LinearGradient>
              <View style={styles.diagnosticText}>
                <Text style={styles.diagnosticTitle}>Error Monitoring</Text>
                <Text style={styles.diagnosticSubtitle}>Real-time Sentry tracking</Text>
              </View>
            </View>
            <GradientButton
              title="Test Crash Report"
              icon={AlertCircle}
              colors={['#ef4444', '#dc2626']}
              onPress={handleTestError}
            />
          </View>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ℹ️ About</Text>
          <View style={styles.aboutCard}>
            <View style={styles.aboutItem}>
              <View style={styles.aboutItemContent}>
                <View style={styles.aboutIcon}>
                  <Info size={20} color="#3b82f6" />
                </View>
                <Text style={styles.aboutLabel}>Version</Text>
              </View>
              <Text style={styles.aboutValue}>1.2.0</Text>
            </View>
            <View style={styles.aboutItem}>
              <View style={styles.aboutItemContent}>
                <View style={styles.aboutIcon}>
                  <Palette size={20} color="#8b5cf6" />
                </View>
                <Text style={styles.aboutLabel}>Engine</Text>
              </View>
              <Text style={styles.aboutValue}>Expo SDK 54</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileCard: {
    marginTop: 24,
    marginBottom: 32,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  profileText: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  statusText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '500',
  },
  profileAction: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    paddingHorizontal: 8,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  iconList: {
    gap: 16,
  },
  iconCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  iconCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconPreview: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconInner: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  iconText: {
    flex: 1,
    marginLeft: 16,
  },
  iconName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  iconNameSelected: {
    color: '#1d4ed8',
  },
  iconDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 20,
  },
  iconDescriptionSelected: {
    color: '#2563eb',
  },
  checkIcon: {
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  preferencesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(156, 163, 175, 0.2)',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  preferenceIcon: {
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  preferenceText: {
    flex: 1,
    marginLeft: 16,
  },
  preferenceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  preferenceSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 24,
  },
  diagnosticsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(156, 163, 175, 0.2)',
  },
  diagnosticItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  diagnosticIcon: {
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  diagnosticText: {
    flex: 1,
    marginLeft: 16,
  },
  diagnosticTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  diagnosticSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  aboutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(156, 163, 175, 0.2)',
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  aboutItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aboutIcon: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    marginRight: 12,
  },
  aboutLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  aboutValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default SettingsScreen;
