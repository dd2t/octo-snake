var videos = document.querySelectorAll('.video-thumb img')
var videosListItems = document.querySelectorAll('.video-list-item')

for (let pos = 0; pos < videos.length; pos++) {
    videos[pos].addEventListener('click', function() {
        loadVideo(pos)
    })
    videosListItems[pos].addEventListener('click', function() {
        loadVideo(pos)
    })
}

function loadVideo(pos) {
    let videosData = [
        {name: 'A vida de um DábliuDábliu', link: 'https://youtu.be/DZ2QAKEccrM',
         embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/DZ2QAKEccrM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'},
        {name: 'Corki alegria nas pernas', link: 'https://youtu.be/HOBLPxepmOw',
         embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/HOBLPxepmOw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'},
        {name: 'Como é viver no RJ', link: 'https://youtu.be/6bfdFs1SYrU',
         embed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/6bfdFs1SYrU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'}
    ]
    let display = document.querySelector('#display')
    let seeOnYTB = document.querySelector('#ytb-link')
    let videoTitle = document.querySelector('#video-title')

    videoTitle.innerText = videosData[pos]['name']
    display.innerHTML = videosData[pos]['embed']
    seeOnYTB.href = videosData[pos]['link']
}