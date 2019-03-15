/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  WebView
} from 'react-native';

import createInvoke from 'react-native-webview-invoke/native'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class WebviewDataCommunicate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webViewData: ''
    };
    this.data = 0;
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }
  sendMessage() {
    this.webview.postMessage(++this.data);
  }
  handleMessage(e) {
    this.setState({ webViewData: e.nativeEvent.data });
  }

  respondToOnMessage = e => {
    console.log(e);
  };

  render() {
    const jsCode = `window.postMessage('test');`;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.sendMessage}
        >
          <Text>发送数据到WebView</Text>
        </TouchableHighlight>
        <View>
          <Text>来自WebView的数据: <Text>{this.state.webViewData}</Text></Text>
        </View>
        <WebView
          style={styles.webview}
          injectedJavaScript={jsCode}

          //source={require('./index.html')}
         // source={{ uri: 'http://google.com' }}
          source={{ uri: 'http://localhost:3000' }}



          ref={webview => this.webview = webview}
          onMessage={this.handleMessage}
          
        />

        {/* <WebView
          injectedJavaScript={jsCode}
          source={uri= 'http://localhost:3000/'}
onMessage={this.respondToOnMessage}
        /> */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 40
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: 250,
    height: 250
  }
});
