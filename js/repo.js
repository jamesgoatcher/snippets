/*=============================
=           SNIPPETS          =
=============================*/
const
snippet_repo = [
	// Random Password Generator
	{ 
		name: 'Random Password Generator',
		key: 'randomPassword',
		code:
`  // Attach eventListener to an input and pass values
  const asciiKeyCodes = (low, high) => {
    let array = [];

    for (let i = low; i <= high; i++) {
      array.push(i);
    }

    return array;
  };

  const generatePassword = (range, upper, number, symbol) => {
    // Start with just lowercase codes
    let charCodes = asciiObj.lowercaseChars;
    // Options
    if (upper == true) charCodes = charCodes.concat(asciiObj.uppercaseChars);
    if (number == true) charCodes = charCodes.concat(asciiObj.numberChars);
    if (symbol == true) charCodes = charCodes.concat(asciiObj.symbolChars);
    // Range
    let passwordArray = [];
    for (let i = 0; i < range; i++) {
      const character = charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordArray.push(String.fromCharCode(character));
    }

    return passwordArray.join('');
  };`
	},
	// Quick Sort Arrays of Numbers
	{
		name: 'Quick Sort Array of Numbers',
		key: 'quickSort',
		code:
`  const quickSort = (input) => {
    // If only one value in array, output that
    if (input.length < 2) {
      return input;
    }
    // Declare first value as pivot and the left/right temp arrays
    let
    pivot = input[0],
    left  = [],
    right = [];
    // Lump sort value to pivot
    for (let i = 1; i < input.length; i++) {
      if (input[i] < pivot) {
        left.push(input[i]);
      } else {
        right.push(input[i]);
      }
    }
    // Recursively sort left to pivot and right to pivot using spread operator
    return [ ...util.quickSort(left), pivot, ...util.quickSort(right) ];
  }`
	},
	// Deep Clone
	{
		name: 'Deep Clone Object',
		key: 'deepClone',
		code:
`  const deepClone = (obj) => {
    if (obj === null) return null;

    let clone = Object.assign({}, obj);

    Object.keys(clone).forEach( (key) => {
      return clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    });

    return Array.isArray(obj) && obj.length ? (clone.length = obj.length) && Array.from(clone) : Array.isArray(obj) ? Array.from(obj) : clone;
  };`
	},
	// User Agent and OS Evaluator
	{
		name: 'Evaluate User Agent & Platform',
		key: 'evalUA',
		code:
`  // Legacy JS compatible due to IE browsers 
  var evalNavigator = function () {
    var userNavigator = {
    	// IE, Edge, Opera, Firefox, Safari, Chrome, other
      ua: (function () {
        var ua = navigator.userAgent;
        var uaRegex = {
          internet_explorer: /(?:\\b(MS)?IE\\s+|\\bTrident\\/7\\.0;.*\\s+rv:)(\\d+)/,
          edge: /\\bEdge\\/\\d+/,
          opera: /\\sOPR\\//,
          firefox: /\\sFirefox\\//
        };
        // Using result with mobile results yields stronger eval
        for (var reg in uaRegex) {
          if (ua.match(uaRegex[reg]) != null && ua.match(uaRegex[reg]).length > 0) return reg;
        }
        // Safari and Chrome must come after regex eval
        var
        isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
          return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
        isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

        if (isSafari == true) return 'safari';
        else if (isChrome == true) return 'chrome';
        else return 'Undetermined UA';
      })(),
      // True or False
      mobile: (function () {
        // Desktop does not have any touch points
        if (navigator.maxTouchPoints > 0) return true;
        else return false;
      })(),
      // Windows, MacOS, Linux, other
      platform: (function () {
        var
        appVers = navigator.appVersion,
        os;
        // Adding more robust evaluators here is optional
        if (appVers.indexOf('Win') > -1) os = 'Windows';
        else if (appVers.indexOf('Mac') > -1) os = 'MacOS';
        else if (appVers.indexOf('Linux') > -1) os = 'Linux';
        else os = 'Undetermined OS';
      
        return os;
      })()
    };
    // IIFE produce readable answers contained within an object
    return userNavigator;
  };`
	},
	// Random Number Generator, option to Dice Roll
	{
		name: 'Random Number Generator',
		key: 'randomNumber',
		code:
`  const randomNumberGenerator = (limit, limiter) => {
    // Make limiter zero as array indices, otherwise use one
    return Math.floor( (Math.random() * limit) + limiter );
  };`
	},
	// Encode/Decode values to/from Base64
	{
		name: 'Encode/Decode URI & Base64',
		key: 'encodeDecode',
		code:
`  // Pass FNS, URI, and JSON options as a key value object with boolean or string values
  const encodeDecode = (data, options) => {
    // Encode has URI option
    if (options.fns == 'encode') {
      return data = window.btoa(encodeURIComponent(data));
    }
    // Decode has URI and JSON option
    if (options.fns == 'decode') {
      // JSON.parse(data);
      return data = decodeURIComponent(window.atob(data));
    }
    // Encode and Decode must be defined
    throw 'Formatting error';
  };`
	},
	// Get URL Parameters
	{
		name: 'Extract URL Parameters',
		key: 'urlParams',
		code:
`  const getURLParameters = (url) => {
    return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
      (acc, val) => ( (acc[val.slice(0, val.indexOf('='))] = val.slice(val.indexOf('=') + 1) ), acc), {}
    )
  };`
	},
	// JSON to CSV
	{
		name: 'JSON to CSV',
		key: 'jsonToCSV',
		code:
`  const jsonToCSV = (arr, columns) => {
    return [columns.join(',')].concat(arr.map( (obj) => {
      return columns.reduce( (acc, key) => {
        return '' + acc + (!acc.length ? '' : ',') + "'" + (!obj[key] ? '' : obj[key]) + "'";
      }, '');
    })).join('\\n');
  };`
	}
];

export { snippet_repo };