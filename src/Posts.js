const STYLES = `
  li{
    background: aliceblue;
    padding: 1em;
    border-radius: 1em;
    color: cornflowerblue;
    font-size: x-large;
    font-weight: 100;
    margin-bottom:1em;
  }

  .my-btn{
    all:unset;
  }
    
  ul{
    list-style: none;
    padding: 0;
  }
`;

class MyPostRow extends HTMLElement {
  post;
  id;
  mounted = false;
  isSelected = false;
  static get observedAttributes() {
    return ["data-post", "id"];
  }
  constructor() {
    // Always call super first in constructor
    super();
    // write element functionality in here
    // Create a shadow root
    const shadow = this.attachShadow({
      mode: "open"
    });
    // Create spans
    this.wrapper = document.createElement("li");

    // Create some CSS to apply to the shadow DOM
    let style = document.createElement("style");

    style.textContent = STYLES;
    // attach the created elements to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(this.wrapper);

    // Init
    this.init();
  }

  init() {
    this.updateProps();
    // this.render();
  }

  updateProps() {
    const post = this.getAttribute("data-post");
    this.post = JSON.parse(decodeURIComponent(post));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateProps();
    this.render();
  }

  connectedCallback() {
    this.mounted = true;
    this.addListeners();
  }

  handleButtonClick = () => {
    this.isSelected = true;
  };

  addListeners() {
    if (!this.mounted) return;
    try {
      document
        .querySelector("my-post-row")
        .shadowRoot.querySelector(".my-btn")
        .addEventListener("click", this.handleButtonClick);
    } catch {
      console.log("NOT_MOUNTED_ERR");
    }
  }

  render() {
    console.log("rendering my-post-row component: ", this.post.title);
    let wrapperInnerHtml = ``;
    wrapperInnerHtml += `
        <button class="my-btn">${this.post?.title}</button>
      `;
    this.wrapper.innerHTML = wrapperInnerHtml;
    this.addListeners();
  }
}
let postRowElm;
if (!customElements.get("my-post-row")) {
  postRowElm = customElements.define("my-post-row", MyPostRow);
}
class MyPosts extends HTMLElement {
  posts = [];
  id;
  mounted = false;
  isSelected = false;
  static get observedAttributes() {
    return ["data-posts", "id"];
  }
  constructor() {
    // Always call super first in constructor
    super();
    // write element functionality in here
    // Create a shadow root
    const shadow = this.attachShadow({
      mode: "open"
    });
    // Create spans
    this.wrapper = document.createElement("ul");

    // Create some CSS to apply to the shadow DOM
    let style = document.createElement("style");

    style.textContent = STYLES;
    // attach the created elements to the shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(this.wrapper);

    // Init
    this.init();
  }

  init() {
    this.updateProps();
    // this.render();
  }

  updateProps() {
    const posts = this.getAttribute("data-posts");
    this.posts = JSON.parse(decodeURIComponent(posts));
    // console.log(this.posts);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log("Custom Posts element attributes changed.");
    this.updateProps();
    this.render();
  }

  connectedCallback() {
    // console.log("Custom Posts element mounted.");
    this.mounted = true;
    this.addListeners();
  }

  addListeners() {}

  render() {
    // console.log("rendering my-posts component");
    let wrapperInnerHtml = ``;
    for (let post of this.posts) {
      wrapperInnerHtml += `
        <my-post-row id="${post.title}" data-post="${encodeURIComponent(
        JSON.stringify(post)
      )}"></my-post-row>
      `;
    }
    // console.log(wrapperInnerHtml);
    this.wrapper.innerHTML = wrapperInnerHtml;
    this.addListeners();
  }
}

let postsElm;
if (!customElements.get("my-posts")) {
  postsElm = customElements.define("my-posts", MyPosts);
}

export { postsElm };
