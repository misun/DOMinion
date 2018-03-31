# DOMinion

### Background

DOMinion is a vanilla javascript project inpired by jQuery to traverse and manipulate the DOM, handle event listeners, and provide a promised Ajax request/response

[Live Demo](http://www.misun.me/DOMinion/)

### Demo a screenshot using DOMinion
Weather app using yahoo weahter APIs and DOMinion $l.ajax

![dominion2](https://user-images.githubusercontent.com/3492959/37889726-c95b5c3c-309b-11e8-9179-c5e03f696d50.jpg)

### How to use
Download the library into your project and load the DOMinion.js file in your code.
```
<head>
  <script type="text/javascript" src="./DOMinion.js"></script>
</head>
```

### Features  

DOMinion provides traversing and manipulating the DOM using vanilla JavaScript. It serves as a wrapper for DOM nodes / HTML elements; furthermore, it provides event listeners using vanilla JavaScript.

DOMinion provides the following features:

#### $l(selector)

> This selector can receive either a single HTMLElement or a string with a CSS selector and in either case the return value will be a DOMNodeCollection

#### html

> If it receives an argument, this will become the innerHTML (hint hint) of the each of the nodes. If it does not receive an argument, it returns the innerHTML of the first node in the array.

#### each

> This method iterates over the DOMinion elements.

#### empty 

> This method clears out the content of all nodes in the internal array.

#### append

> This method accept either a DOMinion wrapped collection, an HTML element, or a string. Append the outerHTML of each element in the argument to the innerHTML of each element in the DOMNodeCollection.

#### attr

> This method returns a DOMNodeCollection of all attribute nodes registered to the specified node.

#### addClass

> This method take a string and add the class on each of the elements in the DOMNodeCollection.

#### removeClass

> This method take a string and remove the class on each of the elements in the DOMNodeCollection.

#### children

> This method returns a DOMNodeCollection of ALL children of all nodes in the array.

#### parent

> This method returns a DOMNodeCollection of the parents of each of the nodes

#### find

> This method returns a DOMNodeCollection of all the nodes matching the selector passed in as an argument that are descendants of the nodes.

#### remove

> This method removes the html of all the nodes in the array from the DOM.

#### on

> This method adds event handlers.

#### off

> This method removes event handlers.

#### $.extend

> This method merges JavaScript objects.

#### $l.ajax

> This method receives one options object argument and performs an asynchronous HTTP (Ajax) request.


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

