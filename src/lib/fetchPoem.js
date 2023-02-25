const API_URL = "https://www.googleapis.com/blogger/v3/blogs";
const API_KEY = "AIzaSyAXjsB22TjNEYJy-HDC-bpMvIs9BOqxRi4";
const BLOG_ID = "7016348522142105165";
const POST_ID = "8040682582405624765";
const blogPostUrl = `${API_URL}/${BLOG_ID}/posts/${POST_ID}?key=${API_KEY}`;

const fetchPoem = () =>
  new Promise((resolve, reject) => {
    const cachedPoem = localStorage.getItem("poem");

    if (cachedPoem) {
      resolve(JSON.parse(cachedPoem));
    } else {
      fetch(blogPostUrl)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(`BLOGGER API ${res.status} ${res.statusText}`);
          }
        })
        .then((data) => {
          localStorage.setItem("poem", JSON.stringify(data));
          resolve(data);
        })
        .catch((err) => reject(err));
    }
  });

export default fetchPoem;
