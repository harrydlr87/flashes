import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';
import './filter.css';
import getJson from "../../http/methods/get";

class Filter extends Component {
  state = {
    type: null,
    name: null,
    mission: null,
    typeOptions: null,
    missionOptions: null,
  };

  async componentWillMount() {
    const typeOptions = await getJson('/sources/field/src_type');
    const missionOptions = await getJson('/sources/field/mission');

    this.setState({ typeOptions, missionOptions });
  }

  onFilter = (name) => ({ target }) => {
    const newFilters = { ...this.state, [name]: target.value };
    this.setState(newFilters);
    return this.props.onFilter(newFilters);
  };

  render() {
    const { typeOptions, missionOptions } = this.state;

    return (
      <div className="filter">
        <section className="input-container">
          <div>
            <DebounceInput
              minLength={3}
              debounceTimeout={500}
              placeholder="Source name"
              onChange={this.onFilter('name')}
            />
          </div>
          {missionOptions && (
            <div>
              <select name="mission" onChange={this.onFilter('mission')} defaultValue="All missions">
                <option value="">All missions</option>
                { missionOptions.map((mission, index) => <option key={index} value={mission}>{mission}</option>)}
              </select>
            </div>
          )}

          {typeOptions && (
            <div>
              <select name="type" onChange={this.onFilter('type')} defaultValue="All types">
                <option value="">All types</option>
                { typeOptions.map((type, index) => <option key={index} value={type}>{type}</option>)}
              </select>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Filter;
