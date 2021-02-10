/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ToastAndroid
} from 'react-native';
import auth, { firebase } from "@react-native-firebase/auth"

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [screen, setScreen] = useState('login');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  useEffect(() => {
    __isTheUserAuthenticated();
  }, []);

  const __isTheUserAuthenticated = () => {
    let user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
      setScreen('home');
    } else {
      setScreen('login');
    }
  };

  const _submitRegistrasi = async () => {
    console.log(inputEmail);
    console.log(inputPassword);

    try {
      let response = await auth().createUserWithEmailAndPassword(
        inputEmail,
        inputPassword
      )
      if (response && response.user) {
        setInputEmail('');
        setInputPassword('');
        Alert.alert("Success ✅", "Account created successfully")
        setScreen('home');
      }
    } catch (e) {
      setInputEmail('');
      setInputPassword('');
      ToastAndroid.show(response);
      console.error(e.message)
    }
  }

  const _submitLogin = async () => {
    if(inputEmail != '' && inputPassword != ''){
      try {
        let response = await auth().signInWithEmailAndPassword(inputEmail, inputPassword)
        if (response && response.user) {
          Alert.alert("Success ✅", "Authenticated successfully")
          setScreen('home');
        }
      } catch (e) {
        console.error(e.message)
      }
    }
  }

  if(screen == 'login'){
    return (
      <>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ marginBottom: 8, textAlign: 'center' }}>Login</Text>
          <TextInput placeholder="Email" style={{ marginBottom: 8, borderColor: '#AAAAAA', borderWidth: 1 }} value={inputEmail} onChangeText={email => setInputEmail(email)}/>
          <TextInput placeholder="Password" style={{ marginBottom: 8, borderColor: '#AAAAAA', borderWidth: 1 }} value={inputPassword} onChangeText={password => setInputPassword(password)}/>
          <Button title="Login" onPress={() => { _submitLogin() }}/>
          <TouchableOpacity onPress={() => { setScreen('registrasi') }} style={{ marginTop: 16 }}>
            <View>
            <Text style={{ textAlign: 'center' }}>Register</Text>
            </View>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
  else if(screen == 'registrasi'){
    return (
      <>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ paddingHorizontal: 16 }}>
          <Text style={{ marginBottom: 8, textAlign: 'center' }}>Registrasi</Text>
          <TextInput placeholder="Email" style={{ marginBottom: 8, borderColor: '#AAAAAA', borderWidth: 1 }} value={inputEmail} onChangeText={email => setInputEmail(email)}/>
          <TextInput placeholder="Password" style={{ marginBottom: 8, borderColor: '#AAAAAA', borderWidth: 1 }} value={inputPassword} onChangeText={password => setInputPassword(password)}/>
          <Button title="Submit" onPress={ () => { _submitRegistrasi() }}/>
          <TouchableOpacity onPress={() => { setScreen('login') }} style={{ marginTop: 16 }}>
            <View>
            <Text style={{ textAlign: 'center' }}>Kembali ke Login</Text>
            </View>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
  else if(screen == 'home'){
    return (
      <>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}>Home</Text>
            <Text style={{ textAlign: 'center' }}>{ firebase.auth().currentUser.email }</Text>
            <TouchableOpacity onPress={async () => { await firebase.auth().signOut(); setScreen('login') }} style={{ marginTop: 16 }}>
            <View>
            <Text style={{ textAlign: 'center' }}>Logout</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
