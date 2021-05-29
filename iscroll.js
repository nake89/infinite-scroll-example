function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
}

let content = [];
function createDiv() {
  const elem = document.createElement("div");
  elem.className = "box";
  document.body.appendChild(elem);
}
function addDivs() {
  createDiv();
  createDiv();
  createDiv();
  createDiv();
  createDiv();
}
function getNames() {
  fetch("https://random-data-api.com/api/name/random_name?size=5")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      for (let item of json) {
        content.push(item.name);
      }
      const divs = document.getElementsByClassName("box");
      let i = 0;
      for (let daDiv of divs) {
        daDiv.innerHTML = content[i];
        i++;
      }
    });
}
addDivs();
getNames();
var intervalId = window.setInterval(function () {
  const divs = document.getElementsByClassName("box");
  if (isElementInViewport(divs[divs.length - 2])) {
    console.log("Last element in is now in viewport!");
    addDivs();
    getNames();
  }
  /// call your function here
}, 1000);
