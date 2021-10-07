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

import React from 'react'
import { View } from 'react-native'
import SelfReport from '../Containers/SelfReport'
import Home from '../Containers/Home'
import Setting from '../Containers/Setting'
import ExperimentSettings from '../Containers/ExperimentSettings'
import WheelSettings from '../Containers/WheelSettings'
import Help from '../Containers/Help'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Config } from '../config'

const SearchStackNavigator = createStackNavigator({

  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => (
      {
      title: Config.DICTIONARY[Config.SELECTED_LANGUAGE].NAVIGATION_homeTitle
    })
  },
  SelfReport: {
    screen: SelfReport,
    navigationOptions: ({navigation}) => (
      {
      title: Config.DICTIONARY[Config.SELECTED_LANGUAGE].NAVIGATION_selfReportTitle,
      headerRight: () => (
        Config.SELECTED_MODE == 1?
          <FontAwesomeIcon icon={ faBars } size={30} style={{marginRight: 10}}
          onPress= {() => navigation.navigate('ExperimentSettings')}/>
        : <View></View>
        
      ),
    })
  },
  Setting: {
    screen: Setting,
    navigationOptions: ({navigation}) => (
      {
      title: Config.DICTIONARY[Config.SELECTED_LANGUAGE].NAVIGATION_settingTitle
    })
  },
  ExperimentSettings: {
    screen: ExperimentSettings,
    navigationOptions: ({navigation}) => (
      {
      title: Config.DICTIONARY[Config.SELECTED_LANGUAGE].NAVIGATION_experimentSettingsTitle
    })
  },
  WheelSettings: {
    screen: WheelSettings,
    navigationOptions: ({navigation}) => (
      {
      title: Config.DICTIONARY[Config.SELECTED_LANGUAGE].NAVIGATION_wheelSettingsTitle
    })
  },
  Help: {
    screen: Help,
    navigationOptions: ({navigation}) => (
      {
      title: Config.DICTIONARY[Config.SELECTED_LANGUAGE].NAVIGATION_helpTitle
    })
  },
})

export default createAppContainer(SearchStackNavigator)
