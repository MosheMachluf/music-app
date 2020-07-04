import Song from "./song_class.js";
import { doRestApi } from "./api_service.js";

let music_ar;
let pr = document.querySelector("#view_songs");
let load_search = document.querySelector("#loading_search");

export const makeRestApi = async (queryS) => {
  music_ar = await doRestApi(queryS);
  console.log(music_ar);
  renderAllSongs();
};

export const changeSort = (_sort, _by) => {
  music_ar.sort(sortSongs(_sort, _by));
  renderAllSongs();
};

const renderAllSongs = () => {
  pr.innerHTML = "";
  load_search.innerHTML = "";
  if (music_ar.length > 0) {
    music_ar.map((item) => {
      let song = new Song(
        pr,
        item.artist.picture_small,
        item.artist.name,
        item.title,
        item.duration,
        item.preview,
        item.link,
        item.rank,
        item.album.title,
        item.album.id,
        item.rank
      );
      song.renderSong();
    });
  } else {
    document.querySelector("#bar_title").innerHTML = "";
    pr.innerHTML = `<div class="alert alert-danger w-50 mx-auto" role="alert">No Found Result</div>`;
  }
};

const sortSongs = (key, order) => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
    const comparison = String(a[key]).localeCompare(String(b[key]));

    return order === "desc" ? comparison * -1 : comparison;
  };
};

let order = true;
export const orderSort = () => {
  if (order) {
    order = false;
    document.querySelector("#id_order span").innerHTML = "&#x2BC6;";
    return "desc";
  } else {
    order = true;
    document.querySelector("#id_order span").innerHTML = "&#11205;";
    return "asc";
  }
};

export const doLoading = (_parent) => {
  _parent.innerHTML = `<div class="spinner-border text-danger m-3" style="width:25px; height:25px;" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>`;
};
