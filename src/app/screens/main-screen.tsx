import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Brightly</Text>
      <Text style={styles.subtitle}>Your app is ready!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
});
