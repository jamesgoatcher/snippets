'use strict';

import { snippet_repo } from './repo.js';

/*==============================
=            GLOBAL            =
==============================*/
const 
root = './', // for production
main = document.querySelector('#container'),
refresh = document.querySelector('#refresh'),
regex = {};
regex.codeRed = /\breturn|\bif|\belse|\b(for\s)|\bwhile|\bswitch|\bcase|\bdefault|\bbreak|\bin\s|\bof|\bnew|\btypeof|\bthrow|\bif|(=\s)|(==)|(===)|(\s<\s)|(\s>\s)|\+|\^|&|\?|\*|!|\:|\.|\|/gm;
regex.codeBlue = /\bMath|\bObject|\bdecodeURIComponent|\bencodeURIComponent|\bbtoa|\batob|\bconcat|\bwindow|\bjoin|\btoString|\bpush|=>|\bconsole|\bdocument|\bconst\s|\blet|\bvar|\bsetTimeout|\bfunction|\bindexOf|\bforEach|\bincludes|\bquerySelector|\bquerySelectorAll|\bslice|\breplace|\bmatch|\bmap|\breduce|\bremove|\bcontains/gm;
regex.codePurple = /\d|(\\n)|null|undefined|true|false/gm;
regex.codeGray = /(\s\/\/\s.*)/gm;
regex.codeOrange = /\bthis/gm;
regex.codeGreen = /(const\s[a-zA-Z]+\s)|(var evalNavigator)/gm;

/*===========================
=            APP            =
===========================*/
const
refreshPage = () => {
	window.location.reload();
},

homeInit = () => {
	const
	snips = Array.from(document.querySelectorAll('.snippet__select')),
	copy = document.querySelector('#copy');

	for (let i = 0; i < snippet_repo.length; i++) {
		snips[i].dataset.key = snippet_repo[i].key;
		snips[i].innerHTML = snippet_repo[i].name;
		snips[i].addEventListener('click', toggleActiveSnippet.bind(this, snips), false);
		snips[i].addEventListener('click', snippetHandler, false);
	}
	// Add event listeners
	copy.addEventListener('click', copyToClipboard.bind(this, copy), false);
},

toggleActiveSnippet = (snips) => {
	const activeSnippet = event.target.dataset.key;

	for (let i = 0; i < snips.length; i++) {
		if (snips[i].dataset.key != activeSnippet) {
			snips[i].classList.remove('active');
			continue;
		} else {
			snips[i].classList.add('active');
			continue;
		}
	}
},

copyToClipboard = (copyEl) => {
	const codeSnippet = document.querySelector('.snippet__code > pre');

	navigator.clipboard.writeText(codeSnippet.innerText).then( () => {
		// Copy action animation
		copyToClipboardAnim(copyEl, 'success');
	}, function(error) {
	  // Error handler
	  copyToClipboardAnim(copyEl, 'error');
	  throw 'Clipboard copy failed - ' + error;
	});
},

copyToClipboardAnim = (copyEl, fns) => {
	switch (fns) {
		case 'success':
			copyEl.classList.add('active');
			copyEl.innerHTML = 'Copied!';
			break;

		case 'error':
			copyEl.classList.add('active_error');
			copyEl.innerHTML = 'Error!';
			break;

		default:
			break;
	}

	setTimeout(function () {
		copyEl.classList.remove('active');
		copyEl.classList.remove('active_error');
		copyEl.innerHTML = 'Copy to Clipboard';
	}, 500);
},

snippetHandler = (el) => {
	const 
	codeDisplay = document.querySelector('.snippet__display');
	el = el.target.dataset.key;

	if (codeDisplay.classList.contains('hide')) codeDisplay.classList.remove('hide');

	for (let i = 0; i < snippet_repo.length; i++) {
		if (el == snippet_repo[i].key) {
			displayCode(snippet_repo[i]);
		}
	}
},

regexForCodeColors = (snippet) => {
	let snippetOutput;
	// Evaluate green
	snippetOutput = snippet.replace(regex.codeGreen, `<span class="code--green">$&</span>`);
	// Evaluate red
	snippetOutput = snippetOutput.replace(regex.codeRed, `<span class="code--red">$&</span>`);
	// Evaluate blue
	snippetOutput = snippetOutput.replace(regex.codeBlue, `<span class="code--blue">$&</span>`);
	// Evaluate purple
	snippetOutput = snippetOutput.replace(regex.codePurple, `<span class="code--purple">$&</span>`);
	// Evaluate comment
	snippetOutput = snippetOutput.replace(regex.codeGray, `<span class="code--gray">$&</span>`);

	return snippetOutput;
},

displayCode = (snippet) => {
	const codeDiv = document.querySelector('.snippet__code');

	codeDiv.innerHTML =
		`<pre>&lt<span class="code--red">script</span>&gt\n${regexForCodeColors(snippet.code)}\n&lt/<span class="code--red">script</span>&gt</pre>`;
};

/*================================
=            Utilities           =
================================*/
const
util = {
	/* Clear Interval */
	clearInterval: (fns) => {
	  clearInterval(fns);
	},

	/* ASCII Signature */
	asciiSignature: () => {
		console.log(`
 ▄▄▄██▀▀▀██▓███    ▄████ 
   ▒██  ▓██░  ██▒ ██▒ ▀█▒
   ░██  ▓██░ ██▓▒▒██░▄▄▄░
▓██▄██▓ ▒██▄█▓▒ ▒░▓█  ██▓
 ▓███▒  ▒██▒ ░  ░░▒▓███▀▒
 ▒▓▒▒░  ▒▓▒░ ░  ░ ░▒   ▒ 
 ▒ ░▒░  ░▒ ░       ░   ░ 
 ░ ░ ░  ░░       ░ ░   ░ 
 ░   ░                 ░ 
 `);
		console.log('http://jamesgoatcher.com');
	},

	/* Quick sort algorithm */
	quickSort: (input) => {
		// If only 1 piece of data, return that
		if (input.length < 2) {
	  	return input;
		}
		// Declare first value as pivot and the left/right temp arrays
		let 
		pivot = input[0],
	  left  = [],
	  right = [];
		// Lump sort > / < value to pivot
		for (let i = 1; i < input.length; i++) {
			if (input[i] < pivot) {
	    	left.push(input[i]);
			} else {
	    	right.push(input[i]);
			}
		}

	// Recursively sort left of pivot and right of pivot using spread operator
		return [ ...util.quickSort(left), pivot, ...util.quickSort(right) ];
	},

	/* Truncate overflown strings */
	truncateString: (string, stringLength) => {
		if (string.length > stringLength) {
      return string.substring(0, stringLength) + '...';
    } else {
      return string;
    }
	},

	/* AJAX in JSON data */
	loadJSON: (location) => {
		let 
		xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      data = JSON.parse(xhttp.responseText);
	    }
		};

		xhttp.open('GET', location, true);
		xhttp.send();
	},

	/* AJAX in HTML */
	loadHTML: async (fileURL, page, optionalData) => {
		const response = await fetch(fileURL);

	  response.text().then(function(body) {
	  	main.innerHTML = ''; // reset
	  	main.innerHTML = body; // write html to main
	  	util.loadHTMLPageLogic(page, optionalData); // load specific page logic
	  });
	},

	loadHTMLPageLogic: (page, optionalData) => {
		switch (page) {
	  	case 'home':
	  		homeInit();
	  		break;

	  	default:
	  		console.log('default hit');
	  		break;
	  }
	}
};

/*=================================
=            Initialize           =
=================================*/
const
loadHomePage = () => {
	util.loadHTML(`${root}html/home.html`, 'home');
},
/* Initialze */
initFns = () => {
	refresh.addEventListener('click', refreshPage, false);
	loadHomePage();
};
/* Ready? Load app */
document.onreadystatechange = function () {
	if (document.readyState == 'complete') {
		util.asciiSignature();
		initFns();
	}
};

// export { root, util, appStorageArray, validateInputsHaveValues, removeValidationError, validationHandler };