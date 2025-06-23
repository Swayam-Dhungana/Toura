"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromCookie = getUserIdFromCookie;
// src/utils/auth.ts
const firebase_1 = require("../lib/firebase");
async function getUserIdFromCookie(c) {
    try {
        const cookie = c.req.header('cookie');
        if (!cookie)
            return null;
        const match = cookie.match(/session=([^;]+)/);
        if (!match)
            return null;
        const sessionCookie = match[1];
        const decodedClaims = await firebase_1.adminAuth.verifySessionCookie(sessionCookie, true);
        return decodedClaims.uid || null;
    }
    catch (err) {
        return null;
    }
}
