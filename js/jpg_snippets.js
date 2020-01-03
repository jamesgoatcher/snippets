/* START - randomPassword */
  // Attach event listener to an input and pass values
  const asciiKeyCodes = (low, high) => {
    let array = [];
    // Load keycode values using loop
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    // Send back to variable
    return array;
  };
  // range is pw character length; upper is uppercase option;
  // number is integer option; symbol is special char option;
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
    // Rejoin all characters from array into a string
    return passwordArray.join('');
  };
  // ASCII Arrays
  const
  asciiObj = {};
  asciiObj.lowercaseChars = asciiKeyCodes(97, 122);
  asciiObj.uppercaseChars = asciiKeyCodes(65, 90);
  asciiObj.numberChars = asciiKeyCodes(48, 57);
  asciiObj.symbolChars = asciiKeyCodes(33, 47).concat(asciiKeyCodes(58, 64));
/* END - randomPassword */
 
/* START - quickSort */
  const quickSort = (input) => {
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
    return [ ...quickSort(left), pivot, ...quickSort(right) ];
  }
/* END - quickSort */
 
/* START - deepClone */
  // Create external object copies instead of references
  const deepClone = (obj) => {
    // Check absent data
    if (obj === null) return null;
    // Shallow copy original
    let clone = Object.assign({}, obj);
    // Loop over key value pairs
    Object.keys(clone).forEach( (key) => {
      // Recursively copy objects within
      return clone[key] = typeof obj[key] === 'object'
      ? deepClone(obj[key])
      : obj[key];
    });
    // Distill out arrays until have what needed
    return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone;
  };
/* END - deepClone */
 
/* START - evalUA */
  // Legacy JS compatible due to IE browsers 
  var evalNavigator = function () {
    var userNavigator = {
    	// IE, Edge, Opera, Firefox, Safari, Chrome, other
      ua: (function () {
        var ua = navigator.userAgent;
        var uaRegex = {
          internet_explorer: /(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:)(\d+)/,
          edge: /\bEdge\/\d+/,
          opera: /\sOPR\//,
          firefox: /\sFirefox\//
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
        isChrome = window.chrome && !window.opr ? true : false;
        // Safari and Chrome output
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
        // Platform output
        return os;
      })()
    };
    // IIFE produce readable answers contained within an object
    return userNavigator;
  };
/* END - evalUA */
 
/* START - randomNumber */
  const randomNumberGenerator = (limit, limiter) => {
    // Make limiter zero as array indices, otherwise use one
    return Math.floor( (Math.random() * limit) + (limiter || 0) );
  };
/* END - randomNumber */
 
/* START - encodeDecode */
  // Pass fns, uri, and json options as key value pairs with string or boolean values
  const encodeDecode = (data, options) => {
    // uri option has boolean value
    if (options.fns === 'encode') {
      // json check
      options.json 
      ? data = JSON.stringify(data)
      : data = data
      // uri check
      options.uri
      ? data = encodeURIComponent(data)
      : data = data
      // btoa
      return data = window.btoa(data);
    }
    // uri and json have boolean values
    if (options.fns === 'decode') {
      // atob
      data = window.atob(data);
      // uri check
      options.uri
      ? data = decodeURIComponent(data)
      : data = data
      // json check
      options.json
      ? data = JSON.parse(data)
      : data = data
      return data;
    }
    // Encode and Decode must be defined
    throw 'Formatting error';
  };
/* END - encodeDecode */
 
/* START - urlParams */
  // Extract key value pairs from params within url string
  const getURLParameters = (url) => {
    // Regex to find param chars and call method
    return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce( (acc, val) => {
      // Extract the keys and values; pass to an object
      return (
        (acc[val.slice(0, val.indexOf('='))] = val.slice(val.indexOf('=') + 1)
      ), acc)
    }, {});
  };
/* END - urlParams */
 
/* START - jsonToCSV */
  // arr is array of objects; columns is array of strings column headers
  const jsonToCSV = (arr, columns) => {
    // Delimit column headers with commas; add the json array to it
    return [columns.join(',')].concat(arr.map( (obj) => {
      // Each object becomes a row
      return columns.reduce( (acc, key) => {
        // Empty values become empty strings and assign values inside columns
        return '' + acc + (!acc.length ? '' : ',') +
        "'" + (!obj[key] ? '' : obj[key]) + "'";
      }, '');
    // Reconnect as string with each line
    })).join('\n');
  };
/* END - jsonToCSV */

export { asciiKeyCodes, generatePassword, asciiObj, quickSort, deepClone, evalNavigator, randomNumberGenerator, encodeDecode, getURLParameters, jsonToCSV };