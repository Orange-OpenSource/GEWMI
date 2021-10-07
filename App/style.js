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

'use strict';
import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    neutralButton: {
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderColor: '#191818',
        borderWidth: 0.5
      },
    
      neutralButtonText: {
        fontSize: 15,
        textTransform: 'uppercase',
        color: '#191818'
      },

      iconButton: {
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
        borderColor: '#191818',
        borderWidth: 0.5
      },

      settingButtonsStyle: {
        flexDirection: "row",
        flexWrap:'wrap',
        justifyContent: 'space-between',
        padding : 30,
        paddingTop: 0,
        paddingBottom: 15
      },

      endPageButtonStyle: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
      },

      buttonContainerStyle:{
        padding: 20,
      },

      textStyle: {
        fontSize: 15,
        alignItems: 'center',
        padding: 20,
      },

      h1Style: {
        fontSize: 25,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20,
        fontWeight: "bold"
      },

      h2Style: {
        fontSize: 20,
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 20,
        fontWeight: "bold"
      },

      h3Style: {
        fontSize: 16,
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 20,
        fontWeight: "bold"
      },

      sectionTitle1: {
        backgroundColor: "#fefefe",
        height: 58,
        marginTop: 10
      },

      sectionTitle2: {
        backgroundColor: "#fefefe",
        height: 40,
        marginTop: 5
      },

      inputStyle: {
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1,
        backgroundColor: "white",
      },
});
