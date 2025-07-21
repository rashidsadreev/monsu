document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progressBar');
    const progressFilled = document.getElementById('progressFilled');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');
    const playerTitle = document.querySelector('.player__title');
    const album = document.querySelector('.album');
    const playlist = document.querySelectorAll('.playlist__song');

    // Формат времени
    function formatTime(time) {
      if (isNaN(time) || !isFinite(time)) return '00:00';
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return` ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Обновление времени и прогресс-бара
    audio.addEventListener('timeupdate', () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressFilled.style.width = percent + '%';
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    // Установка полной длительности
    audio.addEventListener('loadedmetadata', () => {
      durationDisplay.textContent = formatTime(audio.duration);
    });

    // Перемотка
    progressBar.addEventListener('click', (e) => {
      const width = progressBar.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    });

    // Громкость
    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value;
    });

    // Переключение play/pause
    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    // Иконки
    audio.addEventListener('play', () => {
      playPauseBtn.style.backgroundImage = "url('img/UI/pause.svg')";
    });

    audio.addEventListener('pause', () => {
      playPauseBtn.style.backgroundImage = "url('img/UI/play.svg')";
    });

    // Плейлист
    playlist.forEach((el) => {
      el.addEventListener('click', () => {
        const trackName = el.textContent.trim();
        const albumName = album.textContent.trim();
        audio.src = `music/${albumName}/${trackName}.mp3`;
        audio.load();
        audio.play();
        playerTitle.textContent = trackName;
      });
    });

    // Обновить duration при первой загрузке
    audio.load(); // важно вызвать вручную
  });