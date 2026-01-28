import React from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';

interface GradientButtonProps {
  onPress: () => void;
  title: string;
  colors?: [string, string, ...string[]];
  icon?: LucideIcon;
  className?: string;
  iconColor?: string;
}

const GradientButton = ({
  onPress,
  title,
  colors = ['#3b82f6', '#1e40af'],
  icon: Icon,
  className = '',
  iconColor = '#fff',
}: GradientButtonProps) => {
  const [scale] = React.useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }} className={className}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="py-4 px-6 rounded-2xl flex-row items-center justify-center gap-3 shadow-lg"
        >
          {Icon && <Icon size={20} color={iconColor} strokeWidth={2.5} />}
          <Text className="text-white font-bold text-base tracking-wide">{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default GradientButton;
