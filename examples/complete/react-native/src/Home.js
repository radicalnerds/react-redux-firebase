import React, { Component } from 'react';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import configureStore from './store'
const initialState = { firebase: { authError: null, auth: undefined }}
const store = configureStore(initialState)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  centering: {
   alignItems: 'center',
   justifyContent: 'center',
   padding: 8,
 },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

@firebaseConnect()
@connect(({ firebase }) => ({
  auth: pathToJS(firebase, 'auth')
}))
export default class SigninSampleApp extends Component {
  render() {
    const { auth } = this.props
    if (!isLoaded(auth)) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }
    if (!this.props.auth) {
      return (
        <View style={styles.container}>
          <Text style={{marginBottom: 20}}>
            Welcome!
          </Text>
          <Button
            title="Sign In"
            style={{width: 212, height: 48, backgroundColor: 'transparent'}}
            onPress={() => this._signIn()}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>
          Welcome {this.props.auth.displayName}
        </Text>
        <Text>
          Your email is: {this.props.auth.email}</Text>

        <View style={{marginTop: 50}}>
          <Button title="Log Out" onPress={() => this._signOut()} />
        </View>
      </View>
    );
  }

  _signIn() {
    const { auth } = this.props.firebase
    return auth()
      .signInWithEmailAndPassword('tj@email.com', 'password123')
      .then(() => {
        console.error('Logged In')
      })
      .catch((err) => {
        console.error('error authing with firebase:', err)
        return Promise.reject(err)
      })
  }
}
