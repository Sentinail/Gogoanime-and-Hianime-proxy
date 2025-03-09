"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUrl = editUrl;
function editUrl(url) {
    const urlEnd = url.split('/').pop();
    const filterUrl = url.split(urlEnd)[0];
    return filterUrl;
}
;
