import React, {Component} from 'react';
import {StyleSheet, View,StatusBar, ImageBackground} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2hhaGJla21pcnUiLCJhIjoiY2tjNnNyNGw0MDNndDMwbWZ3eGNwaHFqbCJ9.bJ2sqsCvcrOUmr_YeWFtJg',
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [-73.99155, 40.73581],
    };
  }

  render() { 
    return (
      <View style={styles.page}>
                      <StatusBar animated barStyle="light-content" />

        <View style={styles.container}>
          <MapboxGL.MapView 
          style={styles.map}
          styleURL = "mapbox://styles/shahbekmiru/ckdgwp2sj0myi1io4mt2ga8qo"
          >
            <MapboxGL.Camera
              zoomLevel={15}
              centerCoordinate={this.state.coordinates}
            />
            <MapboxGL.PointAnnotation coordinate={this.state.coordinates}>
            <ImageBackground
                source={require("../assets/images/3dcar.png")}                                            
                style={styles.MapMarker}
            />
            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'blue',
  },
  MapMarker:{
    height : 50,
    width: 100

  },
  map: {
    flex: 1,
  },
});