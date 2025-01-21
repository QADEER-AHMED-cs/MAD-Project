import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext, ThemeProvider } from './ThemeContext'; // Dark theme context
import { EventProvider } from './EventContext'; // Shared event context
import { Text, View, Button, StyleSheet } from 'react-native'; // For UI elements
import SetEvents from './SetEvents'; // Past events feedback screen
import OrganizeEvent from './OrganizeEvent'; // Organize new events screen
import EventList from './EventList'; // Event list screen
import EventDetails from './EventDetails'; // Event details screen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/** Event Stack for Home Screen */
function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Event List"
        component={EventList}
        options={{ headerShown: false }} // Remove header (Events heading)
      />
      <Stack.Screen
        name="Event Details"
        component={EventDetails}
        options={({ route }) => ({
          title: route.params?.event?.title || 'Event Details',
        })}
      />
    </Stack.Navigator>
  );
}

/** Theme Toggle Screen */
const ThemeToggleScreen = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        {isDarkMode ? 'Dark Mode is Enabled' : 'Light Mode is Enabled'}
      </Text>
      <Button
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        onPress={toggleTheme}
      />
    </View>
  );
};

/** Main App Component */
export default function App() {
  return (
    <ThemeProvider>
      <EventProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: () => {
                switch (route.name) {
                  case 'Home':
                    return <Text>🏠</Text>; // Home icon
                  case 'Set Events':
                    return <Text>🕒</Text>; // Clock icon for Set events
                  case 'Organize Event':
                    return <Text>📅</Text>; // Calendar icon for organizing events
                  case 'Toggle Theme':
                    return <Text>🌙</Text>; // Moon icon for theme toggle
                  default:
                    return null;
                }
              },
              tabBarStyle: {
                backgroundColor: route.name === 'Toggle Theme' ? '#222' : '#fff',
              },
              tabBarActiveTintColor:
                route.name === 'Toggle Theme' ? '#ffd700' : '#007bff',
            })}
          >
            {/* Home (Event List) */}
            <Tab.Screen
              name="Home"
              component={EventStack}
              options={{
                title: 'Home',
              }}
            />

            {/* Set Events */}
            <Tab.Screen
              name="Set Events"
              component={SetEvents}
              options={{
                title: 'Set Events',
              }}
            />

            {/* Organize Event */}
            <Tab.Screen
              name="Organize Event"
              component={OrganizeEvent}
              options={{
                title: 'Organize Event',
              }}
            />

            {/* Dark Theme Toggle */}
            <Tab.Screen
              name="Toggle Theme"
              component={ThemeToggleScreen}
              options={{
                title: 'Dark Mode',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </EventProvider>
    </ThemeProvider>
  );
}

/** Styles for Light and Dark Themes */
const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  lightText: {
    color: '#000',
    fontSize: 18,
    marginBottom: 20,
  },
  darkText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
});
