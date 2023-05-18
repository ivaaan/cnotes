"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const local_auth_1 = require("@google-cloud/local-auth");
const googleapis_1 = require("googleapis");
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path_1.default.join(process_1.default.cwd(), 'token.json');
const CREDENTIALS_PATH = path_1.default.join(process_1.default.cwd(), 'credentials.json');
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await promises_1.default.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content.toString());
        return googleapis_1.google.auth.fromJSON(credentials);
    }
    catch (err) {
        return null;
    }
}
/**
 * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await promises_1.default.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await promises_1.default.writeFile(TOKEN_PATH, payload);
}
/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = (await (0, local_auth_1.authenticate)({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    }));
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}
/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
    const calendar = googleapis_1.google.calendar({ version: 'v3', auth });
    const res = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });
    const events = res.data.items;
    return events || [];
}
async function getData() {
    return authorize()
        .then(listEvents)
        .catch((error) => {
        console.error(error);
        return [];
    });
}
exports.getData = getData;
// module.exports = { getData };
