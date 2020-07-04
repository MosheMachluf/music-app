import { switchTheme, navScroll, navMobile } from "./theme.js";
import { declareEvents } from "./events_controller.js";

window.onload = () => {
  declareEvents();
  switchTheme();
  navMobile();
  navScroll();
};
