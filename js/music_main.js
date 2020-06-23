import { switchTheme, navScroll, navMobile } from "./theme.js";
import { declareViewEvents } from "./view_controller.js";

window.onload = () => {
  declareViewEvents();
  switchTheme();
  navMobile();
  navScroll();
};
