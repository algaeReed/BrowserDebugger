const VCONSOLE_SCRIPT = `  
(function() {  
  var script = document.createElement('script');  
  script.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js';  
  script.onload = function() {  
    var vConsole = new VConsole();  
  };  
  document.body.appendChild(script);  
  
  window.ReactNativeWebView.postMessage('VCONSOLE_SCRIPT');  
})();  
`;

const No_URL_found = `  
<!DOCTYPE html>  
<html>  
<head>  
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />  
  <style>  
    body {  
      overflow: hidden;  
    }  
  </style>  
</head>  
<body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: lightgrey;">  
  <div style="text-align: center;">  
    <h1>No URL found</h1>  
    <p>Please set a URL in the app settings.</p>  
    <button onclick="window.ReactNativeWebView.postMessage('refresh');" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer; display: none;">  
      Refresh  
    </button>  
    <button onclick="window.ReactNativeWebView.postMessage('setting');" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer;">  
      Setting  
    </button>  
  </div>  
</body>  
</html>  
`;

const Error_loading_content = `  
<!DOCTYPE html>  
<html>  
<head>  
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />  
  <style>  
    body {  
      overflow: hidden;  
    }  
  </style>  
</head>  
<body style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: lightgrey;">  
  <div style="text-align: center;">  
    <h1>Error loading content</h1>  
    <p>There was an error loading the content. Please try again later.</p>  
    <button onclick="window.ReactNativeWebView.postMessage('refresh');" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer;">  
      Refresh  
    </button>  
  </div>  
</body>  
</html>  
`;

export { Error_loading_content, No_URL_found, VCONSOLE_SCRIPT };
