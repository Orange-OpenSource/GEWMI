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
import { View, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import DialogInput from 'react-native-dialog-input'; 
const globalStyles = require('../style');


export class OtherEmotionsDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDialogVisible: false,
    }

  }

  closeOtherEmotionsPanel = () => {

    this.props.closeOtherEmotionsPanel()

  }

  deleteOtherEmotion = (emotion) => {

    this.props.deleteOtherEmotion(emotion)

    this.setState(
      {
        isDialogVisible: false,
      }
    ) 

  }

  editOtherEmotion = (emotion) => {

    this.props.editOtherEmotion(emotion)

    this.setState(
      {
        isDialogVisible: true,
      }
    )

  }

  confirmEditOtherEmotion = (newEmotionLabel) => {
    this.props.confirmEditOtherEmotion(this.props.dialogInitValue, newEmotionLabel)

    this.setState(
      {
        isDialogVisible: false,
      }
    ) 
  }

  render() {
    return (

      <View>
      <View><Text>{DICTIONARY.WHEEL_otherEmotion + " " + this.props.countOtherEmotions()}</Text></View>
        {Object.keys(this.props.otherEmotionsList).map((emotion, index) => 
              <View key={index} style={styles.viewOtherEmotions}>
                <Text>
                  {emotion + " - " + this.props.otherEmotionsList[emotion]}
                  {this.props.isOtherEmotion}
                </Text>
                <TouchableOpacity
                  style={globalStyles.iconButton}
                  onPress={() => this.editOtherEmotion(emotion)} >
                    <FontAwesomeIcon icon={ faEdit } size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={globalStyles.iconButton}
                  onPress={() => this.deleteOtherEmotion(emotion)} >
                    <FontAwesomeIcon icon={ faTrashAlt } size={25} />
                </TouchableOpacity>
              </View>
            )}

          <View>
            <TouchableOpacity
              style={globalStyles.neutralButton}
              onPress= { () => this.closeOtherEmotionsPanel()}
            ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.INTENSITY_returnButton}</Text>
            </TouchableOpacity>
          </View>


          <DialogInput isDialogVisible={this.state.isDialogVisible}
              title={DICTIONARY.WHEEL_otherEmotionDialogTitle}
              message={DICTIONARY.WHEEL_otherEmotionDialogMessage}
              initValueTextInput = {this.props.dialogInitValue}
              submitInput={ (inputText) => {this.confirmEditOtherEmotion(inputText)} }
              closeDialog={ () => {this.setState({isDialogVisible: false})}}
              submitText={DICTIONARY.WHEEL_otherEmotionDialogSend}
              cancelText={DICTIONARY.WHEEL_otherEmotionCancel}
              >
              
           </DialogInput>

            
        </View>

    );

  }

}

const styles = StyleSheet.create ({

  viewOtherEmotions: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: "center",
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  }

})
