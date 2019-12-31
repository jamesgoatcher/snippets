import { root, main } from './app.js';
import { snippet_repo } from './repo.js';
import { asciiKeyCodes, generatePassword, asciiObj, quickSort, deepClone, evalNavigator, randomNumberGenerator, encodeDecode, getURLParameters, jsonToCSV } from './jpg_snippets.js';

/*==============================
=           DEMO PAGE          =
==============================*/
const 
demoPageFunctions = (activeSnip) => {
	const
	snippetSelect = document.querySelector('.snippets'),
	snippetCode = document.querySelector('.snippet__display'),
	demoPage = document.querySelector('.demo__container'),
	closeBtn = document.querySelector('.demo__close');
	// Inactivate other fields
	snippetSelect.classList.add('inactive');
	snippetCode.classList.add('inactive');
	demoPage.classList.add('active');
	// Close button listener
	closeBtn.addEventListener('click', closeDemo.bind(this, snippetSelect, snippetCode, demoPage), false);
	// Demo submit btn selector
	let generate = (el) => {
		return document.querySelector(`#${el}`);
	};
	// Specifics
	switch (activeSnip) {
		case 'randomPassword':
			const displayCharCount = () => {
				const 
				charCount = document.querySelector('#charCountNum'),
				range = document.querySelector('#charCount');

				charCount.innerHTML = range.value;
			};

			const randomPassword_output = () => {
				const
				range = document.querySelector('#charCount'),
				upper = document.querySelector('#incUppercase'),
				number = document.querySelector('#incNumbers'),
				symbol = document.querySelector('#incSymbols'),
				output = document.querySelector('.demo__output');

				const password = generatePassword(range.value, upper.checked, number.checked, symbol.checked);
				output.innerHTML = password;
			};
			// Event Listeners
			document.querySelector('#charCount').addEventListener('input', displayCharCount, false);
			generate('randomPassword__generate').addEventListener('click', randomPassword_output, false);
			displayCharCount();
			break;

		case 'quickSort':
			const quickSort_output = () => {
				const
				data = document.querySelector('#data').value.split(','),
				output = document.querySelector('.demo__output');

				for (let i = 0; i < data.length; i++) {
					for (let j = 0; j < asciiObj.numberChars.length; j++) {
						if ( data[i].charAt(0) == String.fromCharCode(asciiObj.numberChars[j]) ) {
							data[i] = parseInt(data[i]);
							break;
						}
					}
				}
				
				output.innerHTML = quickSort(data);
			};
			// Event Listener
			generate('quickSort__generate').addEventListener('click', quickSort_output, false);
			break;
		
		case 'deepClone':
			const deepClone_output = () => {
				const 
				output = document.querySelector('.demo__output'),
				obj = {key: 'value'};
				
				const results = deepClone(obj);

				const
				results_obj = obj ===  results,
				results_key = obj.key === results.key;

				output.innerHTML = `
<pre>
obj === clone; // ${results_obj}
obj.key === clone.key; // ${results_key}
</pre`;
			};
			// Event Listener
			generate('deepClone__submit').addEventListener('click', deepClone_output, false);
			break;
		
		case 'evalUA':
			const evalUA_output = () => {
				const
				navig = evalNavigator(),
				output = document.querySelector('.demo__output');
				output.innerHTML = 
				`<div class="capitalize">Browser: ${navig.ua}</div>
				<div class="capitalize">Operating System: ${navig.platform}</div>
				<div class="capitalize">Is Mobile: ${navig.mobile}</div>`;
			};
			// Event Listener
			generate('evalNavigator__submit').addEventListener('click', evalUA_output, false);
			break;
		
		case 'randomNumber':
			const randomNumber_output = () => {
				const
				limit = document.querySelector('#limit').value,
				limiter = document.querySelector('#limiter').checked,
				output = document.querySelector('.demo__output');
				output.innerHTML = randomNumberGenerator(limit, (limiter ? 0 : 1));
			};
			// Event Listener
			generate('randomNumber__generate').addEventListener('click', randomNumber_output, false);
			break;
		
		case 'encodeDecode':
			const encodeDecode_output = () => {
				const
				data = document.querySelector('#data').value,
				encDec = document.querySelector('#encodedecode').checked,
				uri = document.querySelector('#uri').checked,
				json = document.querySelector('#json').checked,
				output = document.querySelector('.demo__output');
				output.innerHTML = encodeDecode(data, {fns: `${encDec ? 'decode' : 'encode'}`, uri: `${uri}`, json: `${json}`});
			};
			// Event Listener
			document.querySelector('#encodedecode').addEventListener('click', function () {
					if (this.checked) document.querySelector('#encodeDecode__generate').innerHTML = 'Decode';
					else document.querySelector('#encodeDecode__generate').innerHTML = 'Encode';
				}, false);
			generate('encodeDecode__generate').addEventListener('click', encodeDecode_output, false);
			break;
		
		case 'urlParams':
			const urlParams_output = () => {
				const
				url = document.querySelector('#url').value,
				output = document.querySelector('.demo__output');
				const paramObj = getURLParameters(url);
				output.innerHTML = '<div>{</div>';

				for (let key in paramObj) {
					output.innerHTML += `<div>${key}: ${paramObj[key]},</div>`;
				}

				output.innerHTML += `<div>}</div>`;
			};
			// Event Listener
			generate('urlParams__generate').addEventListener('click', urlParams_output, false);
			break;
		
		case 'jsonToCSV':
			const jsonToCSV_output = () => {
				const 
				output = document.querySelector('.demo__output'),
				results = jsonToCSV([{'col1': 'value1', 'col2': 'value2'},{'col1': 12345}],['col1','col2']);

				output.innerHTML = `<pre>${results}</pre`;
			};
			// Event Listener
			generate('jsonToCSV__submit').addEventListener('click', jsonToCSV_output, false);
			break;
		
		default:
			console.error('Error');
			break;
	}
},

closeDemo = (snippetSelect, snippetCode, demoPage) => {
	snippetSelect.classList.remove('inactive');
	snippetCode.classList.remove('inactive');
	demoPage.classList.remove('active');

	setTimeout(function () {
		demoPage.innerHTML = '';
	}, 300);
},

loadDemoHTML = async (activeSnip) => {
	const response = await fetch(`${root}html/${activeSnip}.html`);

  response.text().then(function(body) {
  	document.querySelector('.demo__container').innerHTML = body; // write html to demo__container
  	setTimeout(function () {
  		demoPageFunctions(activeSnip);
  	}, 300);
  });
};

export { loadDemoHTML };