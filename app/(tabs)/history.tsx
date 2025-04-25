import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, ArrowRight, ChevronRight } from 'lucide-react-native';

const MOCK_HISTORY = [
  {
    id: '1',
    origin: 'Home',
    destination: 'Work',
    date: '2024-02-20',
    time: '09:30 AM',
    route: 'Blue Line',
    routeColor: '#2563EB',
  },
  {
    id: '2',
    origin: 'Work',
    destination: 'Gym',
    date: '2024-02-19',
    time: '06:00 PM',
    route: 'Red Line',
    routeColor: '#DC2626',
  },
  {
    id: '3',
    origin: 'Gym',
    destination: 'Home',
    date: '2024-02-19',
    time: '08:00 PM',
    route: 'Green Line',
    routeColor: '#059669',
  },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journey History</Text>
      
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
          <Text style={styles.filterButtonTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>This Month</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {MOCK_HISTORY.map((journey) => (
          <TouchableOpacity key={journey.id} style={styles.journeyCard}>
            <View style={styles.journeyHeader}>
              <Text style={styles.journeyDate}>{journey.date}</Text>
              <View style={[styles.routeBadge, { backgroundColor: journey.routeColor }]}>
                <Text style={styles.routeText}>{journey.route}</Text>
              </View>
            </View>
            
            <View style={styles.journeyInfo}>
              <View style={styles.locationContainer}>
                <View style={styles.locationIconContainer}>
                  <MapPin size={20} color="#64748B" />
                </View>
                <Text style={styles.locationText}>{journey.origin}</Text>
              </View>
              
              <View style={styles.arrowContainer}>
                <ArrowRight size={20} color="#CBD5E1" />
              </View>
              
              <View style={styles.locationContainer}>
                <View style={styles.locationIconContainer}>
                  <Navigation size={20} color="#64748B" />
                </View>
                <Text style={styles.locationText}>{journey.destination}</Text>
              </View>
              
              <TouchableOpacity style={styles.detailsButton}>
                <ChevronRight size={20} color="#64748B" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.journeyTime}>{journey.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#0F172A',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  filterButtonActive: {
    backgroundColor: '#0F172A',
  },
  filterButtonText: {
    color: '#64748B',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  journeyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  journeyDate: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  routeBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  routeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  journeyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
    flex: 1,
  },
  arrowContainer: {
    width: 32,
    alignItems: 'center',
  },
  detailsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  journeyTime: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
});