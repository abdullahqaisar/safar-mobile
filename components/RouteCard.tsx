import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Clock, MapPin, Navigation, ArrowRight } from 'lucide-react-native';

type RouteStep = {
  type: string;
  description: string;
  duration: string;
  distance?: string;
  line?: string;
  from?: string;
  to?: string;
  stops?: number;
};

type Route = {
  id: string;
  name: string;
  duration: string;
  fare: string;
  steps: RouteStep[];
};

type RouteCardProps = {
  route: Route;
  onSelect: () => void;
  isSelected?: boolean;
};

const SAFAR_GREEN = '#00B07D';

export default function RouteCard({ route, onSelect, isSelected }: RouteCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onSelect}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Clock size={16} color={SAFAR_GREEN} />
          <Text style={styles.duration}>{route.duration}</Text>
        </View>
        <Text style={styles.fare}>{route.fare}</Text>
      </View>

      <View style={styles.routeVisual}>
        {route.steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.stepIconContainer}>
              {step.type === 'walk' ? (
                <MapPin size={20} color="#64748B" />
              ) : (
                <Navigation size={20} color="#64748B" />
              )}
            </View>
            
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>
                {step.type === 'walk' ? 'Walk' : step.line}
              </Text>
              <Text style={styles.stepDetails}>
                {step.type === 'walk' ? (
                  `${step.distance} • ${step.duration}`
                ) : (
                  `${step.stops} stops • ${step.duration}`
                )}
              </Text>
            </View>
            
            {index < route.steps.length - 1 && (
              <View style={styles.arrowContainer}>
                <ArrowRight size={16} color="#CBD5E1" />
              </View>
            )}
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  selectedContainer: {
    borderColor: SAFAR_GREEN,
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  duration: {
    fontSize: 14,
    fontWeight: '600',
    color: SAFAR_GREEN,
  },
  fare: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  routeVisual: {
    gap: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  stepDetails: {
    fontSize: 14,
    color: '#64748B',
  },
  arrowContainer: {
    width: 24,
    alignItems: 'center',
  },
});