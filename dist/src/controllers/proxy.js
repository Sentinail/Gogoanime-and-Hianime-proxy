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
exports.segmentProxy = exports.qualityProxy = exports.hlsProxy = void 0;
const axios_1 = __importDefault(require("axios"));
const hlsProxy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.query.url;
        const response = yield axios_1.default.get(url, {
            responseType: 'text',
        });
        const originalContent = response.data;
        const proxyBaseUrl = `${process.env.BASE_URL}/quality-proxy?url=${encodeURIComponent(url.split('/ep')[0])}`;
        const updatedContent = originalContent
            .split('\n')
            .map(line => {
            if (line.startsWith('ep')) {
                return `${proxyBaseUrl}/${line}`;
            }
            return line;
        })
            .join('\n');
        res.set({
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Cache-Control': 'no-cache',
        });
        res.send(updatedContent);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.hlsProxy = hlsProxy;
const qualityProxy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.query.url;
        const response = yield axios_1.default.get(url, {
            responseType: 'text',
        });
        const originalContent = response.data;
        const proxyBaseUrl = `${process.env.BASE_URL}/segment-proxy?url=${url.split('/ep')[0]}`;
        const updatedContent = originalContent
            .split('\n')
            .map(line => {
            if (line.startsWith('ep')) {
                return `${proxyBaseUrl}/${line}`;
            }
            return line;
        })
            .join('\n');
        res.set({
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Cache-Control': 'no-cache',
        });
        res.send(updatedContent);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.qualityProxy = qualityProxy;
const segmentProxy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.query.url;
        const response = yield axios_1.default.get(url, {
            responseType: 'stream',
        });
        res.set({
            'Content-Type': 'application/vnd.apple.mpegurl',
            'Cache-Control': 'no-cache',
        });
        response.data.pipe(res);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.segmentProxy = segmentProxy;
