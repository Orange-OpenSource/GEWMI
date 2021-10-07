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

import AsyncStorage from '@react-native-async-storage/async-storage'
import { PermissionsAndroid, Platform } from 'react-native'
import { Config } from './config.js'
import { ConfigEmotions } from './configEmotions.js';
var RNFS = require('react-native-fs')

// Function to save value to Async Storage
export const storeDataAsyncStorage = async (storageKey, value) => {
    try {
      await AsyncStorage.setItem('@'+storageKey, value)
    } catch (e) {
      console.log("Error while saving " + storageKey + ":" + value + " to Async Storage")
    }
  }

export const getDataAsyncStorage = async (storageKey) => {
  try {
    const value = await AsyncStorage.getItem('@'+storageKey)
    if(value !== null) {
      return value
    }
  } catch(e) {
    console.log("Error while reading " + storageKey + " from Async Storage")
  }
}

export const removeDataAsyncStorage = async (storageKey) => {
    try {
        await AsyncStorage.removeItem('@' + storageKey);
        return true;
    }
    catch(exception) {
      console.log("Error while removing " + storageKey + " from Async Storage")
        return false;
    }
}

export const getElementsAsyncStorage = async() => {
  var userID = await getDataAsyncStorage('@user_id')
  if (userID != null) // if exists
    Config.USER_ID = parseInt(userID)
  else   // if user_id doesn't exist, add random user id from config
    storeDataAsyncStorage('@user_id', "" + Config.USER_ID)


  var languageLabel = await getDataAsyncStorage('@language_label')
  if (languageLabel != null) { // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.SELECTED_LANGUAGE = languageLabel
    Config.LANGUAGE_CHOSEN = true
  }

  var modeIndex = await getDataAsyncStorage('@mode_index')
  if (modeIndex != null) // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.SELECTED_MODE = modeIndex

  var identificationModeIndex = await getDataAsyncStorage('@identification_mode_index')
  if (identificationModeIndex != null) // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.SUBJECTSIDENTIFICATION_MODE = identificationModeIndex

  var saveMode = await getDataAsyncStorage('@save_mode')
  if (saveMode != null) // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.SAVE_MODE = saveMode

  var apiLink = await getDataAsyncStorage('@api_link')
  if (apiLink != null) // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.API_LINK = apiLink

  var authorizationToken = await getDataAsyncStorage('@authorization_token')
  if (authorizationToken != null) // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.AUTHORIZATION_TOKEN = authorizationToken

  var colorIndex = await getDataAsyncStorage('@color_index')
  if (colorIndex != null) // if null, we keep the default setting (setting not changed by user or first usage) 
    ConfigEmotions.selectedColorIndex = colorIndex

  var maxEmotionSelection = await getDataAsyncStorage('@max_emotion_selection')
  if (maxEmotionSelection != null)  // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.SELF_REPORT_PARAMETER.INITIAL_MAX_EMOTION_SELECTION = parseInt(maxEmotionSelection)

  var minEmotionSelection = await getDataAsyncStorage('@min_emotion_selection')
  if (minEmotionSelection != null)  // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.SELF_REPORT_PARAMETER.INITIAL_MIN_EMOTION_SELECTION = parseInt(minEmotionSelection)

  var runningExperimentTitle = await getDataAsyncStorage('@running_experiment_title')
  if (runningExperimentTitle != null) // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.RUNNING_EXPERIMENT_TITLE = runningExperimentTitle

  var displayAlertSave = await getDataAsyncStorage('@display_alert_save')
  if (displayAlertSave != null) // if null, we keep the default setting (setting not changed by user or first usage) 
    Config.DISPLAY_ALERT_SAVE = displayAlertSave == "true"

  var emotionsDataStr = await getDataAsyncStorage('@emotions_data')
  if (emotionsDataStr != null) { // if null, we keep the default setting (setting not changed by user or first usage) 
    var emotionsData = JSON.parse(emotionsDataStr)
    ConfigEmotions.EMOTIONS = emotionsData
    DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]
    var i = 0
    DICTIONARY.EMOTION_LABELS = {}
    for (var id in emotionsData) {
      DICTIONARY.EMOTION_LABELS[i] = emotionsData[id].tag
      i += 1
    }
  }

  Config.LOADING = false
}

export const getFilePath = (date) => {
  var path = RNFS.DownloadDirectoryPath + '/emotion_wheel_';
  if (Config.SELECTED_MODE == 0) // if individual mode, 1 file per self-report
    return path + date + ".txt";
  else // if experiment mode, we have a title for the experiment and will append new lines to the same file
    return path + Config.RUNNING_EXPERIMENT_TITLE + ".txt";
}

export const askPermissionWriteFile = async() => {
  const OsVersion = Platform.constants['Release'];
  console.log("VERSION :")
  console.log(OsVersion)

  const oldVersion = OsVersion < 5 // permission is automatically granted for android versions < Lollipop
  var granted = false

  if (!oldVersion) {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: DICTIONARY.SELFREPORT_storageAccessTitle,
        message: DICTIONARY.SELFREPORT_storageAccessMessage,
        buttonPositive: 'OK',
      });
  }

  return oldVersion || granted === PermissionsAndroid.RESULTS.GRANTED
}
