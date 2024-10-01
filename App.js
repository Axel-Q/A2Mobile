import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CustomThemeProvider } from './components/ThemeColorSwitch';
import Activities from './screens/Activities';
import { Navigation } from './navigation/Navigation';


export default function App() {
  return (
      <CustomThemeProvider>
        <StatusBar style="auto" />
        <View style={styles.container}>
            <Navigation />
        </View>
      </CustomThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
