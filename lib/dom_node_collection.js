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
