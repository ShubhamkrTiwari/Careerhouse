import React from 'react';
import { ViewStyle, Animated } from 'react-native';
import { Surface } from 'react-native-paper';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  delay?: number;
}

const GlassCard = ({ children, className = '', style, delay: _delay = 0 }: GlassCardProps) => {
  return (
    <Animated.View style={style}>
      <Surface
        elevation={0}
        className={`rounded-3xl bg-slate-800/40 border border-slate-700/50 overflow-hidden ${className}`}
      >
        {children}
      </Surface>
    </Animated.View>
  );
};

export default GlassCard;
