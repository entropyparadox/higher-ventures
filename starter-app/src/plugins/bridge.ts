import { RefObject } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

export enum Action {
  SET_ISWEBVIEW = 'setIsWebView',
  REDIRECT_URL = 'redirectUrl',
}

interface Command {
  action: Exclude<
    keyof typeof Bridge,
    'prototype' | 'webView' | 'postMessage' | 'handleMessageEvent'
  >;
  value?: any;
}

export class Bridge {
  static webView: RefObject<WebView>;

  static postMessage(action: Action, value?: any) {
    const message = JSON.stringify({ action, value, kind: 'webview' });
    Bridge.webView.current?.postMessage(message);
  }

  static handleMessageEvent({ nativeEvent: { data } }: WebViewMessageEvent) {
    const command = JSON.parse(data) as Command;
    if (Bridge[command.action]) {
      (Bridge[command.action] as (value: any) => void)(command.value);
    } else {
      console.error('(WebView -> RN) Invalid action:', data);
    }
  }

  static log(value: any) {
    console.log(value);
  }

  static error(value: any) {
    console.error(value);
  }

  static redirect(url: string) {
    Bridge.postMessage(Action.REDIRECT_URL, url);
  }

  static setIsWebView() {
    Bridge.postMessage(Action.SET_ISWEBVIEW, true);
  }
}
