  /*
   * To change this license header, choose License Headers in Project Properties.
   * To change this template file, choose Tools | Templates
   * and open the template in the editor.
   */
  
  function _getCDNPath(paths) {
    var cdnPath = 'https://www.oracle.com/webfolder/technetwork/jet/';
    var ojPath = 'js/libs/oj/v11.0.0/';
    var thirdpartyPath = 'js/libs/';
    var keys = Object.keys(paths);
    var newPaths = {};
    function _isoj(key) {
      return (key.indexOf('oj') === 0 && key !== 'ojdnd');
    }
    keys.forEach(function (key) {
      newPaths[key] = cdnPath + (_isoj(key) ? ojPath : thirdpartyPath) + paths[key];
    });
    return newPaths;
  }
  
  
  require.config({
    paths: _getCDNPath({
      ojs: 'debug',
      ojL10n: 'ojL10n',
      ojtranslations: 'resources',
      
    'knockout': 'knockout/knockout-3.5.1',
    'knockout-mapping': 'knockout/knockout.mapping-latest',
    'jquery': 'jquery/jquery-3.6.0.min',
    'jqueryui-amd': 'jquery/jqueryui-amd-1.12.1.min',
    'text': 'require/text',
    'hammerjs': 'hammer/hammer-2.0.8.min',
    'signals': 'js-signals/signals.min',
    'ojdnd': 'dnd-polyfill/dnd-polyfill-1.0.2.min',
    'css': 'require-css/css.min',
    'css-builder': 'require-css/css-builder',
    'normalize': 'require-css/normalize',
    'preact': 'preact/dist/preact.umd',
    'preact/hooks': 'preact/hooks/dist/hooks.umd',
    'proj4': 'proj4js/dist/proj4',
    'touchr': 'touchr/touchr',
      chai: 'chai/chai-4.3.4.min'
    })
  });
  
  requirejs.config({
    baseUrl: '../js',
      // Path mappings for the logical module names
    paths: {
    },
      // Shim configurations for modules that do not expose AMD
    shim: {
      jquery: {
        exports: ['jQuery', '$']
      },
      maps: {
        deps: ['jquery', 'i18n'],
      }
    },
      // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
      // resources with a custom translation file.
      // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
      // a path that is relative to the location of this main.js file.
    config: {
      ojL10n: {
        merge: {
                  // 'ojtranslations/nls/ojtranslations': 'resources/nls/menu'
        }
      }
    }
  });