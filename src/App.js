import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const client_id = 24120;
var code = new URLSearchParams(document.location.search).get('code');

if (code) {
  console.log(
    'found a redirect code (assuming from bungo) -- attempting to get an auth token.'
  );
  let data = `client_id=${client_id}&grant_type=authorization_code&code=${code}`;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      console.log(this.responseText);
      debugger;
    }
  });

  xhr.open('POST', 'https://www.bungie.net/platform/app/oauth/token/');
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('cache-control', 'no-cache');

  xhr.send(data);
} else {
  let url = `https://www.bungie.net/en/OAuth/Authorize?client_id=${client_id}&response_type=code`;
  window.location.href = url;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">spin spin spin</h1>
        </header>
        <p className="App-intro">Authorizing in progress.</p>
      </div>
    );
  }
}

export default App;
