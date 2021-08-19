"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["utils"],{

/***/ "./sub.js":
/*!****************!*\
  !*** ./sub.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "test": () => (/* binding */ test)
/* harmony export */ });
/* provided dependency */ var utils = __webpack_require__(/*! ./utils */ "./utils/index.js")["default"];
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "../../node_modules/jquery/dist/jquery.js");
// import utils from 'js/utils'
function test() {
  console.log('こちらはsub.jsです');
}
utils.log('hello from sub.js');
test();
jQuery();

/***/ })

}]);
//# sourceMappingURL=utils.js.map