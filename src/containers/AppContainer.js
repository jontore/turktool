import React, { Component } from 'react'
import axios from 'axios'
import App from '../components/App'
import config from '../config'
import queryString from 'qs'

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.loadImageURL = this.loadImageURL.bind(this);
    this.state = { imageURL: null };
  }

  componentDidMount() {
    this.loadImageURL();
  }

  loadImageURL() {
    // no server specified, use default cat pic
    if (config["server"] === null) {
      this.setState({ imageURL: require("../cat.jpg") });
    } else {
      // server is specified, get the imageURL from the API endpoint
      const taskId = this.props.match.params.taskId;
      const parsed = queryString.parse(this.props.location.search);

      const imageURL = `${config["server"]}${taskId}.jpg`;
      this.setState({
        imageURL: imageURL
      });
    }
  }

  render() {
    console.log(this.state.imageURL);
    return <App imageURL={this.state.imageURL} showHeader={true} showSidePanel={true}/>
  }
}
