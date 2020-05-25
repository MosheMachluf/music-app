import {
    makeRestApi
} from "./songs_service.js"
import {
    changeSort,
    orderSort,
    doLoading
}
from "./songs_service.js"

export const declareViewEvents = () => {
    let search_btn = document.querySelector("#search_btn");
    let select_sort = document.querySelector("#id_sort_select");

    search_btn.addEventListener("click", () => {
        let load_search = document.querySelector("#loading_search");
        let searchQ = document.querySelector("#id_search_input");
        doLoading(load_search);
        makeRestApi(searchQ.value);
    })

    select_sort.addEventListener("change", () => {
        changeSort(select_sort.value, orderSort());
    })

    let orderBy = document.querySelector("#id_order");
    orderBy.addEventListener('click', () => {
        changeSort(select_sort.value, orderSort());
    })


    let btnSearch = document.querySelector("#search_btn")
    let Vsearch = document.querySelector("#id_search_input")
    Vsearch.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            btnSearch.click();
        }
    });


}