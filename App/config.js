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
import en from "./Language/en";
import fr from "./Language/fr";


export const Config = {

//Self Report Configuration 

  SELF_REPORT_PARAMETER: {
    
    CIRCLE_RADIUS: 0.13,
    CIRCLE_OPACITY: 0.7,
    TEXT_RADIUS: 0.14,
    MAX_INTENSITY_VALUE : 1,
    INITIAL_MAX_EMOTION_SELECTION : 3,
    INITIAL_MIN_EMOTION_SELECTION : 2,

  
  },

  MAX_OTHER_EMOTIONS: 2,

  LANGUAGES_NUMBER: 2,

  SELECTED_MODE: 0, // 0: individual / 1: experiment

  SAVE_MODE: 0, // 0: save data locally / 1: save data online (API)
  API_LINK: "",
  AUTHORIZATION_TOKEN: "",
  lastJSONkeyPosted: "",

  SUBJECTSIDENTIFICATION_MODE: 0, // 0: auto-increment / 1: manual
  
  RUNNING_EXPERIMENT_TITLE: "",
  EVALUATED_SUBJECT_ID_MANUAL: "",
  EVALUATED_SUBJECT_ID_AUTO: 0,

  LANGUAGE_CHOSEN: false,
  SELECTED_LANGUAGE : "English",

  DISPLAY_ALERT_SAVE: true,

  DICTIONARY: {
    "English": en,
    "Français": fr
  },

  LANGUAGES: {
    0: "English",
    1: "Français"
  },

  LOADING: true, // true as long as Async Storage is not retrieved

  USER_ID: Math.floor(Math.random() * 1000)
}

