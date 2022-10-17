import "./styles.css";
import { postElm } from "./Post";
import { postsElm } from "./Posts";
const POSTS = [
  {
    title: "Post1",
    content: "Post1 content",
    onSelect: function () {
      this.selected = true;
    },
    selected: false
  },
  {
    title: "Post2",
    content: "Post2 content"
  }
];

document.getElementById("app").innerHTML = `
  <main>
    <h1>Posts</h1>
    <my-posts data-posts="${encodeURIComponent(JSON.stringify(POSTS))}"/>
  </main>

`;
