// A külső linket itt kell megadni
const externalLink = "http://localhost:3000";

// Az elemek kiválasztása
const form = document.getElementById("form");
const input = document.getElementById("input");
const paste = document.getElementById("paste");
const download = document.getElementById("download");
const options = document.getElementById("options");
const mp3 = document.getElementById("mp3");
const mkv = document.getElementById("mkv");


// A paste gombra kattintva a vágólap tartalmát beilleszti az inputba
paste.addEventListener("click", async () => {
  const text = await navigator.clipboard.readText();
  input.value = text;
});

// A download gombra kattintva megjeleníti az opciókat
download.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value) {
    options.hidden = false;
  }
});

// Az mp3 gombra kattintva elküldi a kérést az externalLink-re mp3 formátumban
mp3.addEventListener("click", () => {
  if (input.value) {
    window.location.href = `${externalLink}/download?URL=${input.value}&format=mp3`;
  }
});

// Az mp4 gombra kattintva elküldi a kérést az externalLink-re mkv formátumban
mkv.addEventListener("click", () => {
    if (input.value) {
      window.location.href = `${externalLink}/download?URL=${input.value}&format=mkv`;
    }
  });
  