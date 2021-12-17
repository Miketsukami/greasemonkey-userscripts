// ==UserScript==
// @name     MangaLib Download
// @version  1
// @match    https://mangalib.me/*
// @grant    none
// ==/UserScript==
window.onload = function() {   
  function downloadAll() {
  	document.querySelectorAll('.media-chapter__icon_download').forEach((element) => {
      element.click();
    });
  }
  
  var downloadButton = document.createElement('div'), 
      downloadButtonFooter = document.createElement('div');

  if (document.querySelector('.media-chapters-list__footer')) {
    downloadButtonFooter.classList.add('media-chapters-list__scroller-top');
    downloadButtonFooter.style.marginRight = '10px';
    downloadButtonFooter.innerHTML = '<div class="media-chapters-list__scroller-top-button"><i class="fa fa-cloud-download fa-fw"></i></div>';
    
  	document.querySelector('.media-chapters-list__footer').insertBefore(downloadButtonFooter, document.querySelector('.media-chapters-list__scroller-top'));
  }
  
  downloadButton.innerHTML = '<div class="button button_sm button_light"><i class="fa fa-cloud-download fa-fw" style="margin-right: 5px"></i><span>Скачать</span></div>';
  document.querySelector('.media-chapters-actions').appendChild(downloadButton);
  
  downloadButton.onclick = downloadAll;
  downloadButtonFooter.onclick = downloadAll;
}
