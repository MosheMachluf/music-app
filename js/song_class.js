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
    playPause.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;

    let stopSong = document.createElement("button");
    stopSong.className = "stop center";
    divArtist.appendChild(stopSong);
    stopSong.innerHTML = `<i class="fa fa-stop" aria-hidden="true"></i>`;

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
        this.innerHTML = `<i class="fa fa-pause" aria-hidden="true"></i>`;
      } else {
        song.pause();
        this.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
        clearInterval(songTimeInterval);
      }
    });

    song.addEventListener("ended", function () {
      playPause.innerHTML = `<i class="fa fa-repeat" aria-hidden="true"></i>`;
      newDiv.classList.remove("active");
      durationBar.classList.add("d-none");
      clearInterval(songTimeInterval);
      document.documentElement.style.setProperty("--duration_width", "100%");
      document.documentElement.style.setProperty("--curr_time_width", "0em");
    });

    stopSong.addEventListener("click", function () {
      song.currentTime = 0;
      song.pause();
      playPause.innerHTML = `<i class="fa fa-play" aria-hidden="true"></i>`;
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
    divAlbum.addEventListener("click", this.openBox);

    let divDuration = document.createElement("div");
    newDiv.appendChild(divDuration);
    divDuration.innerHTML = this.duration;

    let divRating = document.createElement("div");
    divRating.className = "d-none d-md-block";
    newDiv.appendChild(divRating);
    divRating.innerHTML = this.rating;
  }

  bg_dark = document.querySelector(".bg_dark_box");
  dark_box = document.querySelector(".dark_box");

  openBox = async () => {
    this.bg_dark.classList.remove("d-none");
    this.dark_box.innerHTML = `<h1 class='display-4'>Coming Soon...</h1>`;

    // let res = playlist(this.idAlbum);
    // let data = res.json();
    // console.log(data);

    window.onclick = (e) => {
      if (e.target == this.bg_dark) this.closeBox();
    };
  };

  closeBox = () => {
    this.bg_dark.classList.add("d-none");
  };

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
