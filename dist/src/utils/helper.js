"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUrl = editUrl;
exports.getHost = getHost;
function editUrl(url) {
    const urlEnd = url.split('/').pop();
    const filterUrl = url.split(urlEnd)[0];
    return filterUrl;
}
;
function getHost(req) {
    if (req.protocol === 'https') {
        return req.protocol + '://' + req.get('host');
    }
    return req.protocol + "s" + '://' + req.get('host');
}
;
