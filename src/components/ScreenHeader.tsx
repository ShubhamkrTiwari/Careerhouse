import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: LucideIcon;
  onRightPress?: () => void;
  showBack?: boolean;
  onBackPress?: () => void;
}

const ScreenHeader = ({
  title,
  subtitle,
  rightIcon: RightIcon,
  onRightPress,
}: ScreenHeaderProps) => {
  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} className="pb-6">
      <SafeAreaView edges={['top']}>
        <View className="flex-row items-center justify-between px-6 pt-5">
          <View className="flex-1">
            <Text className="text-white text-3xl font-bold tracking-tight">{title}</Text>
            {subtitle && (
              <Text className="text-slate-400 text-base mt-1 font-medium">{subtitle}</Text>
            )}
          </View>
          {RightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/50 shadow-sm"
              activeOpacity={0.7}
            >
              <RightIcon size={24} color="#3b82f6" strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ScreenHeader;
