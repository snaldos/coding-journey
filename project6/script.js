const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

textarea.value = "";

textarea.focus();

let isSelecting = false;

textarea.addEventListener("keyup", (e) => {

  if (!isSelecting) {
    createTags(e.target.value);
  }

  // Check whenever there's anything in e.target.value
  if (e.key === "Enter" && e.target.value.trim() && !isSelecting) {
    isSelecting = true;
    setTimeout(() => {
      e.target.value = "";
    }, 10);

    randomSelect(e);
  }
})

function createTags(input) {
  const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());

  tagsEl.innerHTML = '';

  tags.forEach(tag => {
    const tagEl = document.createElement('div');
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

function randomSelect(e) {
  const times = 10;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 250);

  }, 500);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, 250);

    setTimeout(() => {
      createTags(e.target.value);
      isSelecting = false;
    }, 5000)
  }, times * 500);
}

function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add("highlight");
}

function unHighlightTag(tag) {
  tag.classList.remove("highlight");
}
