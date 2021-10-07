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
import { View, Text, Alert, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { Wheel } from '../Component/Wheel'
import { Intensity } from '../Component/Intensity'
import { OtherEmotionsDisplay } from '../Component/OtherEmotionsDisplay'
import { showMessage } from "react-native-flash-message";
import RNFetchBlob from 'rn-fetch-blob'
import { connect } from 'react-redux'
import { Config } from '../config'
import { ConfigEmotions } from '../configEmotions'
import { getFilePath, askPermissionWriteFile, storeDataAsyncStorage } from "../utils"
import { config } from '@fortawesome/fontawesome-svg-core'
var RNFS = require('react-native-fs')
const globalStyles = require('../style');

// Constants 
INTENSITIES = Config.SELF_REPORT_PARAMETER.INTENSITY_PARAMETER
MAX_INTENSITY = Config.SELF_REPORT_PARAMETER.MAX_INTENSITY_VALUE
MAX_OTHER_EMOTIONS = Config.MAX_OTHER_EMOTIONS

// Display
class SelfReport extends Component {
 
  
constructor(props) {
  super(props);

  DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]
  EMOTIONS = ConfigEmotions.EMOTIONS
  LIST_EMOTION_LABELS = "Conditions:,Emotions:"
  NB_EMOTIONS = Object.keys(DICTIONARY.EMOTION_LABELS).length
  CSV_HEADER_INDIVIDUAL = "timestamp,"
  for (var i = 0 ; i < NB_EMOTIONS ; i++) {
    LIST_EMOTION_LABELS += "," + DICTIONARY.EMOTION_LABELS[i].replace("\n","")
    CSV_HEADER_INDIVIDUAL += "em" + i + ","
  }
  CSV_HEADER_EXPERIMENT = LIST_EMOTION_LABELS + "," + (ConfigEmotions.selectedColorIndex == 0? DICTIONARY.SETTING_greyLevels : DICTIONARY.SETTING_color) + "\n" + "subject-id," + CSV_HEADER_INDIVIDUAL + "other1-label,other1-intensity,other2-label,other2-intensity,no-emotion,comment"
  CSV_HEADER_INDIVIDUAL = LIST_EMOTION_LABELS + "\n" + CSV_HEADER_INDIVIDUAL + "other1-label,other1-intensity,other2-label,other2-intensity,no-emotion"

    this.state = { 
      emotionSelection: {},
      countEmotion: 0, 
      countSelectedEmotion: 0,
      noEmotion: false,
      isOtherEmotion: false,
      otherEmotionsList: {},
      otherEmotionValue: '',
      otherEmotionIntensity: 0,
      dialogInitValue: "",
      isModifyingOtherEmotion: false,
      isWheelVisible: true,
      isIntensitySelectionVisible: false,
      isOtherEmotionsPanelVisible: false,
      currentSelectedEmotionKey: '',
      isCurrentSelectedOtherEmotion: false,
      isReplaceOtherEmotion: false,
    }

    for(var emotion in EMOTIONS)
    {
        this.state.emotionSelection[emotion] = -1;
        this.state.countEmotion = this.state.countEmotion + 1 ;
    }
  }

    // update min and max emotions count after getting them from Async Storage
  componentDidMount() {
    const action = {type: 'UPDATE_MIN_MAX'}
    this.props.dispatch(action)
  }

  focusedScreen = this.props.navigation.addListener('willFocus', () => {
    // The screen is focused
    this.setState({ lastRefresh: Date(Date.now()).toString() }) // update rendering
  });
  
  componentWillUnmount() {
    this.focusedScreen.remove();
  }

  updateSelfReport = (newEmotionSelection, newCountSelectedEmotion, newIsOtherEmotion, newOtherEmotionValue) => {

    this.setState(Object.assign(this.state.emotionSelection,newEmotionSelection));
    this.setState({
      countSelectedEmotion : newCountSelectedEmotion,
      isOtherEmotion : newIsOtherEmotion,
      otherEmotionValue : newOtherEmotionValue
    })

  }

  deselectEmotionSelection = (key) => {

    let newEmotionSelection = this.state.emotionSelection
    newEmotionSelection[key] = -1
    this.setState(Object.assign(this.state.emotionSelection,newEmotionSelection));
    this.updateCountSelectedEmotion()
    
  }

  countOtherEmotions = () => {
    return Object.keys(this.state.otherEmotionsList).length
  }

  updateCountSelectedEmotion = () => {
    let count = 0
    // count emotions from emotion list
    for(var emotion in EMOTIONS)
    {
      if (this.state.emotionSelection[emotion] > -1)
      {
        count += 1
      }
    }

    // count emotions from other emotions list
    count += this.countOtherEmotions()

    this.setState({countSelectedEmotion : count})
  }

  updateEmotionSelection = (key, intensity) => {
    
    // Close intensity panel 
    this.setState(
      {
        isWheelVisible: true,
        isIntensitySelectionVisible: false,
        noEmotion: false
      })

    // Check if the current selection is "other" emotion
    if(this.state.isCurrentSelectedOtherEmotion){
      this.setState(
        {
          isCurrentSelectedOtherEmotion: false,
          otherEmotionIntensity: intensity,
        })
        this.state.otherEmotionsList[this.state.otherEmotionValue] = intensity
        console.log("OTHEREMOTIONSLIST")
        console.log(this.state.otherEmotionsList)

        this.updateCountSelectedEmotion()

    } else {
      
      // Emotion selection values
      let newEmotionSelection = this.state.emotionSelection
      newEmotionSelection[key] = intensity
  
      // Update emotion count
      this.updateCountSelectedEmotion()

      this.setState(Object.assign(this.state.emotionSelection,newEmotionSelection));

    }

  }

  clearEmotionsStatus = () => {
    this.setState({noEmotion: false})
    this.setState({isOtherEmotion: false})
    this.setState({otherEmotionsList: {}})
    this.setState({otherEmotionValue: ''})
    this.setState({otherEmotionIntensity: -1})

    this.deleteOtherEmotion()
    
    for(var emotion in EMOTIONS)
    {
      this.state.emotionSelection[emotion] = -1
    }

    this.setState({countSelectedEmotion: 0})
  }

  // Click on "No Emotion" button: delete all declared emotions
  clickNoEmotion = () => {
    this.clearEmotionsStatus()
    this.setState({noEmotion: true})
  }


  createSaveTxt = async(listEmotion) => {
    console.log('createSaveTxt')
    console.log('------------------------------------------')
    console.log(listEmotion)


    var selfreportDate = this.getSelfreportDate()
    var dateFilePath = selfreportDate.split(":").join("-")

    var granted = false
    await askPermissionWriteFile().then((status) => {
      granted = status
    })

    if (granted) {
      var path = getFilePath(dateFilePath) // ":" are not accepted in path names by RNFS

      // if the file doesn't exist (either if we are in individual mode or if we are starting a new experiment), create it with the right CSV header
      var exists = false
      await RNFS.exists(path).then((status) => {
        exists = status
      })
      if(!exists) {  // if the file doesn't exist, create it
        console.log("Creating file with headers...")
        await RNFS.writeFile(path, Config.SELECTED_MODE == 0? CSV_HEADER_INDIVIDUAL : CSV_HEADER_EXPERIMENT, 'utf8')
        .then((success) => {
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });
      } 

      var subjectID = this.getSubjectId()

      if (Config.SELECTED_MODE == 1) // if experiment mode, we have a subject ID (else no column for that so no comma)
        subjectID += ","

      await RNFS.appendFile(path, "\n" + subjectID + selfreportDate + "," + listEmotion.toString(), 'utf8')

      this.clearEmotionsStatus()

      this.displaySaveSuccessMessage()
    }
    else {
      Alert.alert(DICTIONARY.SELFREPORT_alertNotSavedTitle, DICTIONARY.SELFREPORT_alertNotSavedMessage)
    }
  }

  otherEmotionsListToString = () => {
    var otherEmotionsString = ""

    var first = true;
    for (var emotion in this.state.otherEmotionsList) {
      // check if the property/key is defined in the object itself, not in parent
      if (this.state.otherEmotionsList.hasOwnProperty(emotion)) {
        var intensity = this.state.otherEmotionsList[emotion]
        if (!first) otherEmotionsString += ","
        else first = false
        otherEmotionsString += emotion.toLowerCase() + ',' + intensity
      }
    }

    // add commas at the end to match the CSV header
    if (this.countOtherEmotions() == 0)
      otherEmotionsString += ",,,"
    else if (this.countOtherEmotions() == 1)
      otherEmotionsString += ",,"

    // add no-emotion (0 or 1) at the end
    otherEmotionsString += "," + (this.state.noEmotion?1:0)
    return otherEmotionsString
  }

saveSelfReport = () => {

  // add predefined selected emotions to self report
  if((this.state.countSelectedEmotion) >= this.props.MIN_EMOTION_SELECTION || this.state.noEmotion)
  {
    if (Config.SAVE_MODE == 0)
      this.saveSelfReportLocal()
    else
      this.saveSelfReportOnline()
  }
  else{
    Alert.alert(DICTIONARY.SELFREPORT_alertWarningTitle, DICTIONARY.SELFREPORT_alertWarningMessage1 + this.props.MIN_EMOTION_SELECTION + DICTIONARY.SELFREPORT_alertWarningMessage2)
  }

}


saveSelfReportLocal = () => {
  var listEmotion = []
  for(var emotion in EMOTIONS)
  {
    listEmotion.push(this.state.emotionSelection[emotion])
  }
  console.log('isOtherEmotion ' + this.state.isOtherEmotion)

  // list of "Other" emotions
  listEmotion.push(this.otherEmotionsListToString())

  this.createSaveTxt(listEmotion)
}


getSelfreportDate = () => {
  var now = new Date();
  var _selfreportDate = now.getFullYear() + "_" + parseInt(now.getMonth()+1) + "_" + now.getDate() + "_" + now.getHours() + ":" + now.getMinutes() + ':' + now.getSeconds()
  this.setState({selfreportDate: _selfreportDate})
  return _selfreportDate
}


getSubjectId = () => { // BE CAREFUL to call this function only once for each report, since it updates subjectID for next report (if auto-increment)
    var subjectID = ""
      if (Config.SELECTED_MODE == 1 && Config.SUBJECTSIDENTIFICATION_MODE == 0) { // if experiment mode and auto-increment for subjects IDs
          subjectID = Config.EVALUATED_SUBJECT_ID_AUTO
          Config.EVALUATED_SUBJECT_ID_AUTO += 1 // increment each time we save a report
      }

      else if (Config.SELECTED_MODE == 1 && Config.SUBJECTSIDENTIFICATION_MODE == 1) // if experiment mode and manual subjects IDs
        subjectID = Config.EVALUATED_SUBJECT_ID_MANUAL // keep subject ID chosen by user

      return subjectID
  }



  saveSelfReportOnline = async() => {
    var selfreportDate = this.getSelfreportDate()

    var JSONcontent = this.createJSONContent(selfreportDate)
    var JSONkey = this.createJSONKey(selfreportDate)

    var savingSuccess = await this.uploadJSONtoAPI(JSONkey, JSONcontent)

    // if success
    if (savingSuccess)
      this.displaySaveSuccessMessage()
    else
      showMessage({
        message: DICTIONARY.SELFREPORT_messageAPIError,
        type: "danger"
      });
  }


  createJSONKey = (selfreportDate) => {
  var JSONkey = ""

  if (Config.SELECTED_MODE == 0) // if individual mode
    JSONkey = Config.USER_ID + "_" + selfreportDate
    
  else // if experiment mode
    JSONkey = Config.RUNNING_EXPERIMENT_TITLE + "_" + Config.USER_ID + "_" + selfreportDate

  return JSONkey
}


createJSONContent = (selfreportDate) => {
  var JSONcontent = {}
  if (Config.SELECTED_MODE == 1) // if experiment mode, add subject-id and experiment-id
  {
    JSONcontent["experiment-title"] = Config.RUNNING_EXPERIMENT_TITLE
    JSONcontent["subject-id"] = this.getSubjectId()
  }

  // the other columns are available for each mode (individual or experiment)
  JSONcontent["timestamp"] = selfreportDate
  var i = 0

  // normal emotions
  for(var emotion in EMOTIONS)
  {
    JSONcontent["em" + i] = this.state.emotionSelection[emotion]
    ++i
  }

  // other emotions : if there is no other2-label and intensity, the keys will not be added to the JSON file
  i = 1
  for (var otherEmotion in this.state.otherEmotionsList) {
    // check if the property/key is defined in the object itself, not in parent
    if (this.state.otherEmotionsList.hasOwnProperty(otherEmotion)) {
      var intensity = this.state.otherEmotionsList[otherEmotion]
      JSONcontent["other" + i + "-label"] = otherEmotion.toLowerCase()
      JSONcontent["other" + i + "-intensity"] = intensity
    }
    ++i
  }

  // add no-emotion (0 or 1) at the end
  JSONcontent["no-emotion"] = this.state.noEmotion?1:0

  return JSONcontent
}


uploadJSONtoAPI = async (JSONkey, JSONcontent) => {
  var url = Config.API_LINK
  var token = Config.AUTHORIZATION_TOKEN

  var requestSuccess = false

  // POST JSON key
  try {
    var response = await RNFetchBlob.config({
      trusty : true // allows unsafe URLs
    })
    .fetch('POST', url, token != ""?{Authorization : 'Bearer ' + token}:{}, JSON.stringify({"_key": JSONkey}))

    var json = await response.json();
    if (response.respInfo.status == 200 || response.respInfo.status == 201) {
      requestSuccess = true
      Config.lastJSONkeyPosted = JSONkey
    }
    else {
      console.log("An error occured while POSTing JSON key to API: code " + response.respInfo.status)
      Alert.alert(DICTIONARY.SELFREPORT_alertErrorPostAPITitle, DICTIONARY.SELFREPORT_alertErrorPostAPIMessage + response.respInfo.status)
    }
  } catch (error) {
    console.log("An error occured while POSTing JSON key to API (step 1)")
    console.error(error);
    requestSuccess = false
  }

  // UPDATE entry with JSON content
  if (requestSuccess)
  {
    requestSuccess = false
    try {
      var response = await RNFetchBlob.config({
        trusty : true // allows unsafe URLs
      })
      .fetch('PATCH', url + "/" + JSONkey, token != ""?{Authorization : 'Bearer ' + token}:{}, JSON.stringify(JSONcontent))

      var json = await response.json();
      if (response.respInfo.status == 200 || response.respInfo.status == 201)
        requestSuccess = true
      else {
        console.log("An error occured while PATCHing JSON content to API: code " + response.respInfo.status)
        Alert.alert(DICTIONARY.SELFREPORT_alertErrorPatchAPITitle, DICTIONARY.SELFREPORT_alertErrorPatchAPIMessage + response.respInfo.status)
      }
    } catch (error) {
      console.log("Posting JSON key to API worked, but an error occured while PATCHing JSON content to API (step 2)")
      console.error(error);
      requestSuccess = false
    }
  }

  return requestSuccess
}



displaySaveSuccessMessage = () => {
  if (Config.DISPLAY_ALERT_SAVE) {
    Alert.alert(DICTIONARY.SELFREPORT_alertSaveTitle, DICTIONARY.SELFREPORT_alertSaveMessage)
    Config.DISPLAY_ALERT_SAVE = false
    storeDataAsyncStorage('@display_alert_save', "false")
  }
  else {
    showMessage({
      message: DICTIONARY.SELFREPORT_messageSavedSuccessful,
      type: "success",
    });
  }
}


// Intensity selection 

displayIntensitySelection = (emotion_key) => {
  this.setState(
    {
      isWheelVisible: false,
      isIntensitySelectionVisible: true,
      currentSelectedEmotionKey: emotion_key
    }
  )
}

closeIntensitySelection = () => {
  this.setState(
    {
      isWheelVisible: true,
      isIntensitySelectionVisible: false,
    }
  )
}

displayOtherEmotionsPanel = () => {
  this.setState({
    isWheelVisible: false,
    isOtherEmotionsPanelVisible: true
  })
}

closeOtherEmotionsPanel = () => {
  this.setState(
    {
      isWheelVisible: true,
      isOtherEmotionsPanelVisible: false,
    }
  )
}

addOtherEmotion = (inputText) => {
  
  this.setState({noEmotion: false})

  console.log('addOtherEmotion')
  console.log(inputText)
  if(inputText.length > 0)
  {
    // If first other emotion selection
    if(this.state.isOtherEmotion == false)
    {
      this.setState({
        isOtherEmotion: true,
        otherEmotionValue: inputText,
        isDialogVisible: false,
        isWheelVisible: false,
        isIntensitySelectionVisible: true,
        isCurrentSelectedOtherEmotion:true
      })
    }
    else 
    {
      this.setState({
        isOtherEmotion: true,
        otherEmotionValue: inputText,
        isDialogVisible: false,
        isWheelVisible: false,
        isIntensitySelectionVisible: true,
        isCurrentSelectedOtherEmotion: true,
        isReplaceOtherEmotion: true
      })

    }

  }
}

// if "emotion" not set will delete all other emotions
deleteOtherEmotion = (emotion) => {

  if(emotion) {
    console.log("DELETE " + emotion)
    // remove "emotion" from list if exists
      delete this.state.otherEmotionsList[emotion];

  }

  else { // if "emotion" not set, delete all other emotions
    console.log("DELETE ALL EMOTIONS")
    if(this.state.isOtherEmotion == false)
    {
      this.setState({
        isDialogVisible: false,
        otherEmotionsList: {},
        otherEmotionValue: '',
      })

    }
    else
    {
      this.setState({
        isDialogVisible: false,
        isOtherEmotion: false,
        isReplaceOtherEmotion: false,
        otherEmotionsList: {},
        otherEmotionValue: '',
      })
    }
  }

  // if no emotion left in "other emotions" list, then register it so the "other emotions" label disappears
  if (Object.keys(this.state.otherEmotionsList).length == 0) {
    this.setState({isOtherEmotion: false})
  }

  this.updateCountSelectedEmotion()
}

editOtherEmotion = (emotion) => {
  this.setState({
    isDialogVisible: true,
    dialogInitValue: emotion,
    isModifyingOtherEmotion: true,
    otherEmotionValue: emotion
  })
}

confirmEditOtherEmotion = (formerEmotionLabel, newEmotionLabel) => {
  console.log("CONFIRM EDIT " + formerEmotionLabel + " TO " + newEmotionLabel)

  if (!newEmotionLabel) { // emotion label was deleted, so delete emotion from "other" list
    this.deleteOtherEmotion(formerEmotionLabel)
  }
  else { // edit emotion in "other" list
    this.setState({
      isDialogVisible: false,
      dialogInitValue: "",
      otherEmotionValue: newEmotionLabel,
      isWheelVisible: false,
      isOtherEmotionsPanelVisible: false,
      isIntensitySelectionVisible: true, // then, select intensity
      isCurrentSelectedOtherEmotion:true
    })

    this.state.otherEmotionsList[newEmotionLabel] = this.state.otherEmotionsList[formerEmotionLabel];
    delete this.state.otherEmotionsList[formerEmotionLabel];
  }
}

showExperimentatorSettings (event) {
  event.preventDefault();
  console.log("Open Menu")
}


render() {

  return (
    <SafeAreaView style={
      {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#cccccc'
      }
    }>

        {(Config.SELECTED_MODE == 1 && Config.RUNNING_EXPERIMENT_TITLE == "")? // if experiment mode and no experiment title specified, don't display the wheel but a message to enter new experiment title
        <Text  style = {globalStyles.textStyle} >{DICTIONARY.SELFREPORT_noRunningExperiment + "\n\n" + DICTIONARY.SELFREPORT_startExperimentInstructions}</Text>

        :
  
        (Config.SELECTED_MODE == 1 && Config.SUBJECTSIDENTIFICATION_MODE == 1 && Config.EVALUATED_SUBJECT_ID_MANUAL == "")? // if experiment mode, manual mode for subjects' IDs and no subject ID specified, message to ask entering a new subject ID
        <Text  style = {globalStyles.textStyle} >{DICTIONARY.SELFREPORT_noSubjectSpecified + "\n\n" + DICTIONARY.SELFREPORT_specifySubjectInstruction + "\n\n" + DICTIONARY.SELFREPORT_changeSubjectModeInstruction}</Text>

          :
        
        <View>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style= {styles.textContainerStyle}>

              {this.state.isWheelVisible?( // then show instructions for the wheel
                this.props.MAX_EMOTION_SELECTION === this.props.MIN_EMOTION_SELECTION ?
                <Text >{DICTIONARY.SELFREPORT_instructionsBeginning1}{this.props.MAX_EMOTION_SELECTION}{DICTIONARY.SELFREPORT_instructionsEnd}{"\n"}</Text>
                :
                <Text>{DICTIONARY.SELFREPORT_instructionsBeginning2}{this.props.MIN_EMOTION_SELECTION}{DICTIONARY.SELFREPORT_instructionsAnd}{this.props.MAX_EMOTION_SELECTION}{DICTIONARY.SELFREPORT_instructionsEnd}{"\n"}</Text>)
              : // else show instructions for the intensity
              ( <Text>{DICTIONARY.INTENSITY_selectIntensity}{"\n"}</Text>)
              }
                


              <Text>
                {DICTIONARY.SELFREPORT_nbSelectedEmotions}{this.state.countSelectedEmotion }
              </Text>
            </View>

            <View 
              style={
                {
                  flex: 1,
                  alignItems:'center',
                  justifyContent: 'center'
                }
              }
              >

                {
                  this.state.isWheelVisible &&
                    <Wheel 
                      max_emotion_selection = {this.props.MAX_EMOTION_SELECTION}
                      min_emotion_selection = {this.props.MIN_EMOTION_SELECTION}
                      emotionSelection = {this.state.emotionSelection}
                      countEmotion = {this.state.countEmotion }
                      countSelectedEmotion = {this.state.countSelectedEmotion}
                      noEmotion = {this.state.noEmotion}
                      
                      // Other emotion variables
                      isOtherEmotion = {this.state.isOtherEmotion}
                      otherEmotionValue = {this.state.otherEmotionValue}
                      otherEmotionIntensity = {this.state.otherEmotionIntensity}
                      otherEmotionsList = {this.state.otherEmotionsList}
                      isModifyingOtherEmotion = {this.state.isModifyingOtherEmotion}
                      isOtherEmotionsPanelVisible = {this.state.isOtherEmotionsPanelVisible}

                      // Passing functions
                      addOtherEmotion = { this.addOtherEmotion}
                      updateSelfReport = { this.updateSelfReport}
                      deselectEmotionSelection = {this.deselectEmotionSelection}
                      updateSelfReportOtherEmotion = { this.updateSelfReportOtherEmotion}
                      displayIntensitySelection =  { this.displayIntensitySelection }
                      clickNoEmotion =  { this.clickNoEmotion }
                      countOtherEmotions = { this.countOtherEmotions }
                      displayOtherEmotionsPanel = { this.displayOtherEmotionsPanel }
                      
                    />
                }
                {
                    
                    this.state.isIntensitySelectionVisible &&
                    <Intensity
                      currentSelectedEmotionKey = { this.state.currentSelectedEmotionKey}
                      isCurrentSelectedOtherEmotion =  { this.state.isCurrentSelectedOtherEmotion}
                      otherEmotionIntensity =  { this.state.otherEmotionIntensity}

                      // Passing functions 
                      updateEmotionSelection = { this.updateEmotionSelection}
                      closeIntensitySelection = { this.closeIntensitySelection}
                    />
                }
                {
                    
                    this.state.isOtherEmotionsPanelVisible &&
                    <OtherEmotionsDisplay

                      // Other emotion variables
                      otherEmotionsList = {this.state.otherEmotionsList}
                      dialogInitValue = {this.state.dialogInitValue}
                      isOtherEmotionsPanelVisible = {this.state.isOtherEmotionsPanelVisible}
                      
                      // Passing functions 
                      closeOtherEmotionsPanel = { this.closeOtherEmotionsPanel}
                      countOtherEmotions = { this.countOtherEmotions }
                      deleteOtherEmotion = { this.deleteOtherEmotion}
                      editOtherEmotion = { this.editOtherEmotion}
                      confirmEditOtherEmotion = {this.confirmEditOtherEmotion}
                    />
                }
              
            </View>
      
        </ScrollView>


        <View style= {globalStyles.endPageButtonStyle}>
          <TouchableOpacity
              style={globalStyles.neutralButton}
              onPress= {this.saveSelfReport}
            ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SELFREPORT_validateButton}</Text>
          </TouchableOpacity>
        </View>
      </View>
    }

  </SafeAreaView>

  );
}
}


const mapStateToProps = (state) => {
  return {
    MAX_EMOTION_SELECTION: state.MAX_EMOTION_SELECTION,
    MIN_EMOTION_SELECTION: state.MIN_EMOTION_SELECTION
  }
}



export default connect(mapStateToProps)(SelfReport)

const styles = StyleSheet.create({

  buttonStyle: {
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  textContainerStyle:{
    padding: 20,
    marginBottom: 10
  },
  
});


