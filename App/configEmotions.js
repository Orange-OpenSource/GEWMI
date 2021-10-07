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

import { Config } from "./config.js"

var DICTIONARY = Config.DICTIONARY[Config.SELECTED_LANGUAGE]

export var ConfigEmotions = {
  selectedColorIndex: 0,

    // V3 version with Grey levels (0) or V3 version with Colors (1)
    EMOTIONS : {
      "1":{
        tag: DICTIONARY.EMOTION_LABELS[0],
        color: ['#FFFFFF', '#f07530'],
        textColor: '#E8E7E7',
        fontSize: 10,
      },
      "2":{
        tag: DICTIONARY.EMOTION_LABELS[1],
        color: ['#999999', '#f49e31'],
        textColor: '#191818',
        fontSize: 10,
      },
      "3":{
        tag: DICTIONARY.EMOTION_LABELS[2],
        color: ['#FFFFFF', '#fac932'],
        textColor: '#191818',
        fontSize: 10,
      },
      "4":{
        tag: DICTIONARY.EMOTION_LABELS[3],
        color: ['#999999', '#fff835'],
        textColor: '#191818',
        fontSize: 10,
      },
      "5":{
        tag: DICTIONARY.EMOTION_LABELS[4],
        color: ['#FFFFFF', '#e6f645'],
        textColor: '#191818',
        fontSize: 10,
      },
      "6":{
        tag: DICTIONARY.EMOTION_LABELS[5],
        color: ['#999999', '#d4de29'],
        textColor: '#191818',
        fontSize: 10, // 8
      },
      "7":{
        tag: DICTIONARY.EMOTION_LABELS[6],
        color: ['#FFFFFF', '#a6c31e'],
        textColor: '#191818',
        fontSize: 10,
      },
      "8":{
        tag: DICTIONARY.EMOTION_LABELS[7],
        color: ['#999999', '#7aaa13'],
        textColor: '#191818',
        fontSize: 10,
      },
      "9":{
        tag: DICTIONARY.EMOTION_LABELS[8],
        color: ['#FFFFFF', '#53900a'],
        textColor: '#191818',
        fontSize: 10,
      },
      "10":{
        tag: DICTIONARY.EMOTION_LABELS[9],
        color: ['#999999', '#387804'],
        textColor: '#191818',
        fontSize: 10,
      },
      "11":{
        tag: DICTIONARY.EMOTION_LABELS[10],
        color: ['#FFFFFF', '#2a6133'],
        textColor: '#191818',
        fontSize: 10, // 9
      },
      "12":{
        tag: DICTIONARY.EMOTION_LABELS[11],
        color: ['#999999', '#184d64'],
        textColor: '#191818',
        fontSize: 10,
      },
      "13":{
        tag: DICTIONARY.EMOTION_LABELS[12],
        color: ['#FFFFFF', '#003f97'],
        textColor: '#E8E7E7',
        fontSize: 10,
      },
      "14":{
        tag: DICTIONARY.EMOTION_LABELS[13],
        color: ['#999999', '#003ec9'],
        textColor: '#E8E7E7',
        fontSize: 10,
      },
      "15":{
        tag: DICTIONARY.EMOTION_LABELS[14],
        color: ['#FFFFFF', '#0048fb'],
        textColor: '#E8E7E7',
        fontSize: 10,
      },
      "16":{
        tag: DICTIONARY.EMOTION_LABELS[15],
        color: ['#999999', '#1939c9'],
        textColor: '#E8E7E7',
        fontSize: 10,
      },
      "17":{
        tag: DICTIONARY.EMOTION_LABELS[16],
        color: ['#FFFFFF', '#5a2f97'],
        textColor: '#E8E7E7',
        fontSize: 10,
      },
      "18":{
        tag: DICTIONARY.EMOTION_LABELS[17],
        color: ['#999999', '#8d2f68'],
        textColor: '#E8E7E7',
        fontSize: 10,
      },
      "19":{
        tag: DICTIONARY.EMOTION_LABELS[18],
        color: ['#FFFFFF', '#be383f'],
        textColor: '#E8E7E7',
        fontSize: 10,
      },
      "20":{
        tag: DICTIONARY.EMOTION_LABELS[19],
        color: ['#999999', '#ed462f'],
        textColor: '#E8E7E7',
        fontSize: 10,
      },
    },
  
      
    
    // V3 version - White & grey
    /*
    EMOTIONS : {
    "1":{
      tag: "Intérêt",
      color: '#FFFFFF',
      textColor: '#E8E7E7',
      fontSize: 10,
    },
    "2":{
      tag: 'Amusement',
      color: '#999999',
      textColor: '#191818',
      fontSize: 10,
    },
    "3":{
      tag: 'Fierté',
      color: '#FFFFFF',
      textColor: '#191818',
      fontSize: 10,
    },
    "4":{
      tag: ' Joie ',
      color: '#999999',
      textColor: '#191818',
      fontSize: 10,
    },
    "5":{
      tag: 'Plaisir',
      color: '#FFFFFF',
      textColor: '#191818',
      fontSize: 10,
    },
    "6":{
      tag: 'Contentement',
      color: '#999999',
      textColor: '#191818',
      fontSize: 8,
    },
    "7":{
      tag: 'Amour',
      color: '#FFFFFF',
      textColor: '#191818',
      fontSize: 10,
    },
    "8":{
      tag: 'Admiration',
      color: '#999999',
      textColor: '#999999',
      fontSize: 10,
    },
    "9":{
      tag: "Soulagement",
      color: '#FFFFFF',
      textColor: '#191818',
      fontSize: 10,
    },
    "10":{
      tag: 'Compassion',
      color: '#999999',
      textColor: '#191818',
      fontSize: 10,
    },
    "11":{
      tag: 'Tristesse',
      color: '#FFFFFF',
      textColor: '#191818',
      fontSize: 9,
    },
    "12":{
      tag: 'Culpabilité',
      color: '#999999',
      textColor: '#191818',
      fontSize: 10,
    },
    "13":{
      tag: 'Regret',
      color: '#FFFFFF',
      textColor: '#E8E7E7',
      fontSize: 10,
    },
    "14":{
      tag: 'Honte',
      color: '#999999',
      textColor: '#E8E7E7',
      fontSize: 10,
    },
    "15":{
      tag: 'Déception',
      color: '#FFFFFF',
      textColor: '#E8E7E7',
      fontSize: 10,
    },
    "16":{
      tag: 'Peur',
      color: '#999999',
      textColor: '#E8E7E7',
      fontSize: 10,
    },
    "17":{
      tag: 'Dégout',
      color: '#FFFFFF',
      textColor: '#E8E7E7',
      fontSize: 10,
    },
    "18":{
      tag: 'Mépris',
      color: '#999999',
      textColor: '#E8E7E7',
      fontSize: 10,
    },
    "19":{
      tag: 'Haine',
      color: '#FFFFFF',
      textColor: '#E8E7E7',
      fontSize: 10,
    },
    "20":{
      tag: 'Colère',
      color: '#999999',
      textColor: '#E8E7E7',
      fontSize: 10,
    },
    */
  
    // CTC version - White & Grey
    /*
    EMOTIONS : {
      "1":{
        tag: "Intérêt",
        color: '#FFFFFF',
        textColor: '#191919',
        fontSize: 10,
      },
      "2":{
        tag: 'Joie',
        color: '#999999',
        textColor: '#191919',
        fontSize: 10,
      },
      "3":{
        tag: 'Fierté',
        color: '#FFFFFF',
        textColor: '#191919',
        fontSize: 10,
      },
      "4":{
        tag: ' Satisfaction ',
        color: '#999999',
        textColor: '#191919',
        fontSize: 10,
      },
      "5":{
        tag: 'Confiance',
        color: '#FFFFFF',
        textColor: '#191919',
        fontSize: 10,
      },
      "6":{
        tag: 'Soulagement',
        color: '#999999',
        textColor: '#191919',
        fontSize: 8,
      },
      "7":{
        tag: 'Contentement',
        color: '#FFFFFF',
        textColor: '#191919',
        fontSize: 10,
      },
      "8":{
        tag: 'Surprise',
        color: '#999999',
        textColor: '#191919',
        fontSize: 10,
      },
      "9":{
        tag: "Perplexité",
        color: '#FFFFFF',
        textColor: '#191919',
        fontSize: 10,
      },
      "10":{
        tag: 'Doute',
        color: '#999999',
        textColor: '#191919',
        fontSize: 10,
      },
      "11":{
        tag: 'Appréhension',
        color: '#FFFFFF',
        textColor: '#191919',
        fontSize: 9,
      },
      "12":{
        tag: 'Déception',
        color: '#999999',
        textColor: '#191919',
        fontSize: 10,
      },
      "13":{
        tag: 'Scepticisme',
        color: '#FFFFFF',
        textColor: '#191919',
        fontSize: 10,
      },
      "14":{
        tag: 'Contrariété',
        color: '#999999',
        textColor: '#191919',
        fontSize: 10,
      },
      "15":{
        tag: 'Irritation',
        color: '#FFFFFF',
        textColor: '#191919',
        fontSize: 10,
      },
      "16":{
        tag: 'Impatience',
        color: '#999999',
        textColor: '#191919',
        fontSize: 10,
      },*/
  }
