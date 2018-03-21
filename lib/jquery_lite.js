/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);


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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html(str){
    if (typeof str === 'string'){
      this.nodes[0].innerHTML = str;
    }else{
      return this.nodes[0].innerHTML;
    }
  }
  each(cb){
    this.forEach(cb);
  }

  empty(){
    for(let i=0 ; i < this.nodes.length; i++){
      console.log(this.nodes[i])

      this.nodes[i].innerHTML="";
    }
  }

  append(el){
    if (typeof el === 'string'){
      this.nodes[0].innerHTML += el;
    }else if(el instanceof HTMLElement){
      this.nodes[0].innerHTML += el.outerHTML;
    }else{
      this.nodes[0].innerHTML += el[0].outerHTML;
    }
  }

  attr(attr, value){
    if (value){
      return this.nodes[0].setAttribute(attr, value);
    }else{
      return this.nodes[0].getAttribute(attr);
    }
  }

  addClass(className){
    // const oldClass = this.nodes[0].getAttribute('class');
    // return this.nodes[0].setAttribute('class', val);
    this.nodes.forEach( node => node.classList.add(className));
  }

  removeClass(className){
    // const oldClass = this.nodes[0].getAttribute('class');
    // return this.nodes[0].removeAttribute(attr);
    this.nodes.forEach( node => node.classList.remove(className));
  }

  children(){
    let newArr = [];

    this.nodes.forEach( (node) => {
      Array.from(node.children).forEach( c => newArr.push(c));

    })

    return new DOMNodeCollection(newArr);
  }

  parent(){
    let newArr = [];

    this.nodes.forEach( node => {
      if (!newArr.includes(node.parentNode)){
        newArr.push(node.parentNode);
      }
    })
    return new DOMNodeCollection(newArr);
  }

  find(selector){
    let res = [];
    this.nodes.forEach(el => {
      el.querySelectorAll(selector).forEach( child => res.push(child));
    });
    return new DOMNodeCollection(res);
  }

  remove(){
    this.nodes.forEach(el => {
      el.remove();
    });
  }

  on(type, options){
    const func = options;
    if (Array.isArray(this.nodes[0][type])) {
      this.nodes[0][type].push(func);
    } else {
      this.nodes[0][type] = [func];
    }
    this.nodes.forEach(node => {
      node.addEventListener(type, func);
    });
  }

  off(type, options){
    if (!options) {
      const nodes = this.nodes[0][type];
      nodes.forEach(fn => {
        this.nodes.forEach(node => {
          node.removeEventListener(type, fn);
        });
      });
    } else {
      this.nodes.forEach(node => {
        node.removeEventListener(type, options);
      });
    }
  }

}
module.exports = DOMNodeCollection;


/***/ })
/******/ ]);