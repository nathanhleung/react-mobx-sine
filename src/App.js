import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object,
  };

  onChange(e) {
    this.props.store.value = e.target.value;
  }
  render() {
    const store = this.props.store;
    let body;
    if (store.report.type === 'ERROR') {
      body = (
        <span>{store.report.message}</span>
      );
    } else {
      body = (
        <div className='app--results'>
          <h2>{store.report.sin}</h2>
          <h2>{store.report.cos}</h2>
        </div>
      );
    }
    return (
      <div className="app">
        <h1>Approximate sin(x) and cos(x)</h1>
        <p>(using calculus, React, and MobX!)</p>
        <input
          className="app--input"
          type='text'
          placeholder='Enter degrees'
          value={store.value}
          onChange={(e) => this.onChange(e)}
        />
        <br />
        <br />
        <div>
          {body}
        </div>
      </div>
    );
  }
}
