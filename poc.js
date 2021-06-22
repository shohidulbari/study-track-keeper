const fetch = require('node-fetch');

// eslint-disable-next-line require-jsdoc
async function promiseTest() {
  const resp = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const respJson = await resp.json();
  console.log(respJson);
  console.log('This will print first');
}

promiseTest();
