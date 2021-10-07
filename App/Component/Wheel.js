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
import { View, Dimensions, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Emotion from './Emotion'
import { Config } from '../config'
import DialogInput from 'react-native-dialog-input'; 
const globalStyles = require('../style');

// Constants 
MAX_INTENSITY = Config.SELF_REPORT_PARAMETER.MAX_INTENSITY_VALUE
MAX_SELECTED_EMOTION = Config.SELF_REPORT_PARAMETER.INITIAL_MAX_EMOTION_SELECTION
MIN_SELECTED_EMOTION = Config.SELF_REPORT_PARAMETER.INITIAL_MIN_EMOTION_SELECTION
CIRCLE_RADIUS = Config.SELF_REPORT_PARAMETER.CIRCLE_RADIUS
MAX_OTHER_EMOTIONS = Config.MAX_OTHER_EMOTIONS



const generateRadialPositions = (count, radius, spread_angle, start_angle) => {
	let span = spread_angle < 360 ? 1 : 0;
  let start = start_angle * Math.PI / 180;
  let rad = spread_angle * Math.PI * 2 / 360 / (count - span);
  return [...Array(count)].map((_, i) => {
    return {
      x: -Math.cos(start + rad * i) * radius,
      y: -Math.sin(start + rad * i) * radius,
    };
  });
};

export class Wheel extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      emotionSelection: {}, 
      countEmotion: 0, 
      countSelectedEmotion: 0, 
      wheelRadius: [], 
      spots: [], 
      isDialogVisible: false, 
      isOtherEmotion: false, 
      otherEmotionValue: '',
      noEmotion: false }

    this.state.countEmotion = this.props.countEmotion
    
    // Wheel radius generation 
    let radius = (Dimensions.get('window').width / 30 ) + Dimensions.get('window').width  * CIRCLE_RADIUS * 2.8
      
    // We generate a spots array for each intensity value
    let spots = generateRadialPositions(
      this.state.countEmotion,
      radius,
      360, //this.props.spreadAngle,
      100 //this.props.startAngle
    )

    this.state.emotionSelection = this.props.emotionSelection
    this.state.spots = spots

  }  

  otherEmotionModal = () => {
    if(this.props.countSelectedEmotion >= this.props.max_emotion_selection) {
      Alert.alert(DICTIONARY.WHEEL_alertWarningTitle, DICTIONARY.WHEEL_alertWarningMessage1 + this.props.max_emotion_selection + DICTIONARY.WHEEL_alertWarningMessage2)
      this.setState(
        {
          isDialogVisible: false,
        })
      return;
    } else if(this.props.countOtherEmotions() >= MAX_OTHER_EMOTIONS) {
      Alert.alert(DICTIONARY.WHEEL_alertWarningTitle, DICTIONARY.WHEEL_alertWarningMessage1 + MAX_OTHER_EMOTIONS + DICTIONARY.WHEEL_alertWarningMessage3)
      this.setState(
        {
          isDialogVisible: false,
        })
        return;
    }

    // Popup Display
    this.setState({
      isDialogVisible: true
    })

  }

  // click on the "No Emotion" button: delete all declared emotions
  clickNoEmotion = () => {
    this.props.clickNoEmotion()
    this.setState({noEmotion: true}) // only for refreshing display
  }

  displayIntensitySelection = (emotion_key) => {

    this.props.displayIntensitySelection(emotion_key)
  }

  deselectEmotionSelection = (emotion_key) => {
    
    this.props.deselectEmotionSelection(emotion_key)

  }

  addOtherEmotion = (inputText) => {

    if(this.props.countSelectedEmotion < this.props.max_emotion_selection)
    {

      this.props.addOtherEmotion(inputText)

    }

    this.setState(
      {
        isDialogVisible: false,
      }
    ) 
  }

  render() {
    return (

      <View>

        <View style={{marginTop: 120, marginBottom: 120}}>
          <TouchableOpacity
            style={globalStyles.neutralButton}
            onPress= {this.otherEmotionModal}
          ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.WHEEL_otherButton}</Text>
          </TouchableOpacity>

          <View style={styles.viewOtherEmotions}>
            <Text>{DICTIONARY.WHEEL_otherEmotion + " " + this.props.countOtherEmotions()}</Text>
            {(this.props.countOtherEmotions() > 0)? // if other emotions, display the eye icon to see the details
            <TouchableOpacity
              style={globalStyles.iconButton}
              onPress = {() => this.props.displayOtherEmotionsPanel()}>
                <FontAwesomeIcon icon={ faEye } size={25} />
              </TouchableOpacity>:<View></View>}
            
          </View>


            <DialogInput isDialogVisible={this.state.isDialogVisible}
              title={DICTIONARY.WHEEL_otherEmotionDialogTitle}
              message={DICTIONARY.WHEEL_otherEmotionDialogMessage}
              initValueTextInput = {""}
              submitInput={ (inputText) => {this.addOtherEmotion(inputText)} }
              closeDialog={ () => {this.setState({isDialogVisible: false})}}
              submitText={DICTIONARY.WHEEL_otherEmotionDialogSend}
              cancelText={DICTIONARY.WHEEL_otherEmotionCancel}
              >
              
            </DialogInput>

            <TouchableOpacity
              style={globalStyles.neutralButton}
              onPress= {this.clickNoEmotion}
            ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.WHEEL_noEmotion}</Text>
            </TouchableOpacity>


          <View>
            <Text style={{textAlign: "center"}}>
              {(this.props.noEmotion === true) ? DICTIONARY.WHEEL_noEmotion:"" /* if user clicked on "no emotion" then display "no emotion", otherwise display nothing*/}
              {this.props.isNoEmotion}
            </Text>
          </View>
        </View>
        
        {


          //Iteration over EMOTIONS
          Object.keys(this.state.emotionSelection).map((emotion_key, index) => 

              <Emotion 
                
                // Emotion data
                key = {emotion_key}
                emotion_key = { emotion_key }
                emotion_index = { index }
                tag = { EMOTIONS[emotion_key].tag }
                color = { EMOTIONS[emotion_key].color }

                // Array of selected emotions
                selection = { this.state.emotionSelection[emotion_key]}
                countSelectedEmotion = {this.props.countSelectedEmotion}
                max_emotion_selection = {this.props.max_emotion_selection}
                min_emotion_selection = {this.props.min_emotion_selection}

                // Space position 
                spots = { this.state.spots}
                
                // Passing functions
                displayIntensitySelection =  { this.props.displayIntensitySelection }
                closeIntensitySelection = { this.props.closeIntensitySelection }
                deselectEmotionSelection = { this.props.deselectEmotionSelection }
                
              />  
          )
          
        }

      </View>

    );

  }
}


const styles = StyleSheet.create ({

  manageOtherButton: {
    backgroundColor: "orange",
    margin: 3,
    padding: 5,
    alignItems: "center"
  },

  viewOtherEmotions: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: "center",
    flex: 1,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5
  }

})





