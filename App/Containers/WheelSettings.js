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
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert, Linking } from 'react-native'
import { showMessage } from "react-native-flash-message";
import Collapsible from 'react-native-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheckCircle, faTrashAlt, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { Config } from '../config'
import { ConfigEmotions } from '../configEmotions'
import { storeDataAsyncStorage, removeDataAsyncStorage } from "../utils"
const globalStyles = require('../style');


// Display Screen
export default class WheelSettings extends Component {
  
constructor(props) {
  DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]
  super(props);

  this.state = {
    isCollapsed: true,
    last_refresh: Date(Date.now()).toString()
  }

}


deleteEmotion = (idEmotion) => {
  delete ConfigEmotions.EMOTIONS[idEmotion]
  delete DICTIONARY.EMOTION_LABELS[idEmotion-1]

  this.updateGreyLevelColors()
  this.updateEmotionsIds()

  // Refresh display:
  this.setState({last_refresh: Date(Date.now()).toString()}, () => {
    showMessage({
      message: DICTIONARY.WHEEL_SETTINGS_message_emotion_deleted,
      type: "warning",
    });
  }); 
}

addEmotion = (name, color, idEmotion) => {
  var greyLevelColor = (idEmotion%2 == 1?'#FFFFFF':'#999999')

  DICTIONARY.EMOTION_LABELS[idEmotion] = name
  
  ConfigEmotions.EMOTIONS[idEmotion+1] = {
    tag: name,
    color: [greyLevelColor, color],
    textColor: '#191818',
    fontSize: 10,
  }

  this.updateGreyLevelColors()
  this.updateEmotionsIds()

  // Refresh display:
  this.setState({last_refresh: Date(Date.now()).toString()})

  showMessage({
    message: DICTIONARY.WHEEL_SETTINGS_message_emotion_added,
    type: "success",
  });
}

validateChangesEmotion = (newName, newColor, idEmotion) => {
  DICTIONARY.EMOTION_LABELS[idEmotion-1] = newName
  ConfigEmotions.EMOTIONS[idEmotion].color[1] = newColor
  ConfigEmotions.EMOTIONS[idEmotion].tag = newName

  showMessage({
    message: DICTIONARY.WHEEL_SETTINGS_message_changes_saved,
    type: "info",
  });
}

updateGreyLevelColors = () => {
  console.log("update grey level colors")
  // Change grey level colors in order to keep alternation between light and dark grey
  var i = 0
  for (var key in ConfigEmotions.EMOTIONS) {
    ConfigEmotions.EMOTIONS[key].color[0] = (i%2 == 0? '#FFFFFF' : '#999999')
    ++i
  }
}

updateEmotionsIds = () => {
  var emotionsTemp = ConfigEmotions.EMOTIONS
  ConfigEmotions.EMOTIONS = {}

  var i = 1
  for (var key in emotionsTemp) {
    ConfigEmotions.EMOTIONS[i] = emotionsTemp[key]
    i++
  }

  var emotionLabelsTemp = DICTIONARY.EMOTION_LABELS
  DICTIONARY.EMOTION_LABELS = {}

  var i = 0
  for (var key in emotionLabelsTemp) {
    DICTIONARY.EMOTION_LABELS[i] = emotionLabelsTemp[key]
    i++
  }
}

saveEmotionsToAsyncStorage() {
  for (var key in DICTIONARY.EMOTION_LABELS) {
    ConfigEmotions.EMOTIONS[parseInt(key)+1].tag = DICTIONARY.EMOTION_LABELS[key]
  }

  storeDataAsyncStorage('@emotions_data', JSON.stringify(ConfigEmotions.EMOTIONS))

  this.props.navigation.navigate('Setting')
}

removeEmotionsFromAsyncStorage() {

  removeDataAsyncStorage('@emotions_data')
             .then(result => {
               Alert.alert(DICTIONARY.WHEEL_SETTINGS_clear_OK_message)
             }).catch(err => {
               console.log(err);
               Alert.alert(DICTIONARY.WHEEL_SETTINGS_clear_error_message)
             });

}


render() {

  return (
    <SafeAreaView style = {styles.containerStyle}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style = {styles.containerStyle} >

          <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => {this.setState({isCollapsed: !this.state.isCollapsed})}}>
            <Text style={globalStyles.h2Style}>
              <FontAwesomeIcon icon={ this.state.isCollapsed? faAngleDown : faAngleUp } size={20} margin={15} />
              Instructions</Text>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.isCollapsed}>
            <Text style={globalStyles.textStyle}>{DICTIONARY.WHEEL_SETTINGS_paragraph1 + "\n" + DICTIONARY.WHEEL_SETTINGS_paragraph2 + "\n\n" + DICTIONARY.WHEEL_SETTINGS_paragraph3 + "\n\n" + DICTIONARY.WHEEL_SETTINGS_paragraph4 + "\n\n" + DICTIONARY.WHEEL_SETTINGS_paragraph5}<Text style={{color: 'blue'}} onPress={() => Linking.openURL('https://htmlcolorcodes.com/')}>https://htmlcolorcodes.com</Text></Text>
          </Collapsible>

          <View style={{flexDirection: "row", flex:1, justifyContent: 'space-between', marginLeft: 30, marginRight: 120}}>
            <Text style={[globalStyles.textStyle, {fontWeight: "bold"}]}>{DICTIONARY.WHEEL_SETTINGS_emotion}:</Text>
            <Text style={[globalStyles.textStyle, {fontWeight: "bold"}]}>{DICTIONARY.WHEEL_SETTINGS_color}:</Text>
          </View>

          {
          Object.keys(ConfigEmotions.EMOTIONS).map((key, index) =>
          <DisplayEmotion
            key = {key}
            idEmotion = {key}
            tag = { DICTIONARY.EMOTION_LABELS[key-1] }
            color = { ConfigEmotions.EMOTIONS[key].color[1] }
            deleteEmotion = { this.deleteEmotion }
            validateChangesEmotion = { this.validateChangesEmotion }
            isnew = {false}
          />
          )} 


          <View>
            <Text style={globalStyles.textStyle}>{DICTIONARY.WHEEL_SETTINGS_paragraph6}</Text>

            <DisplayEmotion
              key = {Object.keys(DICTIONARY.EMOTION_LABELS).length}
              idEmotion = {Object.keys(DICTIONARY.EMOTION_LABELS).length+1}
              tag = ""
              color = ""
              validateChangesEmotion = {this.addEmotion}
              isnew = {true}
            />
          </View>


          <View>
            <Text style={globalStyles.textStyle}>{DICTIONARY.WHEEL_SETTINGS_clear_message}</Text>

            <View style={[globalStyles.endPageButtonStyle, {marginTop: 0}]}>
              <TouchableOpacity
                  style={globalStyles.neutralButton}
                  onPress={() => this.removeEmotionsFromAsyncStorage()} 
                ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.WHEEL_SETTINGS_clear_button}</Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={globalStyles.endPageButtonStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress={() => this.saveEmotionsToAsyncStorage()} 
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.SETTING_backButton}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>

    );
  }
}

class DisplayEmotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newtag: this.props.tag,
      newcolor: this.props.color
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });  
    this.setState({newtag: nextProps.tag})
    this.setState({newcolor: nextProps.color})
  }

  onChangeEmotionTag = (textValue) => {
    this.setState({newtag: textValue})
  }

  onChangeColor = (textValue) => {
    this.setState({newcolor: textValue})
  }

  render() {

    return (
      <View style={{flexDirection: "row", flex:1, justifyContent: 'space-between', padding : 15, paddingTop: 0, paddingBottom: 15}}>

        <Text style={{paddingTop: 22, flex: 2}}>{this.props.idEmotion}</Text>

        <TextInput
          style={[globalStyles.inputStyle, {flex: 8}]}
          onChangeText={this.onChangeEmotionTag}
          value={this.state.newtag.replace('\n', '')}
          placeholder={DICTIONARY.WHEEL_SETTINGS_emotion}
        />

        <TextInput
          style={[globalStyles.inputStyle, {flex: 6}]}
          onChangeText={this.onChangeColor}
          value={this.state.newcolor}
          placeholder={DICTIONARY.WHEEL_SETTINGS_color}
        />

        <TouchableOpacity
          style={[globalStyles.iconButton, {marginTop: 13, marginBottom: 13, paddingTop: 9, flex: 2}]}
          onPress={() => this.props.validateChangesEmotion(this.state.newtag, this.state.newcolor.toLowerCase(), this.props.idEmotion) } >
          <FontAwesomeIcon icon={ faCheckCircle } size={20} color={this.props.isnew?"green":"blue"} />
        </TouchableOpacity>

        {this.props.isnew?
          <View></View>
        :
          <TouchableOpacity
            style={[globalStyles.iconButton, {marginTop: 13, marginBottom: 13, paddingTop: 9, flex: 2}]}
            onPress={() => this.props.deleteEmotion(this.props.idEmotion)} >
            <FontAwesomeIcon icon={ faTrashAlt } size={20} color={"red"} />
          </TouchableOpacity>
        }

      </View>
    )
  }
}


const styles = StyleSheet.create({

  containerStyle:{
    flex: 1,
  },

  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
  },

});






