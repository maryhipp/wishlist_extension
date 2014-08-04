var selectedImg = "";
var pageInfo = {
  "title": document.title,
  "url": window.location.href,
  "image": selectedImg
};

disableLinks();
sendImage();

function sendImage() {
  var imgList = document.getElementsByTagName("img");
  for(var i = 0; i < imgList.length; i++) {
    imgList[i].style.border = '2px red solid';
    imgList[i].addEventListener('click',function() {
      selectedImg = this.src;
      console.log(selectedImg);
      chrome.runtime.sendMessage({
        "title": document.title,
        "url": window.location.href,
        "image": selectedImg
      });
    })
  }
}

function disableLinks() {
  var linkList = document.getElementsByTagName("a");
  for(var i = 0; i < linkList.length; i++) {
    linkList[i].href = "#"
  }
}
