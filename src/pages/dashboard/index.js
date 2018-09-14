import React, { Component } from 'react';
import { getJson } from '../../common/http';
import Table from '../../common/components/table';

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
          <Table data={missions} />
      </div>
    );
  }
}

export default Dashboard;
