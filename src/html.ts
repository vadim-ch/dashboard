export const html = (body, preloadedState, helmet) => `
  <!DOCTYPE html>
  <html>
    <head ${helmet.htmlAttributes.toString()}>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      <link href="/dist/main.css" rel="stylesheet"></head>
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="app">${body}</div>
    </body>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
    </script>
    <script src="/dist/main.js" defer></script>
  </html>
`;
