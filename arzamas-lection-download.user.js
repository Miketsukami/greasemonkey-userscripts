// ==UserScript==
// @name     Arzamas lection download
// @version  1
// @match    https://arzamas.academy/courses/*
// @grant    none
// ==/UserScript==

window.onload = () => {
  const downloadIcon = btoa(
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20" width="20">
        <path 
          d="M 9 1 L 9 9 L 5 9 L 10 15 L 15 9 L 11 9 L 11 1 L 9 1 z M 1 12 L 1 17 A 2 2 0 0 0 3 19 L 17 19 A 2 2 0 0 0 19 17 L 19 12 L 17 12 L 17 17 L 3 17 L 3 12 L 1 12 z " 
          style="fill:#ffffff;fill-opacity:1" />
      </svg>
		`).replace(
    	/%([0-9A-F]{2})/g, 
    	(match, p1) => { return String.fromCharCode('0x' + p1); }
    )
  );
  
  const style = document.createElement('style');
  document.head.appendChild(style);

  const stylesheet = style.sheet;
  stylesheet.insertRule(`
    .course-gallery__item__share ul.share-list li.social.social-dl a::before {  
			background-image: url("data:image/svg+xml;base64,${downloadIcon}");
    }
  `);
  stylesheet.insertRule(`
		.course-gallery__item__share ul.share-list li.social.social-dl a {
 			border-right: none;
		}
 	`);
  stylesheet.insertRule(`
		.course-gallery__item__share ul.share-list li.social.social-tw a {
 			border-right: 1px solid #4c4c4c;
		}
 	`);
  
	document.querySelectorAll('.course-gallery .slick-slide').forEach((element) => {   
    const 
    	listContainer = element.querySelector('.share-list'),
    	listItem = document.createElement('li'),
    	downloadBtn = document.createElement('a'),
      itemEmbed = element.querySelector('.course-gallery__item__embed');
    
    downloadBtn.classList.add('share-button');
    downloadBtn.setAttribute('title', 'Скачать файл');
    downloadBtn.setAttribute('href', itemEmbed.dataset.embed);
    downloadBtn.setAttribute('target', '_blank');
    
    listItem.appendChild(downloadBtn);
    listItem.classList.add('social');
    listItem.classList.add('social-dl');
    
    listContainer.appendChild(listItem);
  });  
}
