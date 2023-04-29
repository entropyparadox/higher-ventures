#!/bin/sh
cd android
./gradlew clean
cd ..
rm -rf node_modules
yarn cache clean
yarn install


rm -rf ~/Library/Developer/Xcode/DerivedData
cd ios
rm -rf Pods
pod deintegrate
pod install --repo-update
