import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Search, Navigation, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';

const SAFAR_GREEN = '#00B07D';

const DUMMY_ROUTES = [
  {
    id: '1',
    name: 'Recommended Route',
    duration: '35 mins',
    fare: 'Rs. 30',
    steps: [
      {
        type: 'walk',
        description: 'Walk to Blue Line Station',
        duration: '5 mins',
        distance: '400m'
      },
      {
        type: 'metro',
        line: 'Blue Line',
        from: 'Station A',
        to: 'Station B',
        duration: '25 mins',
        stops: 6
      },
      {
        type: 'walk',
        description: 'Walk to destination',
        duration: '5 mins',
        distance: '300m'
      }
    ]
  },
  {
    id: '2',
    name: 'Alternative Route',
    duration: '45 mins',
    fare: 'Rs. 25',
    steps: [
      {
        type: 'walk',
        description: 'Walk to Red Line Station',
        duration: '8 mins',
        distance: '600m'
      },
      {
        type: 'metro',
        line: 'Red Line',
        from: 'Station X',
        to: 'Station Y',
        duration: '30 mins',
        stops: 8
      },
      {
        type: 'walk',
        description: 'Walk to destination',
        duration: '7 mins',
        distance: '500m'
      }
    ]
  }
];

export default function JourneyPlanner() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSearch = () => {
    if (!origin || !destination) return;
    router.push({
      pathname: '/(tabs)/routes',
      params: { routes: JSON.stringify(DUMMY_ROUTES) }
    });
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={95} tint="light" style={StyleSheet.absoluteFill} />
      ) : null}
      <View style={styles.content}>
        <Text style={styles.title}>Journey Planner</Text>
        <Text style={styles.subtitle}>Find the best routes to reach your destination quickly and efficiently</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.inputGroup}>
            <View style={styles.inputContainer}>
              <Search size={20} color="#94A3B8" style={styles.searchIcon} />
              <TextInput
                style={styles.input}
                placeholder="From"
                value={origin}
                onChangeText={setOrigin}
                placeholderTextColor="#94A3B8"
              />
            </View>
            
            <View style={styles.arrowContainer}>
              <ArrowRight size={20} color="#94A3B8" />
            </View>
            
            <View style={styles.inputContainer}>
              <Navigation size={20} color="#94A3B8" style={styles.searchIcon} />
              <TextInput
                style={styles.input}
                placeholder="To"
                value={destination}
                onChangeText={setDestination}
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>
          
          <TouchableOpacity
            style={[styles.searchButton, (!origin || !destination) && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={!origin || !destination}>
            <Text style={styles.searchButtonText}>Find Routes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    margin: 16,
    marginTop: Platform.OS === 'ios' ? 60 : 48,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
    lineHeight: 24,
  },
  searchContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
  },
  searchButton: {
    backgroundColor: SAFAR_GREEN,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: SAFAR_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonDisabled: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});