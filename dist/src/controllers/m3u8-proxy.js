"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.m3u8SegmentProxy = exports.m3u8QualityProxy = exports.m3u8Proxy = void 0;
const axios_1 = __importDefault(require("axios"));
const helper_1 = require("../utils/helper");
const m3u8Proxy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.query.url;
        const response = yield axios_1.default.get(url, {
            responseType: 'text',
        });
        const editedUrl = (0, helper_1.editUrl)(url);
        const proxyUrl = `${process.env.BASE_URL}/m3u8-quality-proxy?url=${editedUrl}`;
        const originalContent = response.data;
        const updatedContent = originalContent
            .split('\n')
            .map((line) => {
            if (line.startsWith('#EXT-X-MEDIA') && line.includes('URI=')) {
                return line.replace(/URI="(.*?)"/, (match, p1) => {
                    // Update the URI with the proxy URL
                    console.log({ match, p1 });
                    return `URI="${proxyUrl}${p1}"`;
                });
            }
            if (line.startsWith('#EXT') || line.startsWith('http'))
                return line;
            return line ? `${proxyUrl}${line}` : '';
        })
            .join('\n');
        res.set({
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Cache-Control': response.headers['cache-control'],
        });
        res.status(200).send(updatedContent);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.m3u8Proxy = m3u8Proxy;
const m3u8QualityProxy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.query.url;
        const response = yield axios_1.default.get(url, {
            responseType: 'text',
        });
        const editedUrl = (0, helper_1.editUrl)(url);
        const proxyUrl = `${process.env.BASE_URL}/m3u8-segment-proxy?url=${editedUrl}`;
        const originalContent = response.data;
        const updatedContent = originalContent
            .split('\n')
            .map(line => {
            if (line.startsWith('#EXT'))
                return line;
            return line ? `${proxyUrl}${line}` : '';
        })
            .join('\n');
        res.set({
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Cache-Control': response.headers['cache-control'],
        });
        res.status(200).send(updatedContent);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.m3u8QualityProxy = m3u8QualityProxy;
const m3u8SegmentProxy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.query.url;
        const response = yield axios_1.default.get(url, {
            responseType: 'stream',
        });
        res.set({
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Cache-Control': response.headers['cache-control'],
        });
        response.data.pipe(res);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.m3u8SegmentProxy = m3u8SegmentProxy;
