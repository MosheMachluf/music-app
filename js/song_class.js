// import { playlist } from "./api_service.js";

class Song {
  constructor(
    _parent,
    _img,
    _artist,
    _song,
    _duration,
    _mp3,
    _link,
    _rank,
    _album,
    _id_album,
    _rating
  ) {
    this.parent = _parent;
    this.img = _img;
    this.artist = _artist;
    this.song = _song;
    this.duration = this.showTime(_duration);
    this.mp3 = _mp3;
    this.link = _link;
    this.rank = _rank;
    this.album = _album;
    this.idAlbum = _id_album;
    this.rating = this.numberWithCommas(_rating);
  }

  renderBarTitle() {
    let barTitle = document.querySelector("#bar_title");

    barTitle.innerHTML = `<h3 class="display-4 sm_title text-left">Result:</h3>
                          <div class="grid_songs">
                              <div>Artist</div>
                              <div>Song</div>
                              <div class="d-none d-md-block">Album</div>
                              <div>Duration</div>
                              <div class="d-none d-md-block">Rating</div>
                          </div>`;
  }

  renderSong() {
    this.renderBarTitle();

    let newDiv = document.createElement("div");
    newDiv.className = "grid_songs shadow";
    this.parent.appendChild(newDiv);

    let divArtist = document.createElement("div");
    divArtist.className = "d-flex center";
    newDiv.appendChild(divArtist);
    divArtist.innerHTML += `<figure class="my-0 mr-3">
                                <img src="${this.img}" class="rounded-circle" width="50" alt="${this.artist}">
                            </figure>`;

    let playPause = document.createElement("button");
    playPause.className = "play center";
    divArtist.appendChild(playPause);
    playPause.innerHTML = `<ion-icon name="play" class="text-danger"></ion-icon>`;

    let stopSong = document.createElement("button");
    stopSong.className = "stop center";
    divArtist.appendChild(stopSong);
    stopSong.innerHTML = `<ion-icon name="stop" class="text-danger"></ion-icon>`;

    let song = new Audio();
    song.src = this.mp3;
    let songTimeInterval;
    let durationBar = document.querySelector(".duration");
    playPause.addEventListener("click", function () {
      durationBar.classList.remove("d-none");
      if (songTimeInterval) clearInterval(songTimeInterval);

      songTimeInterval = setInterval(() => {
        let duration = song.duration;
        let winWidth = window.innerWidth / duration;
        let widthCurrTime = song.currentTime * winWidth;

        document.documentElement.style.setProperty(
          "--duration_width",
          window.innerWidth + "px"
        );
        document.documentElement.style.setProperty(
          "--curr_time_width",
          widthCurrTime + "px"
        );
      }, 1000);

      if (song.paused) {
        song.play();
        newDiv.classList.add("active");
        this.innerHTML = `<ion-icon name="pause" class="text-danger"></ion-icon>`;
      } else {
        song.pause();
        this.innerHTML = `<ion-icon name="play" class="text-danger"></ion-icon>`;
        clearInterval(songTimeInterval);
      }
    });

    song.addEventListener("ended", function () {
      playPause.innerHTML = `<ion-icon name="repeat" class="text-danger"></ion-icon>`;
      newDiv.classList.remove("active");
      durationBar.classList.add("d-none");
      clearInterval(songTimeInterval);
      document.documentElement.style.setProperty("--duration_width", "100%");
      document.documentElement.style.setProperty("--curr_time_width", "0em");
    });

    stopSong.addEventListener("click", function () {
      song.currentTime = 0;
      song.pause();
      playPause.innerHTML = `<ion-icon name="play" class="text-danger"></ion-icon>`;
      newDiv.classList.remove("active");
      durationBar.classList.add("d-none");
      clearInterval(songTimeInterval);
      document.documentElement.style.setProperty("--duration_width", "100%");
      document.documentElement.style.setProperty("--curr_time_width", "0em");
    });

    let divName = document.createElement("div");
    divName.className = "song_name";
    newDiv.appendChild(divName);
    divName.innerHTML = `<h2 class="display-4 sm_title">${this.song}</h2>
        <div class="secTxt">${this.artist}</div>`;

    let divAlbum = document.createElement("div");
    divAlbum.className = "d-none d-md-block";
    newDiv.appendChild(divAlbum);
    divAlbum.innerHTML = this.album;
    divAlbum.style.cursor = "pointer";

    let divDuration = document.createElement("div");
    newDiv.appendChild(divDuration);
    divDuration.innerHTML = this.duration;

    let divRating = document.createElement("div");
    divRating.className = "d-none d-md-block";
    newDiv.appendChild(divRating);
    divRating.innerHTML = this.rating;
  }

  showTime(_secs) {
    let mins = Math.floor(_secs / 60);
    let secs = _secs % 60;

    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    return mins + ":" + secs;
  }

  numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default Song;
