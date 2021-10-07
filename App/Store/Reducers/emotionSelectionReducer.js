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

import { Config } from '../../config'

INITIAL_MAX_EMOTION_SELECTION = Config.SELF_REPORT_PARAMETER.INITIAL_MAX_EMOTION_SELECTION
INITIAL_MIN_EMOTION_SELECTION = Config.SELF_REPORT_PARAMETER.INITIAL_MIN_EMOTION_SELECTION
SELECTED_LANGUAGE = Config.SELECTED_LANGUAGE


let initialState = { 
  MAX_EMOTION_SELECTION: INITIAL_MAX_EMOTION_SELECTION, 
  MIN_EMOTION_SELECTION: INITIAL_MIN_EMOTION_SELECTION,
  SELECTED_LANGUAGE: SELECTED_LANGUAGE
}

function setEmotionSelectionNumber(state = initialState, action){
  console.log('dispatch')
  
  switch(action.type){
  case 'INCREMENT_MAX': 
    return {
      ...state,
      MAX_EMOTION_SELECTION: state.MAX_EMOTION_SELECTION + 1,
      MIN_EMOTION_SELECTION: state.MIN_EMOTION_SELECTION,
      SELECTED_LANGUAGE: state.SELECTED_LANGUAGE
      }
  case 'DECREMENT_MAX':
    return {
    ...state,
      MAX_EMOTION_SELECTION: state.MAX_EMOTION_SELECTION - 1,
      MIN_EMOTION_SELECTION: state.MIN_EMOTION_SELECTION,
      SELECTED_LANGUAGE: state.SELECTED_LANGUAGE
    }
  case 'INCREMENT_MIN': 
  return {
      ...state,
      MAX_EMOTION_SELECTION: state.MAX_EMOTION_SELECTION ,
      MIN_EMOTION_SELECTION: state.MIN_EMOTION_SELECTION + 1,
      SELECTED_LANGUAGE: state.SELECTED_LANGUAGE
    }
  case 'DECREMENT_MIN':
    return {
      ...state,
      MAX_EMOTION_SELECTION: state.MAX_EMOTION_SELECTION ,
      MIN_EMOTION_SELECTION: state.MIN_EMOTION_SELECTION - 1,
      SELECTED_LANGUAGE: state.SELECTED_LANGUAGE
    }
  case 'UPDATE_MIN_MAX' :
    return {
      ...state,
      MAX_EMOTION_SELECTION: Config.SELF_REPORT_PARAMETER.INITIAL_MAX_EMOTION_SELECTION,
      MIN_EMOTION_SELECTION: Config.SELF_REPORT_PARAMETER.INITIAL_MIN_EMOTION_SELECTION,
      SELECTED_LANGUAGE: Config.SELECTED_LANGUAGE
    }
  default:
    return state
  }
}

export default setEmotionSelectionNumber
