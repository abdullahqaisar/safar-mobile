import { StyleSheet, View, Text, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import JourneyPlanner from '@/components/JourneyPlanner';

const INITIAL_REGION = {
  latitude: 33.6291327,
  longitude: 73.1135555,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapComponent = Platform.select({
  ios: () => require('react-native-maps').default,
  android: () => require('react-native-maps').default,
  default: () => function MapPlaceholder() {
    return (
      <View style={[styles.map, styles.mapPlaceholder]}>
        <Text>Map is not available on web platform</Text>
      </View>
    );
  },
})();

export default function JourneyScreen() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <MapComponent
        style={styles.map}
        initialRegion={INITIAL_REGION}
      />
      <View style={styles.overlay}>
        <JourneyPlanner />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});