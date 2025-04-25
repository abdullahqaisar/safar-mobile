import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import RouteCard from '@/components/RouteCard';
import RouteDetails from '@/components/RouteDetails';

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

export default function RoutesScreen() {
  const { routes: routesParam } = useLocalSearchParams();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  useEffect(() => {
    if (routesParam) {
      try {
        const parsedRoutes = JSON.parse(routesParam as string);
        setRoutes(parsedRoutes);
        if (parsedRoutes.length > 0) {
          setSelectedRoute(parsedRoutes[0].id);
        }
      } catch (error) {
        console.error('Failed to parse routes:', error);
      }
    }
  }, [routesParam]);

  const selectedRouteData = routes.find(route => route.id === selectedRoute);

  if (!routes.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Routes Found</Text>
        <Text style={styles.subtitle}>Try searching for a different route</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0F172A" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Available Routes</Text>
          <Text style={styles.subtitle}>{routes.length} routes found</Text>
        </View>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.routesList}
        contentContainerStyle={styles.routesListContent}>
        {routes.map((route) => (
          <View key={route.id} style={styles.routeCardContainer}>
            <RouteCard
              route={route}
              isSelected={selectedRoute === route.id}
              onSelect={() => setSelectedRoute(route.id)}
            />
          </View>
        ))}
      </ScrollView>

      {selectedRouteData && (
        <RouteDetails route={selectedRouteData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 24,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  routesList: {
    maxHeight: 180,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  routesListContent: {
    padding: 16,
    gap: 12,
  },
  routeCardContainer: {
    width: 300,
  },
});