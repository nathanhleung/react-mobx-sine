(() => {
  const { observable, computed, observer } = mobx;

  class AppStore {
    @observable value = '';

    constructor() {
      mobx.autorun(() => console.log(this.report));
    }

    @computed get degrees() {
      return Number(this.value) % 360;
    }

    calculate(func) {
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

    report() {
      if (isNaN(this.degrees)) {
  	    return 'Please enter a number';
  	  }
      let resultString = '';
	    resultString += `sin(${this.degrees}) = ${this.sin}\n`;
	    resultString += `cos(${this.degrees}) = ${this.cos}`;
      return resultString;
    }

    changeValue(newValue) {
      this.value = newValue;
    }
  }

  const appStore = new AppStore();

  @observer
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      };
    }
    onChange(e) {
      console.log(e);
    }
    render() {
      const store = this.props.store;
      return (
        <div>
          <input
            type='text'
            placeholder='Enter degress'
            value={this.state.value}
            onChange={(e) => this.onChange(e)}
          />
          {store.report}
        </div>
      );
    }
  }

  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
})();
