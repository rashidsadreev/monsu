const player = document.querySelector('.audio-player');
let playlist = document.querySelectorAll('.playlist__song');
const album = document.querySelector('.album');
const title = document.querySelector('.audio__title');

playlist.forEach((el) => {
    el.addEventListener('click', function(){
        player.src ='music/'+album.innerHTML+'/'+ el.innerHTML+'.mp3';
        player.play();
        title.innerHTML = 'Now playing: '+el.innerHTML;

    })
    
});