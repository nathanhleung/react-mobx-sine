(() => {
	const formulaSin = document.getElementById('formula-sin');
	const formulaCos = document.getElementById('formula-cos');
	katex.render('sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + ...', formulaSin);
	katex.render('cos(x) = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + ...', formulaCos);
})();
