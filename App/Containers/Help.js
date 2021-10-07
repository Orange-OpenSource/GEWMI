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
import { Table, Row, Rows } from 'react-native-table-component';
import Collapsible from 'react-native-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { Config } from '../config'
const globalStyles = require('../style');

// Constants 
var DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]


// Main screen in the app
export default class Help extends Component {


constructor(props) {
    DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]
    super(props);

    this.state = {
      headerOfTable: [DICTIONARY.HELP_table_emotionIndex, DICTIONARY.HELP_table_emotionLabelEN, DICTIONARY.HELP_table_emotionLabelFR],
      dataForTable: [
      ['em0', 'Interest', 'Intérêt'],
      ['em1', 'Amusement', 'Amusement'],
      ['em2', 'Pride', 'Fierté'],
      ['em3', 'Joy', 'Joie'],
      ['em4', 'Pleasure', 'Plaisir'],
      ['em5', 'Contentment', 'Contentement'],
      ['em6', 'Love', 'Amour'],
      ['em7', 'Admiration', 'Admiration'],
      ['em8', 'Relief', 'Soulagement'],
      ['em9', 'Compassion', 'Compassion'],
      ['em10', 'Sadness', 'Tristesse'],
      ['em11', 'Guilt', 'Culpabilité'],
      ['em12', 'Regret', 'Regret'],
      ['em13', 'Shame', 'Honte'],
      ['em14', 'Disappointment', 'Déception'],
      ['em15', 'Fear', 'Peur'],
      ['em16', 'Disgust', 'Dégoût'],
      ['em17', 'Contempt', 'Mépris'],
      ['em18', 'Hate', 'Haine'],
      ['em19', 'Anger', 'Colère'],
      ],

      isCollapsed: {
        "1": true,
        "1.1": true,
        "1.1.1": true,
        "1.1.2": true,
        "1.2": true,
        "1.3": true,
        "2": true,
        "2.1": true,
        "2.2": true,
      }
    }
  
}


changeCollapsedState = (elementId) => {
  let newIsCollapsed = this.state.isCollapsed
  newIsCollapsed[elementId] = !this.state.isCollapsed[elementId]
  this.setState({ isCollapsed: newIsCollapsed });
}

render() {

  var wheelPicture = Config.SELECTED_LANGUAGE == "English"? require("../Resources/emotion_wheel_english.jpg") : require("../Resources/emotion_wheel_french.jpg")

  return (

    <SafeAreaView style = {styles.containerStyle}>

      <ScrollView keyboardShouldPersistTaps='handled'>

        <View style={{
                flex: 1,
                justifyContent: 'center' }}>

          <Text style = {globalStyles.textStyle} >{DICTIONARY.HELP_intro}</Text>

          <TouchableOpacity style={globalStyles.sectionTitle1} onPress={() => this.changeCollapsedState("1")}>
            <Text style={globalStyles.h1Style}>
              <FontAwesomeIcon icon={ this.state.isCollapsed["1"]? faAngleDown : faAngleUp } size={20} margin={10} />
              {"  "}1. {DICTIONARY.HELP_usingAppTitle}</Text>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.isCollapsed["1"]}>
          <Text style = {globalStyles.textStyle} >{DICTIONARY.HELP_UA_paragraph_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SELFREPORT}</Text>{DICTIONARY.HELP_UA_paragraph_2}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SETTINGS}</Text>.{"\n"}{DICTIONARY.HELP_UA_paragraph_3}
          </Text>


          <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => this.changeCollapsedState("1.1")}>
            <Text style={globalStyles.h2Style}>
              <FontAwesomeIcon icon={ this.state.isCollapsed["1.1"]? faAngleDown : faAngleUp } size={20} margin={10} />
              {"  "}1.1. {DICTIONARY.HELP_selfReportTitle}</Text>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.isCollapsed["1.1"]}>

          <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => this.changeCollapsedState("1.1.1")}>
            <Text style={globalStyles.h3Style}>
              <FontAwesomeIcon icon={ this.state.isCollapsed["1.1.1"]? faAngleDown : faAngleUp } size={20} margin={10} />
              {"  "}1.1.1. {DICTIONARY.HELP_individualModeTitle}</Text>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.isCollapsed["1.1.1"]}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 300, height: 287, margin: 10}} source={wheelPicture}/>
          </View>
          <Text style={globalStyles.textStyle}>
{DICTIONARY.HELP_SR_paragraph1_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SELFREPORT}</Text>{DICTIONARY.HELP_SR_paragraph1_2} {"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph2_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_BACK}</Text>{DICTIONARY.HELP_SR_paragraph2_2} {"\n"}
{DICTIONARY.HELP_SR_paragraph2_3}{"\n"}
{DICTIONARY.HELP_SR_paragraph2_4}{"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph3_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_OTHER}</Text>{DICTIONARY.HELP_SR_paragraph3_2}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_OTHER}</Text>{DICTIONARY.HELP_SR_paragraph3_3}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_other}</Text>{DICTIONARY.HELP_SR_paragraph3_4}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_other}</Text>{DICTIONARY.HELP_SR_paragraph3_5}{"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph4_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_NOEMOTION}</Text>{DICTIONARY.HELP_SR_paragraph4_2}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_other}</Text>{DICTIONARY.HELP_SR_paragraph4_3}{"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph5_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_CONFIRMCHOICES}</Text>{DICTIONARY.HELP_SR_paragraph5_2}"<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_NOEMOTION}</Text>"{DICTIONARY.HELP_SR_paragraph5_3}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SETTINGS}</Text>{DICTIONARY.HELP_SR_paragraph5_4}{"\n"}
{DICTIONARY.HELP_SR_paragraph5_5}{"\n"}
{DICTIONARY.HELP_SR_paragraph5_6}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_Download}</Text>{DICTIONARY.HELP_SR_paragraph5_7}{"\n"}
{DICTIONARY.HELP_SR_paragraph5_8}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_fileFormatTitle}</Text>{DICTIONARY.HELP_SR_paragraph5_9}
          </Text>
          </Collapsible>

          <TouchableOpacity style={[globalStyles.sectionTitle2, {height: 55}]} onPress={() => this.changeCollapsedState("1.1.2")}>
            <Text style={globalStyles.h3Style}>
              <FontAwesomeIcon icon={ this.state.isCollapsed["1.1.2"]? faAngleDown : faAngleUp } size={20} margin={10} />
              {"  "}1.1.2. {DICTIONARY.HELP_experimentationModeTitle}</Text>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.isCollapsed["1.1.2"]}>
          <Text style={globalStyles.textStyle}>
{DICTIONARY.HELP_SR_paragraph6_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SELFREPORT}</Text>{DICTIONARY.HELP_SR_paragraph6_2}{"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph7_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SR_paragraph7_2}</Text>{DICTIONARY.HELP_SR_paragraph7_3}{"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph8_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_START}</Text>{DICTIONARY.HELP_SR_paragraph8_2}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_STOP}</Text>{DICTIONARY.HELP_SR_paragraph8_3}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_STOP}</Text>{DICTIONARY.HELP_SR_paragraph8_4}{"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph9_1}{"\n"}
{DICTIONARY.HELP_SR_paragraph9_2}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_NEWSUBJECT}</Text>{DICTIONARY.HELP_SR_paragraph9_3}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SELFREPORT}</Text>{DICTIONARY.HELP_SR_paragraph9_4}{"\n"}
{DICTIONARY.HELP_SR_paragraph9_5}{"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph10_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SAVECOMMENT}</Text>{DICTIONARY.HELP_SR_paragraph10_2}{"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph11_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SAVECHANGES}</Text>{DICTIONARY.HELP_SR_paragraph11_2}{"\n"}
{"\n"}
{DICTIONARY.HELP_SR_paragraph12_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_individualModeTitle}</Text>{DICTIONARY.HELP_SR_paragraph12_2}
          </Text>
          </Collapsible>

          </Collapsible>

          <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => this.changeCollapsedState("1.2")}>
            <Text style={globalStyles.h2Style}>
              <FontAwesomeIcon icon={ this.state.isCollapsed["1.2"]? faAngleDown : faAngleUp } size={20} margin={10} />
              {"  "}1.2. {DICTIONARY.HELP_settingsTitle}</Text>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.isCollapsed["1.2"]}>

          <Text style={globalStyles.textStyle}>
{DICTIONARY.HELP_S_paragraph1_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SETTINGS}</Text>{DICTIONARY.HELP_S_paragraph1_2}{"\n"}
{"\n"}
 {'\u2022'}  {DICTIONARY.HELP_S_paragraph2}{"\n"}
 {'\u2022'}  {DICTIONARY.HELP_S_paragraph3}{"\n"}
 {'\u2022'}  {DICTIONARY.HELP_S_paragraph4_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_fileFormatTitle}</Text>{DICTIONARY.HELP_S_paragraph4_2}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_APIRecordingTitle}</Text>{DICTIONARY.HELP_S_paragraph4_3}{"\n"}
 {'\u2022'}  {DICTIONARY.HELP_S_paragraph5}{"\n"}
 {'\u2022'}  {DICTIONARY.HELP_S_paragraph6_1}{"\n"}
 {'\u2022'}  {DICTIONARY.HELP_S_paragraph6_2}{"\n"}
 {'\u2022'}  {DICTIONARY.HELP_S_paragraph6_3}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_fileFormatTitle}</Text>{DICTIONARY.HELP_S_paragraph6_4}{"\n"}
{"\n"}
{DICTIONARY.HELP_S_paragraph7_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_WHEELSETTINGS}</Text>{DICTIONARY.HELP_S_paragraph7_2}{"\n"}
{"\n"}
{DICTIONARY.HELP_S_paragraph8_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_BACK}</Text>{DICTIONARY.HELP_S_paragraph8_2}
          </Text>
          </Collapsible>


          <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => this.changeCollapsedState("1.3")}>
            <Text style={globalStyles.h2Style}>
              <FontAwesomeIcon icon={ this.state.isCollapsed["1.3"]? faAngleDown : faAngleUp } size={20} margin={10} />
              {"  "}1.3. {DICTIONARY.HELP_wheelSettingsTitle}</Text>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.isCollapsed["1.3"]}>

          <Text style={globalStyles.textStyle}>
{DICTIONARY.HELP_WS_paragraph1_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_WHEELSETTINGS}</Text>{DICTIONARY.HELP_WS_paragraph1_2}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SETTINGS}</Text>{DICTIONARY.HELP_WS_paragraph1_3}{"\n"}
{"\n"}
{DICTIONARY.HELP_WS_paragraph2}{"\n"}
{"\n"}
{DICTIONARY.HELP_WS_paragraph3}{"\n"}
{DICTIONARY.HELP_WS_paragraph4_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_SAVECHANGES}</Text>{DICTIONARY.HELP_WS_paragraph4_2}{"\n"}
{"\n"}
{DICTIONARY.HELP_WS_paragraph5_1}<Text style={{fontStyle: 'italic'}}>{DICTIONARY.HELP_BACKTOORIGINAL}</Text>{DICTIONARY.HELP_WS_paragraph5_2}
          </Text>
          </Collapsible>

          </Collapsible>

          

          <TouchableOpacity style={[globalStyles.sectionTitle1, {height: 85}]} onPress={() => this.changeCollapsedState("2")}>
            <Text style={globalStyles.h1Style}>
              <FontAwesomeIcon icon={ this.state.isCollapsed["2"]? faAngleDown : faAngleUp } size={20} margin={10}/>
              {"  "}2. {DICTIONARY.HELP_SRRecordingsTitle}</Text>
          </TouchableOpacity>

          <Collapsible collapsed={this.state.isCollapsed["2"]}>

            <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => this.changeCollapsedState("2.1")}>
              <Text style={globalStyles.h2Style}>
                <FontAwesomeIcon icon={ this.state.isCollapsed["2.1"]? faAngleDown : faAngleUp } size={20} margin={10} />
                {"  "}2.1. {DICTIONARY.HELP_fileFormatTitle}</Text>
            </TouchableOpacity>

            <Collapsible collapsed={this.state.isCollapsed["2.1"]}>

            <Text style={globalStyles.textStyle}>
  {DICTIONARY.HELP_FF_paragraph1 + "\n\n"}
  {DICTIONARY.HELP_FF_paragraph2 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_3 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_4 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_5 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_6 + "\n"}
  {'\u2022' + "...\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_7 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_8 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_9 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_10 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_11 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_12 + "\n"}
  {'\u2022' + DICTIONARY.HELP_FF_paragraph_13 + "\n"}
  {"\n" + DICTIONARY.HELP_FF_paragraph_14}
            </Text>

            <View style={{margin: 10}}>
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={this.state.headerOfTable} style={{height: 40, backgroundColor: '#f1f8ff'}} textStyle={{textAlign: 'center', margin: 4, fontWeight: 'bold'}}/>
                <Rows data={this.state.dataForTable} textStyle={{textAlign: 'center', margin: 4}}/>
              </Table>
            </View>

            <Text style={globalStyles.textStyle}>
  {DICTIONARY.HELP_FF_paragraph_15}
            </Text>

            </Collapsible>

            <TouchableOpacity style={globalStyles.sectionTitle2} onPress={() => this.changeCollapsedState("2.2")}>
              <Text style={globalStyles.h2Style}>
                <FontAwesomeIcon icon={ this.state.isCollapsed["2.2"]? faAngleDown : faAngleUp } size={20} margin={10} />
                {"  "}2.2. {DICTIONARY.HELP_APIRecordingTitle}</Text>
            </TouchableOpacity>

            <Collapsible collapsed={this.state.isCollapsed["2.2"]}>

            <Text style={globalStyles.textStyle}>
{DICTIONARY.HELP_API1}{"\n\n"}
{'[{\n"_key":"Test_9390_2021_7_26_15:39:38",\n"timestamp":"2021_7_26_15:39:38",\n"experiment-title":"Test",\n"em0":5,\n"em1":-1,\n...\n"em19":-1,\n"subject-id":0,\n"no-emotion":0,\n"comment":"My comment"\n}]'}
{"\n\n"}{DICTIONARY.HELP_API2}
            </Text>

            </Collapsible>

          </Collapsible>


          <View style={globalStyles.endPageButtonStyle}>
            <TouchableOpacity
                style={globalStyles.neutralButton}
                onPress={() => this.props.navigation.navigate('Home')} 
            ><Text style={globalStyles.neutralButtonText}>{DICTIONARY.HELP_BACK}</Text>
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






