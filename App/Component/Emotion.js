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
import { View, Alert, StyleSheet, TouchableOpacity, Dimensions, Text} from 'react-native'
import { Config } from '../config'
import { ConfigEmotions } from '../configEmotions';

// Constants
MAX_INTENSITY = Config.SELF_REPORT_PARAMETER.MAX_INTENSITY_VALUE
TEXT_RADIUS = Config.SELF_REPORT_PARAMETER.TEXT_RADIUS
CIRCLE_RADIUS = Config.SELF_REPORT_PARAMETER.CIRCLE_RADIUS
CIRCLE_OPACITY = Config.SELF_REPORT_PARAMETER.CIRCLE_OPACITY
DICTIONARY = Config.SELECTED_LANGUAGE.content
NB_EMOTIONS = Object.keys(ConfigEmotions.EMOTIONS).length

// Display
export default class Emotion extends Component {

constructor(props) {
  super(props);

  this.state = { selectionValue: -1,
    intensityArray: [],
  }



  // Generate an array from 
  this.state.intensityArray = [...Array(MAX_INTENSITY + 1).keys()] 
  this.state.intensityArray = this.state.intensityArray.slice(1)

}

updateSelectionValue = (emotion_key) => {
  
  //Deselection 
  console.log('countSelectedEmotion : ' + this.props.countSelectedEmotion)

  if(this.props.selection  > -1){
    
    this.props.deselectEmotionSelection(emotion_key)

  }
  //Selection
  else{
    if(this.props.countSelectedEmotion < this.props.max_emotion_selection)
    {

      this.props.displayIntensitySelection(emotion_key)

    }else{

      Alert.alert(DICTIONARY.EMOTION_alertWarningTitle, DICTIONARY.EMOTION_alertWarningMessage1 + this.props.max_emotion_selection + DICTIONARY.EMOTION_alertWarningMessage2)

    }
  }

}

render() {
  
  // Item position
  return (
    <View
    style = {
      {    
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'

      }

    }
    
    >


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
                      left : this.props.spots[this.props.emotion_index].x,
                      top : this.props.spots[this.props.emotion_index].y,
                      borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                      width: Dimensions.get('window').width * CIRCLE_RADIUS * (20 / (NB_EMOTIONS <= 12? 12 : NB_EMOTIONS)),
                      height: Dimensions.get('window').width * CIRCLE_RADIUS * (20 / (NB_EMOTIONS <= 12? 12 : NB_EMOTIONS)),
                      opacity: CIRCLE_OPACITY,
                      alignItems: 'baseline',
                      justifyContent: 'center',
                    }, 
                    (this.props.selection > -1) ? {backgroundColor: '#4f4a46', opacity: 1}:
                    {backgroundColor: this.props.color[ConfigEmotions.selectedColorIndex], opacity: CIRCLE_OPACITY},
                  ]
                }
          onPress={ () => this.updateSelectionValue(this.props.emotion_key) }
        >

        <Text  
          style = {
                    [
                      {  
                        fontSize: EMOTIONS[this.props.emotion_key].fontSize * (NB_EMOTIONS <= 16? 1.2 : ((0.8+NB_EMOTIONS/100) * 20 / NB_EMOTIONS)),
                        width: Dimensions.get('window').width * CIRCLE_RADIUS * 20 / (NB_EMOTIONS <= 12? 12 : NB_EMOTIONS),
                        color: '#000000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        opacity: 1,
                        fontWeight: 'bold'
                      },
                      (this.props.selection > -1) ? {color: '#ffffff'}:
                      {color: '#000000'},
                    ]
                  }
                  //Tags are retrieved directly from DICTIONARY to be sure having the translation: if they are retrieved from EMOTIONS, they are note updated when the language parameter changes.
                > {NB_EMOTIONS <= 14? DICTIONARY.EMOTION_LABELS[this.props.emotion_key-1].replace('\n','') : DICTIONARY.EMOTION_LABELS[this.props.emotion_key-1]}  </Text> 


      </TouchableOpacity>
      
    </View>
      
  </View>

    ) 

  }
}

const styles = StyleSheet.create({

  text: {
    color: '#4f603c',

 }
})



