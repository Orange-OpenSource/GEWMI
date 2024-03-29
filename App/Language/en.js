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

export default {
  // NAVIGATION Titles
  NAVIGATION_homeTitle: 'Presentation - Emotion Wheel',
  NAVIGATION_selfReportTitle: 'Self-Report',
  NAVIGATION_settingTitle: 'Settings',
  NAVIGATION_helpTitle: 'Help - Instructions',
  NAVIGATION_experimentSettingsTitle: 'Experiment Settings',
  NAVIGATION_wheelSettingsTitle: 'Wheel Settings',

  // HOME Page
  HOME_presentation: 'Our emotional responses are very complicated or blended sometimes, and they can incorporate many different components.\n\nPlease select on the wheel the main emotions that contributed to your emotional state. After clicking on an emotion, you will be asked to choose the intensity with which you felt it.\n\nIf the emotional state you experienced is very different from those proposed on the wheel, please select the button "Other" in the center of the wheel.',
  HOME_references: 'References:',
  HOME_referenceContent1: ' Scherer, K. R. (2005). What are emotions? And how can they be measured? Social Science Information, 44(4), 693-727.',
  HOME_referenceContent2: ' Scherer, K.R., Shuman, V., Fontaine, J.R.J, & Soriano, C. (2013). The GRID meets the Wheel: Assessing emotional feeling via self-report. In Johnny R.J. Fontaine, Klaus R.',

  // SETTINGS Page
  SETTING_experimentMode: "Experiment mode",
  SETTING_selectedMode: "Selected mode: ",
  SETTING_individualMode: "Individual",
  SETTING_experimentationMode: "Experimentation",
  SETTING_subjectsIdentification: "Subjects identification:",
  SETTING_autoincrementIdentification: "Auto-Increment",
  SETTING_manualIdentification: "Manual",
  SETTING_selfreportRecordings: "Recordings",
  SETTING_saveMode: "Data recording mode:",
  SETTING_saveModeLocal: "Local",
  SETTING_saveModeAPI: "Online (API)",
  SETTING_APILink: "API URL:",
  SETTING_APItoken: "Authorization token:",
  SETTING_changesSaved: "Your modification has been saved",
  SETTING_selfreportSettings: "Self-Reports Settings",
  SETTING_nbEmotionsMax: 'Maximum number of selectable emotions: ',
  SETTING_nbEmotionsMin: 'Minimum number of selectable emotions: ',
  SETTING_selectedColors: 'Emotions colors on the wheel: ',
  SETTING_greyLevels: 'Grey Levels',
  SETTING_color: 'Colors',
  SETTING_selectedLanguage: 'Selected language: ',
  SETTING_wheelSettingsButton: "Wheel Settings",
  SETTING_backButton: 'Back',

  // SELF REPORT Page
  SELFREPORT_noRunningExperiment: "No running experiment.",
  SELFREPORT_startExperimentInstructions: "In order to start a new experiment, please go to the experiment settings by clicking on three lines in the upper-right corner of your screen.",
  SELFREPORT_noSubjectSpecified: "You are in manual mode for subjects' IDs, but you didn't enter a subject ID.",
  SELFREPORT_specifySubjectInstruction: "In order to enter a subject ID, please go to the experiment settings by clicking on three lines in the upper-right corner of your screen.",
  SELFREPORT_changeSubjectModeInstruction: "If you wish to change to auto-increment mode for subjects' IDs, go to the SETTINGS page.",
  SELFREPORT_instructionsBeginning1: 'Please select ',
  SELFREPORT_instructionsBeginning2: 'Please select between ',
  SELFREPORT_instructionsAnd: " and ",
  SELFREPORT_instructionsEnd: " emotion(s) by clicking on the circles, or click on \"NO EMOTION\".",
  SELFREPORT_nbSelectedEmotions: "Number of selected emotions: ",
  SELFREPORT_noEmotionButton: "No Emotion",
  SELFREPORT_validateButton: 'Confirm you choices',

  SELFREPORT_storageAccessTitle: "Storage Access",
  SELFREPORT_storageAccessMessage: "In order to save the results, this application needs your permission to access files on your device.",
  SELFREPORT_noEmotion: "no emotion",

  SELFREPORT_alertSaveTitle: "Recording",
  SELFREPORT_alertSaveMessage: "Choices saved in the Download folder in your default storage folder.\nThe name and format of the file are specified in the Help page (accessible from the Home page of this app).",
  SELFREPORT_messageSavedSuccessful: "Emotions successfully saved",
  SELFREPORT_alertNotSavedTitle: "Error While Saving Choices",
  SELFREPORT_alertNotSavedMessage: "Choices couldn't be saved because you didn't allow the app to write files on your device.",
  SELFREPORT_alertWarningTitle: "Warning",
  SELFREPORT_alertWarningMessage1: "You have to select ",
  SELFREPORT_alertWarningMessage2: " emotion(s)",
  SELFREPORT_messageAPIError: "Error while saving to API",
  SELFREPORT_alertErrorPostAPITitle: "Error while POSTing to the API (step 1)",
  SELFREPORT_alertErrorPostAPIMessage: "Error code: ",
  SELFREPORT_alertErrorPatchAPITitle: "Error while PATCHing to the API (step 2)",
  SELFREPORT_alertErrorPatchAPIMessage: "Step 1 (POST to API) worked correctly. Error code for step 2: ",

  SELFREPORT_saveOther: "other:",

  // WHEEL Component
  WHEEL_alertWarningTitle: "Warning",
  WHEEL_alertWarningMessage1: "You can select ",
  WHEEL_alertWarningMessage2: " value(s) only.",
  WHEEL_alertWarningMessage3: " 'other' emotions only.",

  WHEEL_otherButton: "Other",
  WHEEL_otherEmotion: "Other emotion(s):",
  WHEEL_otherEmotionDialogTitle: "Other emotion",
  WHEEL_otherEmotionDialogMessage: "Enter another emotion.",
  WHEEL_otherEmotionDialogSend: "Send",
  WHEEL_otherEmotionCancel: "Cancel",

  WHEEL_noEmotion: "No emotion",

  // INTENSITY Component
  INTENSITY_selectIntensity: "Please select the intensity of the emotion you felt:",
  INTENSITY_returnButton: "Back",

  // EMOTION Component
  EMOTION_alertWarningTitle: "Warning",
  EMOTION_alertWarningMessage1: "You can select ",
  EMOTION_alertWarningMessage2: " value(s) only.",

  // EMOTION items
  EMOTION_LABELS:{
    0:"Interest",
    1:"Amusement",
    2:"Pride",
    3:"Joy",
    4:"Pleasure",
    5:"Contentment",
    6:"Love",
    7:"Admiration",
    8:"Relief",
    9:"Compassion",
    10:"Sadness",
    11:"Guilt",
    12:"Regret",
    13:"Shame",
    14:"Disappointment",
    15:"Fear",
    16:"Disgust",
    17:"Contempt",
    18:"Hate",
    19:"Anger"
  },

  // EXPERIMENT SETTINGS Component
  EXPE_SETTINGS_noRunningExperiment: "No running experiment.",
  EXPE_SETTINGS_startNewExperiment: "Start new experiment:",
  EXPE_SETTINGS_expeTitlePlaceholder: "Your experiment's title",
  EXPE_SETTINGS_startExpeButton: "Start",
  EXPE_SETTINGS_runningExperiment: "Running experiment: ",
  EXPE_SETTINGS_stopExpeButton: "Stop Experiment",
  EXPE_SETTINGS_evaluatedSubjectId: "ID of currently evaluated subject: ",
  EXPE_SETTINGS_noCurrentSubject: "No subject currently evaluated.",
  EXPE_SETTINGS_subjectIdPlaceholder: "You subject's ID",
  EXPE_SETTINGS_newSubject: "New Subject",
  EXPE_SETTINGS_addComment: "Add a comment to the last self-report which was recorded:",
  EXPE_SETTINGS_commentPlaceholder: "Write your comment here (without commas or ends of line)",
  EXPE_SETTINGS_saveComment: "Save comment",
  EXPE_SETTINGS_alertNoSelfReportTitle: "Warning",
  EXPE_SETTINGS_alertNoSelfReportMessage: "Be careful, you have to save a self-report before you make a comment about it!",
  EXPE_SETTINGS_alertErrorPatchAPITitle: "Error while PATCHing comment to API",
  EXPE_SETTINGS_alertErrorPatchAPIMessage: "Error code: ",
  EXPE_SETTINGS_alertSaveMessage: "The comment has been added to the last self-report you made.",
  EXPE_SETTINGS_alertNotSavedTitle: "Error While Saving Comment",
  EXPE_SETTINGS_alertNotSavedMessage: "The comment couldn't be saved because you didn't allow the app to write files on your device.",

  // WHEEL SETTINGS Component
  WHEEL_SETTINGS_paragraph1: "If you want to change the label or color of an emotion (only in colored mode), change it in the text input and then click on the blue icon \"validate\" in order to save your changes. If you change several emotions, be careful to click on this button for EACH emotion you modified.",
  WHEEL_SETTINGS_paragraph2: "If you change the color of an emotion, be careful to provide an existing color (the name of the color or an hex code) or it will be displayed with no color on the wheel.",
  WHEEL_SETTINGS_paragraph3: "Click on the trash if you want to delete an emotion.",
  WHEEL_SETTINGS_paragraph4: "If you don't click on the \"SAVE CHANGES\" button at the end of the page, your modifications will be discarded when you close the app.",
  WHEEL_SETTINGS_paragraph5: "You can find hexadecimal color codes on the following link: ",
  WHEEL_SETTINGS_paragraph6: "Add a new emotion:",
  WHEEL_SETTINGS_message_emotion_deleted: "Emotion deleted",
  WHEEL_SETTINGS_message_emotion_added: "Emotion added",
  WHEEL_SETTINGS_message_changes_saved: "Changes saved",
  WHEEL_SETTINGS_emotion: "Emotion",
  WHEEL_SETTINGS_color: "Color",
  WHEEL_SETTINGS_clear_OK_message: "Close this app in order to go back to the original wheel!",
  WHEEL_SETTINGS_clear_error_message: "Error while deleting emotions data from storage.",
  WHEEL_SETTINGS_clear_message: "Go back to original wheel (requires you to restart the app after clicking on this button):",
  WHEEL_SETTINGS_clear_button: "Back to original",


  // HELP Component
  // Buttons and pages names
  HELP_SELFREPORT: "SELF-REPORT",
  HELP_SETTINGS: "SETTINGS",
  HELP_BACK: "BACK",
  HELP_OTHER: "OTHER",
  HELP_other: "other",
  HELP_NOEMOTION: "NO EMOTION",
  HELP_CONFIRMCHOICES: "CONFIRM YOUR CHOICES",
  HELP_Download: "Download",
  HELP_SAVECHANGES: "SAVE CHANGES",
  HELP_START: "START",
  HELP_STOP: "STOP",
  HELP_NEWSUBJECT: "NEW SUBJECT",
  HELP_WHEELSETTINGS: "WHEEL SETTINGS",
  HELP_BACKTOORIGINAL: "BACK TO ORIGINAL",
  HELP_SAVECOMMENT: "SAVE COMMENT",

  HELP_intro: "You can find all the following instructions with illustrative images in the README.md file, at the root of the project.",

  HELP_usingAppTitle: "Using the App",
  HELP_UA_paragraph_1: "When you run the app, you see first the home page with a short description of the app principles, and two buttons to access the ",
  HELP_UA_paragraph_2: " or the ",
  HELP_UA_paragraph_3: "Below are given the scientific sources for this work.",

  HELP_selfReportTitle: "Self-Report",
  HELP_individualModeTitle: "Individual Mode",
  HELP_SR_paragraph1_1: "The ",
  HELP_SR_paragraph1_2: " page allows you to select some emotions on the wheel.",
  HELP_SR_paragraph2_1: "When you click on an emotion, you are redirected to a new page where you can select the corresponding intensity. Then you can select an intensity or go ",
  HELP_SR_paragraph2_2: " to the wheel (this will discard your changes).",
  HELP_SR_paragraph2_3: "If you want to delete an emotion you selected, you just have to click again on this emotion.",
  HELP_SR_paragraph2_4: "If you want to change the intensity of an emotion you selected, you have to delete it first (by clicking on it), and then add it again by clicking on it for the second time in a row.",
  HELP_SR_paragraph3_1: "If you don't find the emotion you (or the subject of your experiment) feeled on the wheel, then you can add an ",
  HELP_SR_paragraph3_2: " emotion by clicking on the corresponding button in the center of the wheel. You are asked to enter the name of this new emotion, and then select an intensity. After that, you will see below the ",
  HELP_SR_paragraph3_3: " button in the center of the wheel, the number of ",
  HELP_SR_paragraph3_4: " emotions you entered, and you can click on the eye to see the details of these other emotions and manage them. You can only add up to 2 ",
  HELP_SR_paragraph3_5: " emotions.",
  HELP_SR_paragraph4_1: "If you (or your subject) didn't feel any emotion, you can click on the ",
  HELP_SR_paragraph4_2: " button. If you selected some emotions on the wheel or added ",
  HELP_SR_paragraph4_3: " emotions before, this action will clear everything.",
  HELP_SR_paragraph5_1: "When you are sure you entered all of your (or your subject's) emotions, you can click on ",
  HELP_SR_paragraph5_2: ". In order to be able to save the self-report, you will need to have selected ",
  HELP_SR_paragraph5_3: " or between the minimum and maximum of emotions (this can be changed in the ",
  HELP_SR_paragraph5_4: " page).",
  HELP_SR_paragraph5_5: "The first time, you will be asked to give the app the permission to write new files on your device.",
  HELP_SR_paragraph5_6: "The file with the list of emotions you entered will be available in the ",
  HELP_SR_paragraph5_7: " folder of your device.",
  HELP_SR_paragraph5_8: "The format of this file will be described in the ",
  HELP_SR_paragraph5_9: " section below.",
  HELP_experimentationModeTitle: "Specificities of Experimentation Mode",
  HELP_SR_paragraph6_1: "In experimentation mode, when you arrive on the ",
  HELP_SR_paragraph6_2: " page, you see a message indicating that you have to start a new experiment before you can do a self-report.",
  HELP_SR_paragraph7_1: "The ",
  HELP_SR_paragraph7_2: "Experiment Settings",
  HELP_SR_paragraph7_3: " can be accessed by clicking on the three bars in the upper-right corner of the screen. They are only visible in Experimentation Mode.",
  HELP_SR_paragraph8_1: "In this page you can start a new experiment by giving it a name and clicking on the ",
  HELP_SR_paragraph8_2: " button. You can ",
  HELP_SR_paragraph8_3: " the experiment on the same page. When you start a new experiment, all the self-reports are saved in the same file on your device. If you start again a new experiment with the same name, they will also be saved in the same file (even if you closed and re-launched the app). In order to save the self-reports in a new file, ",
  HELP_SR_paragraph8_4: " the experiment and choose a different name.",
  HELP_SR_paragraph9_1: "Then, if you selected the auto-increment mode for the subjects' IDs, you will see the ID of the next subject who will be evaluated (0, then 1, then 2, etc.). This number will be incremented when a self-report is saved.",
  HELP_SR_paragraph9_2: "If you chose the manual mode for the subjects' IDs, you will have to enter an ID and click on ",
  HELP_SR_paragraph9_3: ". If you don't do that, you won't see the wheel on the ",
  HELP_SR_paragraph9_4: " screen, but a message to explain that you have to select a subject ID.",
  HELP_SR_paragraph9_5: "In manual mode, as long as you don't change the subject's ID, each line in the self-report file will be saved with the same ID. You have to remember to change the subject's ID for each new subject.",
  HELP_SR_paragraph10_1: "It is possible to add a comment (optional) to the last self-report you saved. You have to write it without commas or ends of line (they will be removed before the comment is saved). After writing a comment, click on the ",
  HELP_SR_paragraph10_2: " button. The comment will be added at the end of the last self-report row in the CSV file, or in the last JSON record on your API if you chose the online recording mode. In that case, if you add several comments for only one self-report, ONLY THE LAST COMMENT WILL BE KEPT.",
  HELP_SR_paragraph11_1: "Once you have set the experiment parameters, you can either click on the ",
  HELP_SR_paragraph11_2: " button or on the back arrow on top of your screen. The settings will be saved whatever you do.",
  HELP_SR_paragraph12_1: "Then the wheel appears, and it works the same way than in individual mode (see the ",
  HELP_SR_paragraph12_2: " section above).",

  HELP_settingsTitle: "Settings",
  HELP_S_paragraph1_1: "The ",
  HELP_S_paragraph1_2: " page allows you to change some parameters in the app.",
  HELP_S_paragraph2: "You can select the self-report mode: in INDIVIDUAL mode, each self-report will be saved in a new file on your device; in EXPERIMENTATION mode, you will have to give a name to your experiment, and each self-report will be saved as a new line in the same file.",
  HELP_S_paragraph3: "If the EXPERIMENTATION mode is on, you will see an additionnal setting: you can choose to enter the ID of each subject yourself during the experiment (in this case you can have several self-reports for the same subject), or to let the app increment the subject's ID at each new self-report.",
  HELP_S_paragraph4_1: "You can either choose to save your self-reports locally (then you will find them in CSV files under the Download folder of your device, see ",
  HELP_S_paragraph4_2: " for more details) or online, as JSON records in your own API (see ",
  HELP_S_paragraph4_3: " for more details).",
  HELP_S_paragraph5: "If you choose to save your self-reports online, you will see two new blanks to fill with your API URL and the authorization token if there is one.",
  HELP_S_paragraph6_1: "You can change the minimum and maximum of selectable emotions on the wheel (the minimum will have to be below or equal to the maximum).",
  HELP_S_paragraph6_2: "You can change the colors on the wheel: it can be displayed in grey levels or in colors.",
  HELP_S_paragraph6_3: "You can change the language to English or French. This will change the language in the entire app and on the wheel, but not the saved files (the format is standard regardless of the language, and it is described in the ",
  HELP_S_paragraph6_4: " section below).",
  HELP_S_paragraph7_1: "You can access the ",
  HELP_S_paragraph7_2: " (see paragraph below).",
  HELP_S_paragraph8_1: "Then you can click on the ",
  HELP_S_paragraph8_2: " button or the back arrow on top of your screen: both will keep your changes and they will be saved so when you open the app again, your preferences are remembered.",

  HELP_wheelSettingsTitle: "Wheel Settings",
  HELP_WS_paragraph1_1: "The ",
  HELP_WS_paragraph1_2: " page is accessible from the button at the end of the ",
  HELP_WS_paragraph1_3: " page.",
  HELP_WS_paragraph2: "It allows you to customize the Emotion Wheel. You can edit the label and the color (you can't change the grey levels color though) of an emotion. You can also delete it or add a new emotion to the wheel (at the bottom of the page).",
  HELP_WS_paragraph3: "If you choose to edit an emotion (label and/or color), you have to click on the blue \"validate\" button on the right of the emotion in order to validate your changes. If you edit several emotions, you will have to do it for each one.",
  HELP_WS_paragraph4_1: "When you finish editing the wheel parameters, click on the ",
  HELP_WS_paragraph4_2: " button at the bottom of the page if you want them to be remembered when you leave the app. If you don't do it, your customized wheel will be discarded when you leave the app.",
  HELP_WS_paragraph5_1: "If you want to go back to the original wheel, just click on the ",
  HELP_WS_paragraph5_2: " button, then leave the app and run it again.",

  HELP_SRRecordingsTitle: "Self-Report Recordings",

  HELP_fileFormatTitle: "Local Recordings",
  HELP_FF_paragraph1: "The files are saved under the Download folder in the default storage folder of your device.\nIn individual mode, they are named \"emotion_wheel_YYYY_MM_DD_hh:mm:ss.txt\", with YYYY_MM_DD_hh:mm:ss the exact date and time the self-report was saved.\nIn experimentation mode, they are named \"emotion_wheel_YourExperimentTitle.txt\".",
  HELP_FF_paragraph2: "The saved files are in a standard CSV format.\nThe headers are:",
  HELP_FF_paragraph_3: "subject-id: only visible in experimentation mode; the ID of the subject evaluated",
  HELP_FF_paragraph_4: "timestamp: the time when the self report was made",
  HELP_FF_paragraph_5: "em0: the intensity for the 1st emotion, or -1 if it wasn't selected",
  HELP_FF_paragraph_6: "em1: the intensity for the 2nd emotion, or -1 if it wasn't selected",
  HELP_FF_paragraph_7: "em19: the intensity for the 19th emotion, or -1 if it wasn't selected",
  HELP_FF_paragraph_8: "other1-label: the label of the 1st other emotion you entered, or nothing if you did'nt enter one",
  HELP_FF_paragraph_9: "other1-intensity: the intensity of the 1st other emotion you entered, or nothing if you did'nt enter one",
  HELP_FF_paragraph_10: "other2-label: the label of the 2nd other emotion you entered, or nothing if you did'nt enter one",
  HELP_FF_paragraph_11: "other2-intensity: the intensity of the 2nd other emotion you entered, or nothing if you did'nt enter one",
  HELP_FF_paragraph_12: "no-emotion: 1 if the user declared \"no emotion\", 0 otherwise",
  HELP_FF_paragraph_13: "comment: the comment you added to the self-report, if there is one",
  HELP_FF_paragraph_14: "The emotions are ordered as follows (assuming you didn't change them in the wheel parameters):",

  HELP_table_emotionIndex: "Emotion Index",
  HELP_table_emotionLabelEN: "Emotion Label (EN)",
  HELP_table_emotionLabelFR: "Emotion Label (FR)",

  HELP_FF_paragraph_15: "In individual mode, each self-report is saved in a new file.\nIn experimentation mode, as long as you don't change the experimentation name, each self-report will be saved as a new line in the same file.",

  HELP_APIRecordingTitle: "Online recordings to API",
  HELP_API1: 'In order to save self-reports to an online API instead of your device, you have to select the "API" mode in the Settings page, and then give the API URL and the authorization token if there is one.\n\nThe self-reports are then saved under the JSON format, on the API. You will need to have an internet connexion, or when you validate a self-report the operation will fail.\n\nThe JSON format for self-reports is the following:',
  HELP_API2: 'The key ("_key") is a unique identifier for each self-report saved to the API. It comprises the experiment title if there is one, a unique identifier generated when you installed the app, and the date and time the self-report was saved.\nThe other keys match the ones of the CSV format.',
};
