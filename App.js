import React, { Component } from 'react';
import { Text, View, StyleSheet , Picker, AppState, Platform } from 'react-native'
import PickerItem from "react-native-web/src/exports/Picker/PickerItem";
import PushController from './PushController.js'
import PushNotification from "react-native-push-notification"

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);

    this.state = {
      seconds: 5,
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange(appState){
    if(appState === 'background'){
      let date = new Date(Date.now() + (this.state.seconds * 1000));

      if(Platform.OS === 'ios'){
        date = date.toISOString()
      }

      PushNotification.localNotificationSchedule({
        message: "Hello World.",
        date: date,
      });
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>Choose your notification time in seconds.</Text>
          <Picker
          style={styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={(seconds) => this.setState({seconds})}
          >
            <PickerItem label="5" value={5}/>
            <PickerItem label="10" value={10}/>
            <PickerItem label="15" value={15}/>
          </Picker>
          <PushController/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  picker: {
    width: 100,
  }
});
