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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfirmationUrl = void 0;
const uuid_1 = require("uuid");
const redis_1 = require("../../redis");
const redisPrefixes_1 = require("../constants/redisPrefixes");
const createConfirmationUrl = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, uuid_1.v4)();
    yield redis_1.redis.set(redisPrefixes_1.confirmUserPrefix + token, userId, "EX", 60 * 60 * 24);
    return `http://localhost:3000/user/confirm/${token}`;
});
exports.createConfirmationUrl = createConfirmationUrl;
