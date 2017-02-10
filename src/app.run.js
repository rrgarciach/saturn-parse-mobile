'use strict';

export default function run($ionicPlatform, Parse) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      // Initialize Parse
      Parse.initialize('saturn-id', 'saturn-master-key');
      Parse.serverURL = 'https://saturn-parse-server-dev.herokuapp.com/parse';
  });
};
