(() => {
  const { Component, PropTypes } = React;
  const { observable, computed } = mobx;
  const { observer } = mobxReact;

  class AppStore {
    @observable value = '';

    constructor() {
      mobx.autorun(() => console.log(this.report));
    }

    @computed get degrees() {
      return Number(this.value) % 360;
    }

    calculate(func) {
      function factorial(n) {
    		if (n === 0) {
    	  	return 1;
    	  }
    	  return n * factorial(n - 1);
    	}
  	  const radians = this.degrees / (180 / Math.PI);
  	  let res = 0;
  	  // 100 is big enough without overflowing Number type
  	  // 200 doesn't work interestingly
  	  for (let i = 0; i < 100; i++) {
  	  	let pow = (2 * i);
  	    if (func === 'sin') {
  	    	pow += 1;
  	    }
  	  	const next = (Math.pow(radians, pow) / factorial(pow));
  	    if (i % 2 === 0) {
  	    	res += next;
  	    } else {
  	    	res -= next;
  	    }
  		}
  	  return Math.round(res * 1000) / 1000;
    }

    @computed get sin() {
      return this.calculate('sin');
    }

    @computed get cos() {
      return this.calculate('cos');
    }

    @computed get report() {
      if (isNaN(this.degrees)) {
  	    return {
          type: 'ERROR',
          message: 'Please enter a valid number.',
        }
  	  }
      return {
        type: 'SUCCESS',
        // return this.value because this.degrees has modulo 360 applied
        sin: `sin(${this.value || '0'}°) = ${this.sin}`,
        cos: `cos(${this.value || '0'}°) = ${this.cos}`,
      };
    }
  }

  const appStore = new AppStore();

  @observer
  class App extends Component {
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

  const root = document.getElementById('root');
  ReactDOM.render(<App store={appStore} />, root);
})();
