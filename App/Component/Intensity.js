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
import { View, Dimensions, TouchableOpacity, Text, Button} from 'react-native'
const globalStyles = require('../style');


export class Intensity extends Component {

  constructor(props) {
    super(props);

  }

  updateIntensityValue = (newIntensity) => {

    this.props.updateEmotionSelection(this.props.currentSelectedEmotionKey, newIntensity)

  }

  closeIntensityPanel = () => {

    this.props.closeIntensitySelection()

  }

  render() {
    return (

      <View
      style = {
        [
          {  
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }
        ]
        }
        
      >

        <Text
          style = { 
            [
              {
                fontWeight: 'bold',
                alignItems: 'center',
              }
            ] 
          }
        
        > {this.props.isCurrentSelectedOtherEmotion ? this.props.otherEmotionValue:
          DICTIONARY.EMOTION_LABELS[this.props.currentSelectedEmotionKey-1].replace('\n', '') }</Text>
          <View         
            style = {
              [
                {  
                  flexDirection : 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              ]
              }
          >

<TouchableOpacity
            style = {
              [
                {  
                  borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                  width: Dimensions.get('window').width * 0.08,
                  height: Dimensions.get('window').width * 0.08, 
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: "#161616",
                  
                },
                this.props.isCurrentSelectedOtherEmotion ? {backgroundColor: '#999999'}:
                {backgroundColor: EMOTIONS[this.props.currentSelectedEmotionKey].color}
              ]
              }
              onPress={ () => this.updateIntensityValue(1)}
              >

            <Text
              style= {
                [
                  {
                    color: '#000000',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    
                  }
                ]
              }>
              1
            </Text>

          </TouchableOpacity>

            <TouchableOpacity
              style = {
                [
                  {  
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.10,
                    height: Dimensions.get('window').width * 0.10, 
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#161616",
                  },
                  this.props.isCurrentSelectedOtherEmotion ? {backgroundColor: '#999999'}:
                  {backgroundColor: EMOTIONS[this.props.currentSelectedEmotionKey].color}  
                ]
                }
                onPress={ () => this.updateIntensityValue(2)}
                >
              
              <Text
                    style= {
                      [
                        {
                          color: '#000000',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }
                      ]
                    }>
                    2
              </Text>

            </TouchableOpacity>

              

            <TouchableOpacity
              style = {
                [
                  {  
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.12,
                    height: Dimensions.get('window').width * 0.12, 
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#161616",
                  },
                this.props.isCurrentSelectedOtherEmotion ? {backgroundColor: '#999999'}:
                {backgroundColor: EMOTIONS[this.props.currentSelectedEmotionKey].color} 
                ]
                }
                onPress={ () => this.updateIntensityValue(3)}
                >
              <Text
                style= {
                  [
                    {
                      color: '#000000',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }
                  ]
                }>
                    3
              </Text>
            </TouchableOpacity>


            <TouchableOpacity
              style = {
                [
                  {  
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.14,
                    height: Dimensions.get('window').width * 0.14, 
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#161616",
                  },
                this.props.isCurrentSelectedOtherEmotion ? {backgroundColor: '#999999'}:
                {backgroundColor: EMOTIONS[this.props.currentSelectedEmotionKey].color} 
                ]
                }
                onPress={ () => this.updateIntensityValue(4)}
                >
              <Text
                style= {
                  [
                    {
                      color: '#000000',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }
                  ]
                }>
                    4
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style = {
                [
                  {  
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.16,
                    height: Dimensions.get('window').width * 0.16, 
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#161616",
                  },
                this.props.isCurrentSelectedOtherEmotion ? {backgroundColor: '#999999'}:
                {backgroundColor: EMOTIONS[this.props.currentSelectedEmotionKey].color} 
                ]
                }
                onPress={ () => this.updateIntensityValue(5)}
                >
              <Text
                style= {
                  [
                    {
                      color: '#000000',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }
                  ]
                }>
                    5
              </Text>
            </TouchableOpacity>


            <TouchableOpacity
              style = {
                [
                  {  
                    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                    width: Dimensions.get('window').width * 0.18,
                    height: Dimensions.get('window').width * 0.18, 
                    margin: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#161616",
                  },
                this.props.isCurrentSelectedOtherEmotion ? {backgroundColor: '#999999'}:
                {backgroundColor: EMOTIONS[this.props.currentSelectedEmotionKey].color} 
                ]
                }
                onPress={ () => this.updateIntensityValue(6)}
                >
              <Text
                style= {
                  [
                    {
                      color: '#000000',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }
                  ]
                }>
                    6
              </Text>
            </TouchableOpacity>
           

          </View>

          <View>
            <TouchableOpacity
              style={globalStyles.neutralButton}
              onPress= { () => this.closeIntensityPanel()}
            ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.INTENSITY_returnButton}</Text>
            </TouchableOpacity>
          </View>


      </View>

    );

  }

}






