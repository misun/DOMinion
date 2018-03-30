# DOMinion

### Background

DOMinion is a vanila javascript project to make a light version of jQuery.

[Live Demo](http://www.misun.me/DOMinion/)

### Features  

DOMinion provides traversing and manipulating the DOM using vanilla JavaScript. It serves as a wrapper for DOM nodes / HTML elements; furthermore, it provides event listeners using vanilla JavaScript.

DOMinion provides the following features:

- [ ] new
- [ ] html
- [ ] each
- [ ] append
- [ ] attr
- [ ] addClass
- [ ] removeClass
- [ ] children
- [ ] parent
- [ ] find
- [ ] remove
- [ ] on
- [ ] off
- [ ] $l.ajax
- [ ] $.extend

### Architecture and Technologies

All features in this game would be implemented using native JavaScript DOM manipulation.

This project will be implemented with the following technologies:

- `JavaScript` for traversing & manipulating logic
- `Yahoo API` for demonstrating DOMinion
- `Webpack` for bundling scripts

### Code Snippets
```
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
```
```
class DOMNodeCollection {
  ...
children(){
    let newArr = [];
    this.nodes.forEach( (node) => {
      Array.from(node.children).forEach( c => newArr.push(c));
    })
    return new DOMNodeCollection(newArr);
  }
  ...
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
```
### Demo a screenshot using DOMinion
Weather app using yahoo weahter APIs and DOMinion $l.ajax

![dominion2](https://user-images.githubusercontent.com/3492959/37889726-c95b5c3c-309b-11e8-9179-c5e03f696d50.jpg)
