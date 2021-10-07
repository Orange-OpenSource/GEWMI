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
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { Config } from '../config'
import { getElementsAsyncStorage, storeDataAsyncStorage } from "../utils"
const globalStyles = require('../style');

// Constants 
EMOTIONS = Config.SELF_REPORT_PARAMETER.EMOTIONS,
INTENSITIES = Config.SELF_REPORT_PARAMETER.INTENSITY_PARAMETER
MAX_INTENSITY = Config.SELF_REPORT_PARAMETER.MAX_INTENSITY_VALUE
MAX_SELECTED_EMOTION = Config.SELF_REPORT_PARAMETER.MAX_SELECTED_EMOTION
MIN_SELECTED_EMOTION = Config.SELF_REPORT_PARAMETER.MIN_SELECTED_EMOTION

var DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]


// Main screen in the app
export default class Home extends Component {


constructor(props) {
  super(props);

  this.state = {
    last_refresh: Date(Date.now()).toString()
  }
  
}

focusedScreen = this.props.navigation.addListener('willFocus', () => {
  // The screen is focused
  DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]
 
  this.props.navigation.navigate('Home', title=Config.DICTIONARY[Config.SELECTED_LANGUAGE].NAVIGATION_homeTitle) // refreshes Home Page title after retrieving chosen language
  this.setState({ lastRefresh: Date(Date.now()).toString() })  // only for refreshing display
});

// Retrieving information from Async Storage
componentDidMount() {
  getElementsAsyncStorage()
}

componentWillUnmount() {
  this.focusedScreen.remove();
}

setLanguage = (label) => {
  var found = false;
  var i = 0;
  while (!found && i < Config.LANGUAGES_NUMBER) {
    if (Config.LANGUAGES[i] == label) {
      found = true;
      Config.SELECTED_LANGUAGE = Config.LANGUAGES[i]
      Config.LANGUAGE_CHOSEN = true
      DICTIONARY = Config.DICTIONARY[label]
      // Update navigation title
      this.props.navigation.setParams({title: DICTIONARY.NAVIGATION_homeTitle})

      // Save to Async storage
      storeDataAsyncStorage('@language_label', label)

      this.setState({ lastRefresh: Date(Date.now()).toString() })  // only for refreshing display
    }
    ++i;
  }
}

render() {

  var emotionAppIcon = require("../Resources/app_icon.png")

  return (

    <SafeAreaView style = {styles.containerStyle}>

      {Config.LOADING? // loading screen
        
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Image style={{width: 300, height: 300, margin: 10}} source={emotionAppIcon}/>
        </View>

      :

      <ScrollView keyboardShouldPersistTaps='handled'>
        
        {(Config.LANGUAGE_CHOSEN? // choose language screen

        <View style={{flex: 1, alignItems:'center', justifyContent: 'center' }}>

          <Text style = {globalStyles.textStyle} >{DICTIONARY.HOME_presentation} 
          </Text>
        
          <View style = {globalStyles.buttonContainerStyle} >
          <TouchableOpacity
              style={globalStyles.neutralButton}
              onPress= {() => this.props.navigation.navigate('SelfReport')}
            ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.NAVIGATION_selfReportTitle}</Text>
            </TouchableOpacity>
          </View>

          <View style = {globalStyles.buttonContainerStyle} >
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {() => this.props.navigation.navigate('Setting')}
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.NAVIGATION_settingTitle}</Text>
            </TouchableOpacity>  
          </View>

          <View style = {globalStyles.buttonContainerStyle} >
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress= {() => this.props.navigation.navigate('Help')}
              ><Text style={globalStyles.neutralButtonText}>{DICTIONARY. NAVIGATION_helpTitle}</Text>
            </TouchableOpacity>  
          </View>

          <Text style = { globalStyles.textStyle}>
          <Text style={{fontWeight: "bold"}}>{DICTIONARY.HOME_references}</Text>{"\n\u2022"+DICTIONARY.HOME_referenceContent1+"\n\u2022"+DICTIONARY.HOME_referenceContent2}
          </Text>

        </View>

        :

        <View style={styles.alertLanguageStyle}>
          <View style={{flexDirection: "row", flexWrap:'wrap', padding: 5}}>
            <FontAwesomeIcon icon={ faFlag } size={30} margin={10} marginTop={22} />
            <Text style={{margin: 10, fontSize: 15}}>Please select your language:{"\n\n"}Veuillez sélectionner votre langage :</Text>
          </View>

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

              <Text style={{margin: 0, marginTop: 15, fontSize: 15}}>You will still be able to change it in the SETTINGS page.{"\n\n"}Vous pourrez toujours changer la langue dans la page PARAMÈTRES.</Text>
          </View>
        </View>
        )}

      </ScrollView>

      }

    </SafeAreaView>

    );
  }
}


const styles = StyleSheet.create({

  containerStyle: {
    flex: 1,
    alignItems: 'center'
  },

  alertLanguageStyle: {
    borderColor: '#191818',
    borderWidth: 0.5,
    margin: 8
  }

});






