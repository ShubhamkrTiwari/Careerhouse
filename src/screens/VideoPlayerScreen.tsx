import React, { useEffect } from 'react';
import { View, StatusBar, Text, ScrollView, StyleSheet, Animated } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as Sentry from '@sentry/react-native';
import { Shield, Info, Activity, Tv } from 'lucide-react-native';

import ScreenHeader from '../components/ScreenHeader';
import GlassCard from '../components/GlassCard';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  sectionPadding: { paddingHorizontal: 16 },
  label: { color: '#94a3b8', fontSize: 10, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
});

const videoSource = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

const VideoPlayerScreen = () => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    Sentry.captureMessage('Video Player Screen Opened', 'info');
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScreenHeader 
        title="Premium Stream" 
        subtitle="Ultra HD • Adaptive Bitrate" 
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Full Width Video Section */}
        <Animated.View style={{ marginBottom: 16 }}>
          <GlassCard style={{ overflow: 'hidden', backgroundColor: '#000', borderColor: '#334155', borderTopWidth: 1, borderBottomWidth: 1 }}>
            <View style={{ position: 'relative' }}>
              <VideoView 
                style={{ width: '100%', aspectRatio: 16 / 9 }}
                player={player} 
                allowsFullscreen 
                allowsPictureInPicture 
              />
              <View style={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Tv size={12} color="#fff" />
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 8, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>HLS Stream</Text>
              </View>
              <View style={{ position: 'absolute', top: 16, right: 16, backgroundColor: '#dc2626', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <View style={{ width: 8, height: 8, backgroundColor: '#fff', borderRadius: 4 }} />
                <Text style={{ color: '#fff', fontSize: 8, fontWeight: '900', letterSpacing: 1 }}>LIVE</Text>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        <View style={styles.sectionPadding}>
          {/* Stream Overview */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.label, { paddingHorizontal: 8, marginBottom: 10 }]}>
              Broadcast Intelligence
            </Text>
            <GlassCard style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <View style={{ padding: 12, borderRadius: 16, backgroundColor: 'rgba(129, 140, 248, 0.1)', borderWidth: 1, borderColor: 'rgba(129, 140, 248, 0.2)' }}>
                  <Activity size={18} color="#818cf8" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Adaptive Core</Text>
                  <Text style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>HLS v3 Engine Active</Text>
                </View>
              </View>
              <Text style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 21, fontWeight: '500' }}>
                Our proprietary streaming engine monitors your network throughput every 500ms, seamlessly switching between quality profiles for zero-latency playback.
              </Text>
            </GlassCard>
          </View>

          {/* Features Grid */}
          <View style={{ marginBottom: 16 }}>
            <Text style={[styles.label, { paddingHorizontal: 8, marginBottom: 10 }]}>
              Protocol Specs
            </Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <GlassCard style={{ paddingVertical: 16, paddingHorizontal: 12, alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.1)' }}>
                  <Shield size={20} color="#10b981" style={{ marginBottom: 8 }} />
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 11, textTransform: 'uppercase' }}>Secure</Text>
                  <Text style={{ color: '#708090', fontSize: 8, textAlign: 'center', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>AES-128 Ready</Text>
                </GlassCard>
              </View>
              <View style={{ flex: 1 }}>
                <GlassCard style={{ paddingVertical: 16, paddingHorizontal: 12, alignItems: 'center', backgroundColor: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.1)' }}>
                  <Info size={20} color="#3b82f6" style={{ marginBottom: 8 }} />
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 11, textTransform: 'uppercase' }}>Full HD</Text>
                  <Text style={{ color: '#708090', fontSize: 8, textAlign: 'center', marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>1080p 60FPS</Text>
                </GlassCard>
              </View>
            </View>
          </View>

          {/* Technical List */}
          <GlassCard style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
            <View style={{ gap: 16 }}>
              {[
                { label: 'Network Protocol', value: 'HTTP Live Streaming' },
                { label: 'Container Format', value: 'MPEG-2 Transport Stream' },
                { label: 'Video Codec', value: 'H.264 / AVC' },
                { label: 'Infrastructure', value: 'Global CDN' },
              ].map((item, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i < 3 ? 12 : 0, borderBottomWidth: i < 3 ? 1 : 0, borderBottomColor: 'rgba(71, 85, 105, 0.5)' }}>
                  <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '500' }}>{item.label}</Text>
                  <Text style={{ color: '#e2e8f0', fontSize: 12, fontWeight: '700' }}>{item.value}</Text>
                </View>
              ))}
            </View>
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  );
};

export default VideoPlayerScreen;
