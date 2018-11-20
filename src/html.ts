export const html = (body, preloadedState) => `
  <!DOCTYPE html>
  <html>
    <head>
      <link href="/dist/main.css" rel="stylesheet"></head>
    </head>
    <body>
      <div id="app">${body}</div>
    </body>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
    </script>
    <script src="/dist/main.js" defer></script>
  </html>
`;
