AOS.init();

const text = "Web Developer | UI Designer | Freelancer";
let i = 0;

function typing() {
  if (i < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 40);
  }
}
typing();
