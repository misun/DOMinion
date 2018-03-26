const DOMNodeCollection = require('./dom_node_collection.js');

const queuedFunctions = [];

const $l = (arg) => {
  if( typeof arg === "string" ){
    // let result = [];
    const list = document.querySelectorAll(arg);
    // for(var value of list.values()) {
    //   result.push(value);
    // }
    return new DOMNodeCollection(list);
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof Function) {
    arg();
  }

};
window.$l = $l;

$l.extend = function(...args){
  let result = {};

  args.forEach( obj => {
    const keys = Object.keys(obj);
    keys.forEach( key => {
      result[key] = obj[key];
    });
  });
  return result;
};

$l.ajax = function(options){
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    success: ()=> {},
    error: ()=>{},
    url: '',
    data: {}
  };
  const params = $l.extend(defaults, options);

  params.method = params.method.toUpperCase();
  if (params.method === "GET") {
    params.url += `?${toQueryString(params.data)}`;
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(params.method, params.url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(params.data);
  });
};

toQueryString = (obj) => {
  let result = "";
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};
