/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapboxGL, { Camera } from '@react-native-mapbox-gl/maps';
import {lineString as makeLineString} from '@turf/helpers';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import '@mapbox/mapbox-sdk/services/map-matching';

// import PulseCircleLayer from './PulseCircleLayer';
import MapMatching from '@mapbox/mapbox-sdk/services/map-matching';


const accessToken = 'pk.eyJ1Ijoic2hhaGJla21pcnUiLCJhIjoiY2tjNnNyNGw0MDNndDMwbWZ3eGNwaHFqbCJ9.bJ2sqsCvcrOUmr_YeWFtJg';
const directionsClient = MapboxDirectionsFactory({accessToken});



Icon.loadFont();
MapboxGL.setAccessToken(accessToken);

// Coordinates
const UserLocation = [-120.340300, 50.655503]; // [longitude, latitude]
const DestinationLocation = [-120.340836,50.676109]; // [longitude, latitude]
const StartLocation = UserLocation;
const CenterCoordinate = UserLocation;

export default class AppClass extends Component {
  constructor(props) {
    super(props);

   

    this.state = {
      timestamp: 0,
      latitude: 0.0,
      longitude: 0.0,
      altitude: 0.0,
      heading: 0.0,
      accuracy: 0.0,
      speed: 0.0,
      
    };

    this.onUserLocationUpdate = this.onUserLocationUpdate.bind(this);
  }

  onUserLocationUpdate(location) {
    this.setState({
      // timestamp: location.timestamp,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      heading: location.coords.heading,
      accuracy: location.coords.accuracy,
      speed: location.coords.speed,
    });
    
  }
  state = {
    userLocation: UserLocation,
    route: null,
    started: false,
    loading: false
  };


  


  

  drawPath() {
    const fetchRoute = async () => {
      console.log('fetch route');
      const reqOptions = 
      {
       
        waypoints: [
          {coordinates: StartLocation},
          {coordinates: DestinationLocation},
        ],
        profile: 'driving',
        geometries: 'geojson',
        
      };
      const res = await directionsClient.getDirections(reqOptions).send();
      
      const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
      this.setState({
        ...this.state,
        route: newRoute
      });
    };
    this.state.started && fetchRoute();
  }




 
  // Update userposition on update location
  onUserLocationUpdate(newUserLocation) {
    this.setState({
      ...this.state,
      userLocation: [
        newUserLocation.coords.longitude,
        newUserLocation.coords.latitude,
      ]
    });
  };

  onStart() {
    this.setState({
      ...this.state,
      started: true
    }, () => this.drawPath());
  };

  onStop() {
    this.setState({
      ...this.state,
      route: null,
      started: null
    });
  };


  renderDestinationPoint() {
    return DestinationLocation && DestinationLocation.length > 0 && this.state.started ? (
      <MapboxGL.PointAnnotation
        id="destination"
        title="destination location"
        coordinate={DestinationLocation}>
        <ImageBackground
                source={require("../assets/images/3dcar.png")}                                            
                style={styles.MapMarker}
            />
      </MapboxGL.PointAnnotation>
    ) : null;
  };

  renderStart() {
    return StartLocation.length > 0 && this.state.started ? (
      <MapboxGL.PointAnnotation
        id="start"
        title="start location"
        coordinate={StartLocation}>
        <View style={styles.circle}>
          <View style={styles.innerCircle}>
            <View style={styles.dotCircle} />
          </View>
        </View>
      </MapboxGL.PointAnnotation>
      
    ) : null;
  };

  renderRoute() {
    return this.state.route ? (
      <MapboxGL.ShapeSource id = "routeSource" shape={this.state.route}>
        <MapboxGL.LineLayer id="routeFill" style={layerStyles.route} />
      </MapboxGL.ShapeSource>
    ) : null;
  };

  renderActions() {
    return (
      <TouchableOpacity
        style={styles.startRouteButton}
        onPress={() => !this.state.started ? this.onStart() : this.onStop()}>
        <Text style={styles.text}>
          {!this.state.started ? 'Start' : 'Stop'}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <>
        {this.state.loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
        <StatusBar barStyle="light-content" />
          <View style={styles.flex}>
            <MapboxGL.MapView
                        styleURL = "mapbox://styles/shahbekmiru/ckdgwp2sj0myi1io4mt2ga8qo"
              logoEnabled={false}
              compassEnabled={false}
              zoomEnabled={true}
              onDidFinishRenderingMapFully={() => this.setState({...this.state, loading: false})}
              zoomLevel={14}
              style={styles.flex}>
              <MapboxGL.Camera
                zoomLevel={14}
                animationMode="flyTo"
                animationDuration={0}
                centerCoordinate={CenterCoordinate}
                followUserLocation={false}
                defaultSettings={{
                  centerCoordinate: CenterCoordinate,
                  followUserLocation: false,
                  followUserMode: 'normal',
                }}
                ref={camera => (_camera = camera)}
              />
              {/* <MapboxGL.UserLocation
                visible={true}
                onUpdate={newUserLocation =>
                  this.onUserLocationUpdate(newUserLocation)
                }
              /> */}
              {this.renderRoute()}
              {this.renderDestinationPoint()}
              {this.renderStart()}
            </MapboxGL.MapView>
            {this.renderActions()}
          </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0, .5)',
    height: '100%',
    width: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startRouteButton: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
    top: 20,
    width: 100,
    height: 100,
    zIndex: 200,
  },
  text: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2ecc71',
  },
  MapMarker:{
    height : 40,
    width: 80

  },
});

const layerStyles = {
  route: {
    lineColor: '#2ecc71',
    
    lineCap: MapboxGL.LineJoin.Round,
    lineWidth: 5,
    lineOpacity: 1,
  },
};