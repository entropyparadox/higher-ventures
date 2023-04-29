import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  Linking,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import WebView from 'react-native-webview';
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';

import { Bridge } from './plugins/Bridge';

const INJECTED_JAVASCRIPT = `(function() {
    window.isWebview = true;
    })();`;

export default function Webview() {
  const isAndroid = Platform.OS === 'android';
  const WEB_URI = 'https://entropyparadox.com/';
  const [uri, setUri] = useState(WEB_URI);

  const webviewRef = useRef<WebView>(null);
  Bridge.webView = webviewRef;

  const _onShouldStartLoadWithRequest = (event: ShouldStartLoadRequest) => {
    if (
      event.url.startsWith('http://') ||
      event.url.startsWith('https://') ||
      event.url.startsWith('about:blank')
    ) {
      return true;
    }
    if (isAndroid) {
      SendIntentAndroid.openAppWithUri(event.url).catch(e =>
        Alert.alert('앱이 열리지 않았습니다.'),
      );
    } else {
      Linking.openURL(event.url).catch(err => {
        Alert.alert(
          '해당 앱이 설치되지 않았습니다. 앱 설치 후 다시 시도해주세요.',
        );
      });
    }
    return false;
  };

  const _onContentProcessDidTerminate = () => {
    if (webviewRef && webviewRef.current) {
      webviewRef.current.reload();
    }
  };

  const _androidBackAction = () => {
    if (webviewRef && webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    const androidBackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      _androidBackAction,
    );
    return () => androidBackHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <WebView
        ref={webviewRef}
        allowsBackForwardNavigationGestures={true}
        originWhitelist={['*']}
        onContentProcessDidTerminate={_onContentProcessDidTerminate}
        mediaPlaybackRequiresUserAction={false}
        source={{ uri }}
        thirdPartyCookiesEnabled={true}
        setSupportMultipleWindows={!isAndroid}
        onShouldStartLoadWithRequest={_onShouldStartLoadWithRequest}
        onMessage={event => Bridge.handleMessageEvent(event)}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
