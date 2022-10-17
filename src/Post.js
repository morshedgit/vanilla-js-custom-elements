const STYLES = ``;
class MyPost extends HTMLElement {
  wrapper;
  clickCount = 0;
  title;
  content;
  text;
  mounted = false;
  static get observedAttributes() {
    return ["img", "data-text", "data-title", "data-content"];
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
    this.wrapper = document.createElement("span");

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
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom Post element attributes changed.");
    this.updateProps();
    this.render();
  }

  handleCountButtonClick() {
    this.clickCount++;
    this.render();
  }

  updateProps() {
    // Take attribute content and put it inside the info span
    this.text = this.getAttribute("data-text");

    this.title = this.getAttribute("data-title");

    this.content = this.getAttribute("data-content");
  }

  connectedCallback() {
    console.log("Custom Post element mounted.");
    this.mounted = true;
    this.addListeners();
  }

  addListeners() {
    if (!this.mounted) return;
    try {
      document
        .querySelector("my-post")
        .shadowRoot.querySelector("#clickCounterBtn")
        .addEventListener("click", () => this.handleCountButtonClick());
    } catch {
      console.log("NOT_MOUNTED_ERR");
    }
  }

  render() {
    console.log("rendering my-post component");
    const wrapperInnerHtml = `
            <section>
                <h1>${this.title}</h1>
                <button id="clickCounterBtn">Click Me ${this.clickCount}</button>
                <p>${this.content}</p>
            </section>
        `;
    this.wrapper.innerHTML = wrapperInnerHtml;
    this.addListeners();
  }
}
let postElm;
if (!customElements.get("my-post")) {
  postElm = customElements.define("my-post", MyPost);
}

export { postElm };
