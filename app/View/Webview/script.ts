const VCONSOLE_SCRIPT = `
  (function() {
    var script = document.createElement('script');
    script.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js';
    script.onload = function() {
      var vConsole = new VConsole();
    };
    document.body.appendChild(script);
  })();
`;

export { VCONSOLE_SCRIPT };
