import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import { Palette, AlertCircle, Check, Bell, Shield, Info } from 'lucide-react-native';
import * as Sentry from '@sentry/react-native';

import { AVAILABLE_ICONS, getIconPreference, saveIconPreference } from '../utils/iconManager';
import ScreenHeader from '../components/ScreenHeader';
import GlassCard from '../components/GlassCard';
import GradientButton from '../components/GradientButton';

const SettingsScreen = () => {
  const [currentIcon, setCurrentIcon] = useState<string>('default');
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    loadIconPreference();
  }, []);

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' }}>
        <Animated.View style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 4, borderColor: '#3b82f6', borderTopColor: 'transparent' }} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-900">
      <ScreenHeader 
        title="Settings" 
        subtitle="Personalize your experience" 
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 30 }} 
        className="flex-1 px-3.5"
      >
        {/* Icon Theme Section */}
        <View className="mt-3 mb-4">
          <Text className="text-slate-400 text-xs font-bold px-2 mb-3 tracking-[2px] uppercase">
            Visual Style
          </Text>
          <View className="gap-3">
            {AVAILABLE_ICONS.map((icon, index) => (
              <GlassCard 
                key={icon.id} 
                delay={index * 100}
                className={currentIcon === icon.id ? 'border-blue-500/50 bg-blue-500/5' : ''}
              >
                <TouchableOpacity 
                  onPress={() => handleIconChange(icon.id)} 
                  activeOpacity={0.7}
                  className="p-4 flex-row items-center justify-between"
                >
                  <View className="flex-1 flex-row items-center gap-4">
                    <View className="w-12 h-12 rounded-2xl shadow-lg" style={{ backgroundColor: icon.color }} />
                    <View>
                      <Text className={`font-bold text-lg ${currentIcon === icon.id ? 'text-blue-400' : 'text-white'}`}>
                        {icon.name}
                      </Text>
                      <Text className="text-slate-400 text-xs mt-0.5">{icon.description}</Text>
                    </View>
                  </View>
                  {currentIcon === icon.id && (
                    <Animated.View style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', padding: 8, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                      <Check size={18} color="#3b82f6" strokeWidth={3} />
                    </Animated.View>
                  )}
                </TouchableOpacity>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* Preferences Section */}
        <View className="mb-4">
          <Text className="text-slate-400 text-xs font-bold px-2 mb-3 tracking-[2px] uppercase">
            Preferences
          </Text>
          <GlassCard className="p-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Bell size={20} color="#06b6d4" />
                </View>
                <View>
                  <Text className="text-white font-bold text-base">Push Notifications</Text>
                  <Text className="text-slate-500 text-xs mt-0.5">Stay updated with alerts</Text>
                </View>
              </View>
              <Switch 
                value={notificationsEnabled} 
                onValueChange={handleNotificationToggle} 
                color="#06b6d4" 
              />
            </View>
          </GlassCard>
        </View>

        {/* System Section */}
        <View className="mb-4">
          <Text className="text-slate-400 text-xs font-bold px-2 mb-3 tracking-[2px] uppercase">
            Diagnostics
          </Text>
          <GlassCard className="p-5">
            <View className="flex-row items-center gap-4 mb-5">
              <View className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                <Shield size={20} color="#ef4444" />
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold text-base">Error Monitoring</Text>
                <Text className="text-slate-500 text-xs mt-0.5">Real-time Sentry tracking</Text>
              </View>
            </View>
            <GradientButton 
              title="Test Crash Report" 
              icon={AlertCircle}
              colors={['#ef4444', '#b91c1c']}
              onPress={handleTestError}
            />
          </GlassCard>
        </View>

        {/* App Info Section */}
        <View>
          <Text className="text-slate-400 text-xs font-bold px-2 mb-3 tracking-[2px] uppercase">
            About
          </Text>
          <GlassCard className="p-5">
            <View className="gap-4">
              <View className="flex-row justify-between items-center py-2 border-b border-slate-700/50">
                <View className="flex-row items-center gap-3">
                  <Info size={16} color="#64748b" />
                  <Text className="text-slate-400 text-sm font-medium">Version</Text>
                </View>
                <Text className="text-slate-200 text-sm font-bold">1.2.0</Text>
              </View>
              <View className="flex-row justify-between items-center py-2">
                <View className="flex-row items-center gap-3">
                  <Palette size={16} color="#64748b" />
                  <Text className="text-slate-400 text-sm font-medium">Engine</Text>
                </View>
                <Text className="text-slate-200 text-sm font-bold">Expo SDK 54</Text>
              </View>
            </View>
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
