/* eslint-disable prettier/prettier */
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const HomeScreen = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState('India');

  async function getWeather() {
    try {
      let res = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=9fe125a5e9124773b5b102053241503&q=${search}&days=1&aqi=no&alerts=no`,
      );
      console.log('res.data', res.data);
      if (res.data) {
        setLocation(res.data); // Assuming the response contains the weather data
      } else {
        setLocation(null); // Reset location if no results found
      }
    } catch (err) {
      console.log('err', err);
    }
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = () => {
    getWeather();
  };

  useLayoutEffect(() => {
    getWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light'} />
      <Image
        blurRadius={20}
        source={require('../assets/Images/backgroundGradient.jpg')}
        style={[
          styles.backgroundImage,
          !showSearch && {height: '100%'}, // Adjust height only if search bar is not shown
        ]}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            {showSearch ? (
              <TextInput
                onChangeText={text => setSearch(text)}
                onSubmitEditing={handleSearch}
                style={styles.input}
                placeholder="Search city"
                placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
              />
            ) : null}

            <TouchableOpacity style={styles.searchIcon} onPress={toggleSearch}>
              <Entypo name="magnifying-glass" color="white" size={21} />
            </TouchableOpacity>
          </View>
        </View>
        {location && showSearch ? (
          <View style={styles.locationContainer}>
            <TouchableOpacity style={styles.locationItem}>
              <FontAwesome size={24} name="map-marker" />
              <Text style={styles.locationText}>
                {location.location.name}, {location.location.country}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {/* Forecast section start from here */}
        {location && (
          <View style={styles.forecastContainer}>
            <View
              style={[
                styles.forecastInnerContainer,
                showSearch && styles.centered,
              ]}>
              <Text style={styles.forecastCity}>{location.location.name},</Text>
              <Text style={styles.forecastCountry}>
                {location.location.country}
              </Text>
              {location.current.condition && (
                <Image
                  source={{uri: `http:${location.current.condition.icon}`}} // assuming your location object contains an icon URL
                  style={styles.weatherImage}
                />
              )}
              {location.current.temp_c && (
                <Text style={styles.temperatureText}>
                  {location.current.temp_c}°C
                </Text>
              )}
            </View>
          </View>
        )}
        <View style={styles.nextDayContainer}>
          <Text style={styles.nextDayText}>Next Day Forecast:</Text>
          <ScrollView horizontal style={styles.nextDayScrollContainer}>
            {location &&
              location.forecast.forecastday.map((day, index) => (
                <View key={index} style={styles.dayForecastContainer}>
                  <Image
                    source={{uri: `http:${day.day.condition.icon}`}} // assuming your forecast data contains an icon URL
                    style={styles.dayForecastImage}
                  />
                  <Text style={styles.dayForecastText}>
                    {day.day.avgtemp_c}°C
                  </Text>
                </View>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Added background color to SafeAreaView for better visibility
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  contentContainer: {
    flexGrow: 1,
  },
  searchContainer: {
    width: '90%',
    height: 50,
    marginHorizontal: 16,
    marginTop: 40, // Add margin from the top
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 6,
    height: 40,
    color: '#000',
    fontSize: 14,
  },
  searchIcon: {
    backgroundColor: '#C5C6D0',
    borderRadius: 50,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    width: '90%',
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 7,
    marginLeft: 20,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    marginBottom: 14,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginLeft: 20,
  },
  locationText: {
    marginLeft: 9,
  },
  forecastContainer: {
    marginBottom: 2,
    marginTop: 40,
    alignItems: 'center',
  },
  forecastInnerContainer: {
    alignItems: 'center',
  },
  forecastCity: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  forecastCountry: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginTop: 6,
  },
  weatherImage: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  temperatureText: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 20,
  },
  nextDayContainer: {
    marginBottom: 20,
    marginVertical: 40,

    alignItems: 'center',
    marginLeft: 20,
  },
  nextDayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 25,
    marginRight: '10%',
  },
  nextDayScrollContainer: {
    paddingHorizontal: 5,
  },
  dayForecastContainer: {
    justifyContent: 'center',
    paddingVertical: 10,
    marginRight: 20,
    height: 150,
    width: 150,
    borderRadius: 40,
    backgroundColor: '#d8d8d8',
    marginTop: 20,
    marginLeft: 20,
  },
  dayForecastImage: {
    width: '60%',
    marginLeft: 30,
    height: 120,

    resizeMode: 'cover',
  },
  dayForecastText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: '30%',
  },
});
