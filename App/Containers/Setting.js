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
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { showMessage } from "react-native-flash-message";
import Collapsible from 'react-native-collapsible';
import { Config } from '../config'
import { ConfigEmotions } from '../configEmotions'
import { connect } from 'react-redux'
import { storeDataAsyncStorage } from "../utils"
const globalStyles = require('../style');


// Constants 
EMOTIONS = ConfigEmotions.EMOTIONS,
INTENSITIES = Config.SELF_REPORT_PARAMETER.INTENSITY_PARAMETER
MAX_INTENSITY = Config.SELF_REPORT_PARAMETER.MAX_INTENSITY_VALUE


// Display Screen
class Setting extends Component {
  
constructor(props) {
  DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]
  super(props);

  var initial_count_emotion = Object.keys(EMOTIONS).length

  this.state = {
    count_emotion: initial_count_emotion,
    newAPIlink: Config.API_LINK,
    newAuthorizationToken: Config.AUTHORIZATION_TOKEN,
    isCollapsed: {
      "experiment_mode": true,
      "selfreports_recording": true,
      "selfreports_settings": true,
    }
  }

  
  console.log('Count_Emotion ' +this.state.count_emotion)

}

focusedScreen = this.props.navigation.addListener('willFocus', () => {
  // The screen is focused
  const action = {type: 'UPDATE_MIN_MAX'}
  this.props.dispatch(action)
})

// update min and max emotions count after getting them from Async Storage
componentDidMount() {
  const action = {type: 'UPDATE_MIN_MAX'}
  this.props.dispatch(action)
}

changeCollapsedState = (elementId) => {
  let newIsCollapsed = this.state.isCollapsed
  newIsCollapsed[elementId] = !this.state.isCollapsed[elementId]
  this.setState({ isCollapsed: newIsCollapsed });
}

setSelectedMode = (modeIndex) => {
  Config.SELECTED_MODE = modeIndex // 0: individual / 1: experiment
  Config.RUNNING_EXPERIMENT_TITLE = "" // reinitializing
  this.setState({ lastRefresh: Date(Date.now()).toString() }) // only for refreshing display
  
  // Save to Async storage
  storeDataAsyncStorage('@mode_index', "" + modeIndex)
}

setSubjectsIdentificationMode = (identificationModeIndex) => {
  Config.SUBJECTSIDENTIFICATION_MODE = identificationModeIndex // 0: auto-increment / 1: manual
  this.setState({ lastRefresh: Date(Date.now()).toString() })  // only for refreshing display
  
  // Save to Async storage
  storeDataAsyncStorage('@identification_mode_index', "" + identificationModeIndex)
}

setSaveMode = (saveModeIndex) => {
  Config.SAVE_MODE = saveModeIndex // 0: save data locally / 1: save online (API)
  this.setState({ lastRefresh: Date(Date.now()).toString() })  // only for refreshing display
  
  // Save to Async storage
  storeDataAsyncStorage('@save_mode', "" + saveModeIndex)
}

onChangeAPIlink = (textValue) => {
  this.setState({newAPIlink: textValue})
}

onChangeAuthorizationToken = (textValue) => {
  this.setState({newAuthorizationToken: textValue})
}

validateChangesAPIlink = (newAPIlink) => {
  Config.API_LINK = newAPIlink
  storeDataAsyncStorage('@api_link', newAPIlink)
  showMessage({
    message: DICTIONARY.SETTING_changesSaved,
    type: "success",
  });
}

validateChangesAuthorizationToken = (newAuthorizationToken) => {
  Config.AUTHORIZATION_TOKEN = newAuthorizationToken
  storeDataAsyncStorage('@authorization_token', newAuthorizationToken)
  showMessage({
    message: DICTIONARY.SETTING_changesSaved,
    type: "success",
  });
}

incrementMaxEmotionSelectionNumber = () => {

  if(this.props.MAX_EMOTION_SELECTION < this.state.count_emotion)
  {
    storeDataAsyncStorage('@max_emotion_selection', "" + (this.props.MAX_EMOTION_SELECTION + 1))
    Config.SELF_REPORT_PARAMETER.INITIAL_MAX_EMOTION_SELECTION = this.props.MAX_EMOTION_SELECTION + 1
    const action = { type: "INCREMENT_MAX"}
    this.props.dispatch(action)
  }

}

decrementMaxEmotionSelectionNumber = () => {

  if(this.props.MAX_EMOTION_SELECTION > this.props.MIN_EMOTION_SELECTION)
  {
    storeDataAsyncStorage('@max_emotion_selection', "" + (this.props.MAX_EMOTION_SELECTION - 1))
    Config.SELF_REPORT_PARAMETER.INITIAL_MAX_EMOTION_SELECTION = this.props.MAX_EMOTION_SELECTION - 1
    const action = { type: "DECREMENT_MAX"}
    this.props.dispatch(action)
  }
}

incrementMinEmotionSelectionNumber = () => {

  if(this.props.MIN_EMOTION_SELECTION < this.state.count_emotion)
  {
    if(this.props.MIN_EMOTION_SELECTION < this.props.MAX_EMOTION_SELECTION)
    {
      storeDataAsyncStorage('@min_emotion_selection', "" + (this.props.MIN_EMOTION_SELECTION + 1))
      Config.SELF_REPORT_PARAMETER.INITIAL_MIN_EMOTION_SELECTION = this.props.MIN_EMOTION_SELECTION + 1
      const action = { type: "INCREMENT_MIN"}
      this.props.dispatch(action)
    }
  }
}

decrementMinEmotionSelectionNumber = () => {

  if (this.props.MIN_EMOTION_SELECTION > 0) {
    storeDataAsyncStorage('@min_emotion_selection', "" + (this.props.MIN_EMOTION_SELECTION - 1))
    Config.SELF_REPORT_PARAMETER.INITIAL_MIN_EMOTION_SELECTION = this.props.MIN_EMOTION_SELECTION - 1
    const action = { type: "DECREMENT_MIN"}
    this.props.dispatch(action)
  }
  
}

setLanguage = (label) => {
  var found = false;
  var i = 0;
  while (!found && i < Config.LANGUAGES_NUMBER) {
    if (Config.LANGUAGES[i] == label) {
      found = true;
      Config.SELECTED_LANGUAGE = Config.LANGUAGES[i]
      DICTIONARY = Config.DICTIONARY[label]
      // Update navigation title
      this.props.navigation.setParams({title: DICTIONARY.NAVIGATION_settingTitle})

      // Save to Async storage
      storeDataAsyncStorage('@language_label', label)

      // Translate chosen color label because it doesn't update automatically
      if (ConfigEmotions.selectedColorIndex == 0) {
        ConfigEmotions.selectedColor = DICTIONARY.SETTING_greyLevels
      } else {
        ConfigEmotions.selectedColor = DICTIONARY.SETTING_color
      }

      this.setState({ lastRefresh: Date(Date.now()).toString() })  // only for refreshing display
    }
    ++i;
  }
}

setEmotionColors = (colorIndex) => {
  ConfigEmotions.selectedColorIndex = colorIndex // 0: grey levels / 1: colors
  this.setState({ lastRefresh: Date(Date.now()).toString() })  // only for refreshing display
  
  // Save to Async storage
  storeDataAsyncStorage('@color_index', "" + colorIndex)
}

render() {

  return (
    <SafeAreaView style = {styles.containerStyle}>

      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style = {styles.containerStyle} >

        <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => this.changeCollapsedState("experiment_mode")}>
          <Text style={globalStyles.h2Style}>
            <FontAwesomeIcon icon={ this.state.isCollapsed["experiment_mode"]? faAngleDown : faAngleUp } size={20} margin={10} />
            {"  "}{DICTIONARY.SETTING_experimentMode}</Text>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.isCollapsed["experiment_mode"]}>

          <Text style = {globalStyles.textStyle} >{DICTIONARY.SETTING_selectedMode}<Text style={{fontWeight: 'bold'}}>{(Config.SELECTED_MODE==0?DICTIONARY.SETTING_individualMode:DICTIONARY.SETTING_experimentationMode)}</Text></Text>

          <View style={globalStyles.settingButtonsStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {() => this.setSelectedMode(0)} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_individualMode}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress={() => this.setSelectedMode(1)} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_experimentationMode}</Text>
            </TouchableOpacity>
          </View>

          {(Config.SELECTED_MODE==1? // if experimentation mode, diplay one more setting
          <View>
            <Text style = {globalStyles.textStyle} >{DICTIONARY.SETTING_subjectsIdentification} <Text style={{fontWeight: 'bold'}}>{(Config.SUBJECTSIDENTIFICATION_MODE==0?DICTIONARY.SETTING_autoincrementIdentification:DICTIONARY.SETTING_manualIdentification)}</Text></Text>
            
            <View style={globalStyles.settingButtonsStyle}>
              <TouchableOpacity
                  style={globalStyles.neutralButton}
                  onPress= {() => this.setSubjectsIdentificationMode(0)} 
                ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_autoincrementIdentification}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={globalStyles.neutralButton}
                  onPress={() => this.setSubjectsIdentificationMode(1)} 
                ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_manualIdentification}</Text>
              </TouchableOpacity>
            </View>
          </View>
          :
          <View></View>
          )}

        </Collapsible>



        <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => this.changeCollapsedState("selfreports_recording")}>
          <Text style={globalStyles.h2Style}>
            <FontAwesomeIcon icon={ this.state.isCollapsed["selfreports_recording"]? faAngleDown : faAngleUp } size={20} margin={10} />
            {"  "}{DICTIONARY.SETTING_selfreportRecordings}</Text>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.isCollapsed["selfreports_recording"]}>          

          <Text style = {globalStyles.textStyle} >{DICTIONARY.SETTING_saveMode}<Text style={{fontWeight: 'bold'}}> {(Config.SAVE_MODE==0?DICTIONARY.SETTING_saveModeLocal:DICTIONARY.SETTING_saveModeAPI)} </Text></Text>
          <View style={globalStyles.settingButtonsStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {() => this.setSaveMode(0)} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_saveModeLocal}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {() => this.setSaveMode(1)} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_saveModeAPI}</Text>
            </TouchableOpacity>
          </View>


          {(Config.SAVE_MODE==1? // if API mode, diplay settings for API link and authorization token
            <View>
              <Text style = {globalStyles.textStyle} >{DICTIONARY.SETTING_APILink}</Text>
              
              <View style={{flexDirection: "row", justifyContent: 'space-between', paddingRight: 10}}>
                <TextInput
                  style={[globalStyles.inputStyle, {flex:11}]}
                  onChangeText={this.onChangeAPIlink}
                  value={this.state.newAPIlink}
                  placeholder={"https://api.example.com/emotion_records"}
                />
                <TouchableOpacity
                  style={[globalStyles.iconButton, {marginTop: 13, marginBottom: 13, paddingTop: 9, flex:1}]}
                  onPress={() => this.validateChangesAPIlink(this.state.newAPIlink) } >
                  <FontAwesomeIcon icon={ faCheckCircle } size={20} color="green" />
                </TouchableOpacity>
              </View>

              <Text style = {globalStyles.textStyle} >{DICTIONARY.SETTING_APItoken}</Text>
              
              <View style={{flexDirection: "row", justifyContent: 'space-between', paddingRight: 10}}>
                <TextInput
                  style={[globalStyles.inputStyle, {flex:11}]}
                  onChangeText={this.onChangeAuthorizationToken}
                  value={this.state.newAuthorizationToken}
                  placeholder={"eyJhbGciOiJIUzI1NiIsInR5cCI6I.kpXVCZi..."}
                />
                <TouchableOpacity
                  style={[globalStyles.iconButton, {marginTop: 13, marginBottom: 13, paddingTop: 9, flex:1}]}
                  onPress={() => this.validateChangesAuthorizationToken(this.state.newAuthorizationToken) } >
                  <FontAwesomeIcon icon={ faCheckCircle } size={20} color="green" />
                </TouchableOpacity>
              </View>

            </View>
            :
            <View></View>
          )}
        </Collapsible>
          


        <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => this.changeCollapsedState("selfreports_settings")}>
          <Text style={globalStyles.h2Style}>
            <FontAwesomeIcon icon={ this.state.isCollapsed["selfreports_settings"]? faAngleDown : faAngleUp } size={20} margin={10} />
            {"  "}{DICTIONARY.SETTING_selfreportSettings}</Text>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.isCollapsed["selfreports_settings"]}>  

          <Text style = {globalStyles.textStyle} >{DICTIONARY.SETTING_nbEmotionsMax}<Text style={{fontWeight: 'bold'}}>{this.props.MAX_EMOTION_SELECTION} </Text></Text>
          <View style={globalStyles.settingButtonsStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {this.decrementMaxEmotionSelectionNumber} 
              ><Text style={globalStyles.neutralButtonText}>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {this.incrementMaxEmotionSelectionNumber} 
              ><Text style={globalStyles.neutralButtonText}>+1</Text>
            </TouchableOpacity>
          </View>


          <Text style = {globalStyles.textStyle} >{DICTIONARY.SETTING_nbEmotionsMin}<Text style={{fontWeight: 'bold'}}>{this.props.MIN_EMOTION_SELECTION} </Text></Text>

          <View style={globalStyles.settingButtonsStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {this.decrementMinEmotionSelectionNumber} 
              ><Text style={globalStyles.neutralButtonText}>-1</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {this.incrementMinEmotionSelectionNumber} 
              ><Text style={globalStyles.neutralButtonText}>+1</Text>
            </TouchableOpacity>
          </View>


          <Text style = {globalStyles.textStyle} >{DICTIONARY.SETTING_selectedColors}<Text style={{fontWeight: 'bold'}}>{(ConfigEmotions.selectedColorIndex==0?DICTIONARY.SETTING_greyLevels:DICTIONARY.SETTING_color)}</Text></Text>

          <View style={globalStyles.settingButtonsStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {() => this.setEmotionColors(0)} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_greyLevels}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress={() => this.setEmotionColors(1)} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_color}</Text>
            </TouchableOpacity>
          </View>


          <Text style = {globalStyles.textStyle} >{DICTIONARY.SETTING_selectedLanguage}<Text style={{fontWeight: 'bold'}}>{Config.SELECTED_LANGUAGE} </Text></Text>

          <View style={globalStyles.settingButtonsStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress={() => this.setLanguage("English")} 
              ><Text style={globalStyles.neutralButtonText}>{Config.LANGUAGES[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress={() => this.setLanguage("Français")} 
              ><Text style={globalStyles.neutralButtonText}>{Config.LANGUAGES[1]}</Text>
            </TouchableOpacity>
          </View>

        </Collapsible>



          <View style={[globalStyles.endPageButtonStyle, {marginTop: 30, marginBottom: 0}]}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress={() => this.props.navigation.navigate('WheelSettings')} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_wheelSettingsButton}</Text>
            </TouchableOpacity>
          </View>


          <View style={globalStyles.endPageButtonStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress={() => this.props.navigation.navigate('Home')} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_backButton}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    MAX_EMOTION_SELECTION: state.MAX_EMOTION_SELECTION,
    MIN_EMOTION_SELECTION: state.MIN_EMOTION_SELECTION,
    SELECTED_LANGUAGE: state.SELECTED_LANGUAGE
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => { dispatch(action) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Setting)


const styles = StyleSheet.create({

  containerStyle:{
    flex: 1,
  },

});






