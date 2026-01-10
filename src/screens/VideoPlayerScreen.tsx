import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, Info } from 'lucide-react-native';
import { Surface, Title, Paragraph } from 'react-native-paper';

const videoSource = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

const VideoPlayerScreen = () => {
  const navigation = useNavigation();
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1a1a1a', '#000']}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft color="#fff" size={28} />
            </TouchableOpacity>
            <Text style={styles.title}>Premium Video Experience</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <Surface style={styles.videoSurface} elevation={5}>
        <VideoView 
          style={styles.video} 
          player={player} 
          allowsFullscreen 
          allowsPictureInPicture 
        />
      </Surface>

      <View style={styles.infoContainer}>
        <Surface style={styles.infoSurface} elevation={1}>
          <View style={styles.sectionHeader}>
            <Info size={20} color="#3b5998" />
            <Title style={styles.infoTitle}>Stream Details</Title>
          </View>
          <Paragraph style={styles.infoText}>
            You are currently watching a high-quality HLS stream provided by Mux. 
            The player supports adaptive bitrate streaming, native controls, 
            and fullscreen playback.
          </Paragraph>
        </Surface>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  videoSurface: {
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    aspectRatio: 16 / 9,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    paddingHorizontal: 16,
  },
  infoSurface: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  infoText: {
    color: '#666',
    fontSize: 15,
    lineHeight: 22,
  },
});

export default VideoPlayerScreen;
