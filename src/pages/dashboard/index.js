import React, { Component } from 'react';
import { getJson } from '../../common/http'

class Dashboard extends Component {
  state = {
    missions: []
  };

  async componentWillMount() {
      const missions = await getJson('/missions');
      this.setState({ missions });
  }

  render() {
    const missions = this.state.missions;
    return (
      <div>
        <p>Dashboard</p>
          { missions.map(mission => <div>{mission.urls[0].catalog_fits}</div>)}
      </div>
    );
  }
}

export default Dashboard;
