/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
//import MapView from 'react';
import Api from './src/api';
import {
  AppRegistry,
  StyleSheet,
  MapView,
  View
} from 'react-native';

var Weather= React.createClass({
  getInitialState: function() {
    return{
      pin:{
        longitude:0,
        latitude:0
      },
      city:'', // default values
      temperature:'',
      description:''
    };
  },
  render:function(){
      return <MapView
      annotations={[this.state.pin]}
      onRegionChangeComplete={this.onRegionChangeComplete}// need to find the long and lattitude of the place at the center of the screen
      // created a function // this will come to know the place when the touch is removed and will find the place
       style={styles.map}>
       </MapView>
  },

  onRegionChangeComplete: function(region){
      this.setState({
                      pin:{
                        latitude:region.latitude,
                        longitude:region.longitude
                          }
                    });
// whenever the person stops draging the screen it gets a location so here we will do an API called

Api(region.latitude,region.longitude) // with this we are just making an Api call
// now we need to fetch the data from the Api
.then((data) => { // now we got the data so re render it on the screen using the concept of state
                  console.log(data);
                  this.setState(data);
                });
  }
});

var styles = StyleSheet.create({
  map: {
    flex:1
  }
});
AppRegistry.registerComponent('weather', () => Weather);
