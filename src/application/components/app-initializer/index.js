import React from "react";
import { connect } from "react-redux";
import { getUserData } from "../../store/actions";
import Auth from '../../../common/http/auth';

class AppInitializer extends React.Component {

  state = {
    appReady: false,
  };

  async componentWillMount() {
    const token = localStorage.getItem('token');
    if(token) {
      Auth.setCredentials({ token });
      const { error } = await this.props.getUserData(token);

      if(error) {
        Auth.removeCredentials();
        localStorage.removeItem('token');
      }

      this.setState({ appReady: true });
    }

    this.setState({ appReady: true });
  }

  render() {
    const { appReady } = this.state;
    return appReady ? this.props.children : null;
  }
}

const enhance = connect(null, { getUserData });

export default enhance(AppInitializer);
