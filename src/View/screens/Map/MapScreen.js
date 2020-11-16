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
  ImageBackground,
  Image,
  Animated
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapboxGL, { Camera } from '@react-native-mapbox-gl/maps';
import {lineString as makeLineString} from '@turf/helpers';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import '@mapbox/mapbox-sdk/services/map-matching';

// import PulseCircleLayer from './PulseCircleLayer';
import MapMatching from '@mapbox/mapbox-sdk/services/map-matching';


const accessToken = 'pk.eyJ1Ijoic2hhaGJla21pcnUiLCJhIjoiY2tjNnNyNGw0MDNndDMwbWZ3eGNwaHFqbCJ9.bJ2sqsCvcrOUmr_YeWFtJg';
const directionsClient = MapboxDirectionsFactory({accessToken});

const Pulse = require('react-native-pulse').default;


Icon.loadFont();
MapboxGL.setAccessToken(accessToken);

// Coordinates
const UserLocation = [-120.340300, 50.655503]; // [longitude, latitude]
const DestinationLocation = [-120.3490,50.7575]; // [longitude, latitude]
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
        
        coordinate={DestinationLocation}
        >
        <ImageBackground
                source={require("../../../assets/images/3dcar.png")}                                            
                style={styles.MapMarker}
            />
            <MapboxGL.Callout>
            
              <View 
              style = {{
                width:150,
                height:150,
                backgroundColor:'#212121',
                borderRadius:20,
                bottom:10,
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 0
                },
                elevation: 30,
                shadowOpacity: 0.5,
                shadowRadius: 10,
                borderWidth:0.25,borderColor:'#121212'
                }}>

                <View style = {{flex:1,justifyContent:'space-between',margin:15}}>

                    <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                      <Image style = {{width:50,height:50,borderRadius:50,borderColor:'white',borderWidth:1}} source = {require('../../../assets/images/face1.jpg')}/>
                      <Text style = {{fontSize:25,fontWeight:'900',color:'grey'}}>2.6 mi</Text>
                    </View>

                    <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style = {{fontSize:15,fontWeight:'500',color:'#2ecc71'}}>Delivering</Text>
                    <Feather style = {{fontSize:20,color:'white',backgroundColor:'dodgerblue',borderRadius:10,overflow:'hidden'}} name = 'activity'/>
                    </View>

                    <View>
                    <Text style = {{fontSize:20,fontWeight:'900',color:'white'}}>V2A4F5</Text>
                    <Text style = {{fontSize:20,fontWeight:'300',color:'white'}}>VW GOLF</Text>
                    </View>
                </View>

              </View>


            
            </MapboxGL.Callout>
      </MapboxGL.PointAnnotation>
    ) : null;
  };

  renderStart() {
    return StartLocation.length > 0 && this.state.started ? (
      <MapboxGL.PointAnnotation
        id="start"
        title="start location"
        
        coordinate={StartLocation}>
        <View>
        
          <Animated.View 
          style={styles.circle}>
          <Pulse 
          color='#2ecc70' 
         
          numPulses={2} 
          diameter={50} 
          speed={30} 
          duration={2000} />

            <View style={styles.innerCircle}>
              <View style={styles.dotCircle} />
            </View>
          </Animated.View>
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
                        styleURL = "mapbox://styles/shahbekmiru/ckg363tz81g3z19qlp9lwsh3y"
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
              <SafeAreaView>

                
                    <View style = {{backgroundColor:"white", width:150, alignSelf:'center',alignItems:'center',borderRadius:50,paddingTop:5,paddingBottom:5}}>
                      <Text style = {{fontWeight:'900',fontSize:15,color: '#23cc70'}}>DELIVERING TO</Text>
                      <View style = {{flexDirection:'row'}}>
                        <Text style = {{fontWeight:'600',fontSize:20}}>V2C 6N2</Text>
                        <Feather name = {'chevron-down'} style = {{fontSize:20, color: '#23cc70'}}/>
                      </View>
                    </View>
               
              
              </SafeAreaView>
              
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
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth:1,
    borderColor:"#23cc70",
    backgroundColor: '#23cc7040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 25,
    height: 25,
    borderRadius: 20,
    borderWidth:3,
    borderColor:'#ffffff',
    shadowColor: "black",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 1,
        shadowRadius: 6,
    backgroundColor: '#23cc70',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotCircle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 1,
        shadowRadius: 3,
    
    backgroundColor: '#ffffff',
  },
  MapMarker:{
    height : 40,
    width: 80

  },
 

});

const layerStyles = {
  route: {
    lineColor: '#2ecc71',
    lineJoin: MapboxGL.LineJoin.Round,
    lineCap: MapboxGL.LineCap.Round,
    lineDasharray: [0.5,2],
    lineWidth: 4,
    lineOpacity: 1,
  },
};