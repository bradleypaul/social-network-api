function stringify(obj) {
  var result = '';
  var first = true;

  //base cases
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj.toString();
  } else if (obj === null) {
    return "null";
  } else if (typeof obj === 'string') {
    return `"${obj}"`;
  }

  const isArray = Array.isArray(obj);

  // prepend with [ if array
  if (isArray) {
    result += '[';
  }
  // otherwise { because it's an object 
  else {
    result += '{';
  }

  for (var key in obj) {
    // add a comma to the string if something has already been
    // added to the string
    if (!first) {
      result += ',';
    }
    if (isArray) {
      result += stringify(obj[key]);
    } else {
      result += `"${key}":${stringify(obj[key])}`;
    }
    first = false;
  };

  // postpend delimiters like the prepending
  if (isArray) {
    result += ']';
  } else {
    result += '}';
  }
  return result;
};