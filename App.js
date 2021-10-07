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
import Navigation from './App/Navigation/Navigation'
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux'
import Store from './App/Store/configureStore'

export default class App extends Component {
  
render() {
  
    // Pass in the app context the store wich will be sent to all children
    return (

        <Provider store={Store}>
          <Navigation/>
          <FlashMessage position="top" duration={5000} />
        </Provider>
        
      )
  }
}
