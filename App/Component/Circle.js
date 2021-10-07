/*
 * Copyright 2021 Orange
 *
 * Licensed under the Creative Common by-nc-sa License, Version 4.0 (the "License");
 * you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 * https://creativecommons.org/licenses/by-nc-sa/4.0/
 * https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.fr
 *
 *    Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native'
import { Config } from '../config'
import { ConfigEmotions } from '../configEmotions'

// Main screen in the app
export default class Circle extends Component {

// Constants
INTENSITIES = Config.SELF_REPORT_PARAMETER.INTENSITY_PARAMETER
MAX_INTENSITY = Config.SELF_REPORT_PARAMETER.MAX_INTENSITY_VALUE
EMOTIONS = ConfigEmotions.EMOTIONS


  constructor(props) {
    super(props);
  }

render() {
  
  // Item position
  return (
    
  <View
    style={
      {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        position: 'absolute',
        
        
      }
    }
  >
      
      <TouchableOpacity
        //General style depends on intensity and backgroundcolor depends on color value
        style = { 
                  [
                    {
                      left : this.props.position[this.props.emotion_index].x,
                      top : this.props.position[this.props.emotion_index].y,
                      borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                      width: Dimensions.get('window').width * INTENSITIES[this.props.intensity].radius,
                      height: Dimensions.get('window').width * INTENSITIES[this.props.intensity].radius, 
                      opacity: INTENSITIES[this.props.intensity].opacity,
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }, 
                    (this.props.selection == this.props.intensity) ? {backgroundColor: '#000000'}:
                    {backgroundColor: this.props.color},
                  ] 
                }
          onPress={ () => this.props.updateSelectionValue(this.props.intensity) }
        >

        <Text  
                style = {
                          [
                            {  
                              fontSize: EMOTIONS[this.props.emotion_key].fontSize,
                              width: Dimensions.get('window').width * INTENSITIES[this.props.intensity].radius * 2,
                              height: Dimensions.get('window').width * INTENSITIES[this.props.intensity].radius / 2, 
                              color: '#000000',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: 1,
                              fontWeight: 'bold'
                            }
                          ]
                        }
                        
                > {EMOTIONS[this.props.emotion_key].tag} </Text> 


      </TouchableOpacity>

      
    </View>
    

  );
}
}

const styles = StyleSheet.create({

  text: {
    fontSize: 12,
    color: '#4f603c',

    
    
 }
})



