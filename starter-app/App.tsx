import React, { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

import Webview from './src/Webview';

const inAppUpdates = new SpInAppUpdates(false);

const App = () => {
  const _startUpdate = () => {
    const updateOptions = Platform.select({
      ios: {
        title: '업데이트 안내',
        message: '안정적인 서비스 사용을 위해\n최신 버전으로 업데이트 해주세요',
        buttonUpgradeText: '업데이트',
        forceUpgrade: true,
        country: 'kr',
        bundleId: 'com.ep.app',
      },
      android: {
        updateType: IAUUpdateKind.IMMEDIATE,
      },
    });
    if (!updateOptions) return;
    inAppUpdates.startUpdate(updateOptions).catch((err: Error) => {
      console.log('startUpdate error', err);
    });
  };

  const _checkUpdate = async () => {
    const curVersion = DeviceInfo.getVersion();
    const result = await inAppUpdates
      .checkNeedsUpdate({ curVersion })
      .catch((e: Error) => {
        console.log('checkNeedsUpdate e : ', e);
      });
    if (result && result.shouldUpdate) {
      _startUpdate();
    }
  };

  useEffect(() => {
    _checkUpdate().catch((e: Error) => {
      console.log('_checkUpdate e : ', e);
    });

    const callback = (status: AppStateStatus) => {
      if (status === 'active') {
      }
    };
    callback(AppState.currentState);
    const listener = AppState.addEventListener('change', callback);
    return () => listener.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Webview />;
};

export default App;
