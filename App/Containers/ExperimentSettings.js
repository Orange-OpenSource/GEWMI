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
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import { showMessage } from "react-native-flash-message";
import { Config } from '../config'
import { storeDataAsyncStorage, getFilePath, askPermissionWriteFile } from "../utils"
var RNFS = require('react-native-fs')
const globalStyles = require('../style');


// Display
export default class ExperimentSettings extends Component {
  
constructor(props) {
  DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]
  super(props);


  this.state = {
    experimentTitle: "",
    subjectID: "",
    subjectIDAutoincrement: 0,
    comment: "",
    last_refresh: Date(Date.now()).toString()
  }

}

onChangeExperimentTitle = (textValue) => {
  this.setState({experimentTitle: textValue})
}

onChangeSubjectID = (textValue) => {
  this.setState({subjectID: textValue})
}

onChangeComment = (textValue) => {
  this.setState({comment: textValue})
}

saveCommentLocally = async() => {
  var cleanComment = this.state.comment.split(",").join("").split("\n").join(" ") // format comment so it is compatible for the CSV file

  var granted = false
    await askPermissionWriteFile().then((status) => {
      granted = status
    })

    if (granted) {
      var path = getFilePath()

      var exists = false
      await RNFS.exists(path).then((status) => {
        exists = status
      })

      if(!exists) {  // if the file doesn't exist, display a pop-up to remind the user that they have to save a self-report before they make a comment.
        Alert.alert(DICTIONARY.EXPE_SETTINGS_alertNoSelfReportTitle, DICTIONARY.EXPE_SETTINGS_alertNoSelfReportMessage)
      } 

      else {
        await RNFS.appendFile(path, "," + cleanComment, 'utf8')
      }

      showMessage({
        message: DICTIONARY.EXPE_SETTINGS_alertSaveMessage,
        type: "success",
      });
    }
    else {
      Alert.alert(DICTIONARY.EXPE_SETTINGS_alertNotSavedTitle, DICTIONARY.EXPE_SETTINGS_alertNotSavedMessage)
    }
}

saveCommentAPI = async() => {
  var url = Config.API_LINK
  var token = Config.AUTHORIZATION_TOKEN
  var JSONkey = Config.lastJSONkeyPosted

  if (JSONkey == "") { // if the file doesn't exist, display a pop-up to remind the user that they have to save a self-report before they make a comment.
    Alert.alert(DICTIONARY.EXPE_SETTINGS_alertNoSelfReportTitle, DICTIONARY.EXPE_SETTINGS_alertNoSelfReportMessage)
    return
  }

  var requestSuccess = false

  try {
    var response = await RNFetchBlob.config({
      trusty : true // allows unsafe URLs
    })
    .fetch('PATCH', url + "/" + JSONkey, token != ""?{Authorization : 'Bearer ' + token}:{}, JSON.stringify({"comment":this.state.comment.split("\n").join(" ")}))

    var json = await response.json();
    if (response.respInfo.status == 200 || response.respInfo.status == 201)
      requestSuccess = true
    else {
      console.log("An error occured while PATCHing comment to API: code " + response.respInfo.status)
      Alert.alert(DICTIONARY.EXPE_SETTINGS_alertErrorPatchAPITitle, DICTIONARY.EXPE_SETTINGS_alertErrorPatchAPIMessage + response.respInfo.status)
    }
  } catch (error) {
    console.log("An error occured while PATCHing JSON comment to API")
    console.error(error);
    requestSuccess = false
  }

  if (requestSuccess)
    showMessage({
      message: DICTIONARY.EXPE_SETTINGS_alertSaveMessage,
      type: "success",
    });
}

saveComment = async() => {
  Config.SAVE_MODE == 0? this.saveCommentLocally() : this.saveCommentAPI()
}


render() {

  return (
    <SafeAreaView style = {styles.containerStyle}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style = {styles.containerStyle} >


          {(Config.RUNNING_EXPERIMENT_TITLE == ""?
            <View>
              <Text style = {globalStyles.textStyle}>{DICTIONARY.EXPE_SETTINGS_noRunningExperiment + "\n\n" + DICTIONARY.EXPE_SETTINGS_startNewExperiment}</Text>

              <View style={{flexDirection: "row", flex:1, justifyContent: 'space-between', padding : 30, paddingTop: 0, paddingBottom: 15}}>
                <TextInput
                  style={globalStyles.inputStyle}
                  onChangeText={this.onChangeExperimentTitle}
                  value={this.state.experimentTitle}
                  placeholder={DICTIONARY.EXPE_SETTINGS_expeTitlePlaceholder}
                />

                <TouchableOpacity
                  style={globalStyles.neutralButton}
                  onPress={() => {
                    Config.RUNNING_EXPERIMENT_TITLE = this.state.experimentTitle
                    storeDataAsyncStorage('@running_experiment_title', this.state.experimentTitle)
                    this.setState({last_refresh: Date(Date.now()).toString()})
                  }} 
                  ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.EXPE_SETTINGS_startExpeButton}</Text>
                </TouchableOpacity>
              </View>
            </View>

          :

            <View>
              <Text style = {globalStyles.textStyle}>{DICTIONARY.EXPE_SETTINGS_runningExperiment}<Text style={{fontWeight: "bold"}}>{Config.RUNNING_EXPERIMENT_TITLE}</Text></Text>

              <View style={globalStyles.settingButtonsStyle}>
                <TouchableOpacity
                  style={globalStyles.neutralButton}
                  onPress={() => {
                    Config.RUNNING_EXPERIMENT_TITLE = ""
                    Config.EVALUATED_SUBJECT_ID_MANUAL = ""
                    Config.EVALUATED_SUBJECT_ID_AUTO = 0
                    storeDataAsyncStorage('@running_experiment_title', "")
                    this.setState({experimentTitle: "", subjectID: ""})
                  }} 
                  ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.EXPE_SETTINGS_stopExpeButton}</Text>
                </TouchableOpacity>
              </View>


              <View>
                {(Config.SUBJECTSIDENTIFICATION_MODE == 1 && Config.EVALUATED_SUBJECT_ID_MANUAL == "")? // if manual mode and no subject ID specified
                  <Text style = {globalStyles.textStyle}>{DICTIONARY.EXPE_SETTINGS_noCurrentSubject}</Text>
                : // if autoincrement mode or subject already specified
                  <Text style = {globalStyles.textStyle}>{DICTIONARY.EXPE_SETTINGS_evaluatedSubjectId}{Config.SUBJECTSIDENTIFICATION_MODE==0?Config.EVALUATED_SUBJECT_ID_AUTO : Config.EVALUATED_SUBJECT_ID_MANUAL}</Text>
                }

                {Config.SUBJECTSIDENTIFICATION_MODE == 1? // manual mode: propose to change subject id
                  <View style={{flexDirection: "row", flex:1, justifyContent: 'space-between', padding : 30, paddingTop: 0, paddingBottom: 15}}>
                    <TextInput
                      style={globalStyles.inputStyle}
                      onChangeText={this.onChangeSubjectID}
                      value={this.state.subjectID}
                      placeholder={DICTIONARY.EXPE_SETTINGS_subjectIdPlaceholder}
                    />

                    <TouchableOpacity
                      style={globalStyles.neutralButton}
                      onPress={() => {
                        Config.EVALUATED_SUBJECT_ID_MANUAL = this.state.subjectID
                        this.setState({last_refresh: Date(Date.now()).toString()})
                      }} 
                      ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.EXPE_SETTINGS_newSubject}</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <View></View>
                }
              </View>

              <View>
                <Text style={globalStyles.textStyle}>{DICTIONARY.EXPE_SETTINGS_addComment}</Text>
                <TextInput
                  multiline
                  style={[globalStyles.inputStyle, {height: 100}]}
                  onChangeText={this.onChangeComment}
                  value={this.state.comment}
                  placeholder={DICTIONARY.EXPE_SETTINGS_commentPlaceholder}
                />
                <TouchableOpacity
                      style={globalStyles.neutralButton}
                      onPress={this.saveComment} 
                      ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.EXPE_SETTINGS_saveComment}</Text>
                    </TouchableOpacity>
              </View>
            </View>
          )}


          <View style={globalStyles.endPageButtonStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress={() => this.props.navigation.navigate('SelfReport')} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_backButton}</Text>
            </TouchableOpacity>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>

    );
  }
}


const styles = StyleSheet.create({

  containerStyle:{
    flex: 1,
  },

});






