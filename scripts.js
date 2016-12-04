const app = (() => {
	const input = document.getElementById('input');
	const result = document.getElementById('result');
	const formulaSin = document.getElementById('formula-sin');
	const formulaCos = document.getElementById('formula-cos');

	submit();
	katex.render('sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + ...', formulaSin);
	katex.render('cos(x) = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + ...', formulaCos);

	function submit() {
		try {
	    const degrees = Number(input.value) % 360;
	    const sine = calculate(degrees, 'sin');
	    const cosine = calculate(degrees, 'cos');
	    let resultString = '';
	    resultString += `sin(${degrees}) = ${sine}\n`;
	    resultString += `cos(${degrees}) = ${cosine}`;
	    result.innerHTML = resultString;
	  } catch (err) {
	  	result.innerHTML = `Error: ${err.message}`;
	  }
	}

	function calculate(degrees, func) {
		if (isNaN(degrees)) {
	  	throw new Error('Please enter a number.');
	  }
	  const radians = degrees / (180 / Math.PI);
	  let res = 0;
	  // 100 is big enough without overflowing Number type
	  // 200 doesn't work interestingly
	  for (let i = 0; i < 100; i++) {
	  	let pow = (2 * i);
	    if (func === "sin") {
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

	function factorial(n) {
		if (n === 0) {
	  	return 1;
	  }
	  return n * factorial(n - 1);
	}

	return {
		submit
	};
})();

window.submit = app.submit;
