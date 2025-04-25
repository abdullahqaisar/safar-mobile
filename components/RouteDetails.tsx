import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Clock, MapPin, Navigation, ChevronDown, Info } from 'lucide-react-native';

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

type RouteDetailsProps = {
  route: Route;
};

const SAFAR_GREEN = '#00B07D';

export default function RouteDetails({ route }: RouteDetailsProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.timeContainer}>
          <Clock size={20} color={SAFAR_GREEN} />
          <Text style={styles.duration}>{route.duration}</Text>
          <Text style={styles.totalTime}>Total journey time</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{route.steps.length} stops</Text>
            <Text style={styles.statLabel}>Total stops</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{route.fare}</Text>
            <Text style={styles.statLabel}>Fare</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Info size={16} color="#64748B" />
        <Text style={styles.infoText}>
          Times shown do not include station access time, headways or waiting time between connections.
        </Text>
      </View>

      <View style={styles.timeline}>
        {route.steps.map((step, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.timelineIconContainer}>
              <View style={[styles.timelineIcon, { backgroundColor: step.type === 'metro' ? step.line?.includes('Red') ? '#DC2626' : '#2563EB' : '#64748B' }]}>
                {step.type === 'walk' ? (
                  <MapPin size={16} color="white" />
                ) : (
                  <Navigation size={16} color="white" />
                )}
              </View>
              {index < route.steps.length - 1 && (
                <View style={styles.timelineLine} />
              )}
            </View>
            
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>
                {step.type === 'walk' ? step.description : `${step.from} → ${step.to}`}
              </Text>
              <Text style={styles.timelineSubtitle}>
                {step.type === 'walk' ? (
                  `${step.distance} • ${step.duration}`
                ) : (
                  `${step.stops} stops • ${step.duration}`
                )}
              </Text>
              
              {step.type === 'metro' && (
                <TouchableOpacity style={styles.viewStations}>
                  <Text style={styles.viewStationsText}>View stations</Text>
                  <ChevronDown size={16} color={SAFAR_GREEN} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    margin: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  duration: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
  },
  totalTime: {
    fontSize: 14,
    color: '#64748B',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  stat: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F0F9FF',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  timeline: {
    paddingHorizontal: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 24,
  },
  timelineIconContainer: {
    alignItems: 'center',
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#64748B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 8,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  viewStations: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewStationsText: {
    fontSize: 14,
    fontWeight: '500',
    color: SAFAR_GREEN,
  },
});