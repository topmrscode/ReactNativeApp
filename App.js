import React from 'react';
import Navigation from './Navigation'

// ----------------------------------
// CHARGEMENT DE LA BASE DE L'APPLI
// ----------------------------------

export default class App extends React.Component {
  render() {
      // Enlever les warning de l app
      console.disableYellowBox = true;
      //----------------
      return (<Navigation uirPerfix={'pictagram://'}/>);
  }
}

      