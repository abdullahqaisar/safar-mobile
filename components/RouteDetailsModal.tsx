import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Clock, X, Brain as Train, Ticket } from 'lucide-react-native';
import { useMemo } from 'react';

type Station = {
  name: string;
  latitude: number;
  longitude: number;
};

type TransitLine = {
  id: string;
  name: string;
  color: string;
  length: string;
  stations: number;
  dailyRiders: string;
  operatingHours: string;
  route: Station[];
};

type RouteDetailsModalProps = {
  line: TransitLine;
  onClose: () => void;
  visible: boolean;
};

export default function RouteDetailsModal({ line, onClose, visible }: RouteDetailsModalProps) {
  const [firstStation, lastStation] = useMemo(() => {
    return [line.route[0], line.route[line.route.length - 1]];
  }, [line.route]);

  if (!visible) return null;

  return (
    <View style={styles.modalContainer}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={95} tint="light" style={StyleSheet.absoluteFill} />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.androidBackground]} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={[styles.lineIndicator, { backgroundColor: line.color }]} />
            <View>
              <Text style={styles.lineName}>{line.name}</Text>
              <Text style={styles.frequency}>Every 02-05 Minutes</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        <View style={styles.routeSummary}>
          <Text style={styles.sectionTitle}>Route Summary</Text>
          <View style={styles.stations}>
            <View style={styles.stationDot} />
            <Text style={styles.stationName}>{firstStation.name}</Text>
            <View style={[styles.routeLine, { backgroundColor: line.color }]} />
            <Text style={styles.stationName}>{lastStation.name}</Text>
            <View style={[styles.stationDot, { backgroundColor: line.color }]} />
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Clock size={20} color={line.color} />
            <View>
              <Text style={styles.infoLabel}>Schedule</Text>
              <Text style={styles.infoValue}>First: 6:30 AM</Text>
              <Text style={styles.infoValue}>Last: 10:00 PM</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ticket size={20} color={line.color} />
            <View>
              <Text style={styles.infoLabel}>Ticket</Text>
              <Text style={styles.infoValue}>Single Trip: Rs. 30</Text>
            </View>
          </View>
        </View>

        <View style={styles.stationsSection}>
          <Text style={styles.sectionTitle}>All Stations ({line.stations})</Text>
          <ScrollView style={styles.stationsList}>
            {line.route.map((station, index) => (
              <View key={station.name} style={styles.stationItem}>
                <View style={styles.stationMarker}>
                  <View style={[styles.stationDot, { backgroundColor: line.color }]} />
                  <View style={[styles.stationLine, { backgroundColor: line.color }]} />
                </View>
                <Text style={styles.stationText}>{station.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  androidBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  content: {
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  lineIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  lineName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  frequency: {
    fontSize: 14,
    color: '#64748B',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeSummary: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },
  stations: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
  },
  stationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
  },
  routeLine: {
    flex: 1,
    height: 2,
  },
  stationName: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  infoSection: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    color: '#64748B',
  },
  stationsSection: {
    flex: 1,
  },
  stationsList: {
    flex: 1,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  stationMarker: {
    width: 24,
    alignItems: 'center',
  },
  stationLine: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  stationText: {
    fontSize: 14,
    color: '#0F172A',
  },
});