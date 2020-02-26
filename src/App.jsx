import React, { Component } from 'react';
import './App.css';

import ToolList from './components/tool/ToolList.jsx';
import tools from './usefulgarbage/tools.json';
import channels from './usefulgarbage/channels.json'

import VisibleMap from './containers/VisibleMap';
import { loadChannels } from './comm/communicationManager.js';
import { fetchData } from './comm/apiManager.js'





class App extends Component {

  constructor(props) {

    super(props);

    fetchData({
      url: "https://localhost:5001/",
      functionName: "MetaData",
      method: "Get"
    });
  }

  render() {

    console.log("channels:" + channels[0]);

    console.log(tools);
    return (
      <div>
        {/* <div><ToolList tools={tools}></ToolList></div>             */}
        <div>
          <div><VisibleMap></VisibleMap></div>

        </div>
      </div>
    )
  }
}

export default App;
