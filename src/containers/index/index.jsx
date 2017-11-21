import React, { Component } from 'react';
import BreadcrumbCustom from '../../component/BreadcrumbCustom';

class App extends Component {
  render() {
    return (
      	<div id="index">
      		<BreadcrumbCustom breadcrumb={[]} />
      	</div>
    );
  }
}

export default App;