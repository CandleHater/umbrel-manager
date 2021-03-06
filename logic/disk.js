const constants = require('utils/const.js');
const diskService = require('services/disk.js');

async function deleteUserFile() {
  return await diskService.deleteFile(constants.USER_FILE);
}

async function deleteItemsInDir(directory) {
  return await diskService.deleteItemsInDir(directory);
}

async function deleteFoldersInDir(directory) {
  await diskService.deleteFoldersInDir(directory);
}

async function fileExists(path) {
  return diskService.readJsonFile(path)
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false));
}

async function getBuildDetails(appsToLaunch) {

  const details = [];

  for (const applicationName of Object.keys(appsToLaunch)) {
    const application = {};
    application.name = applicationName;
    const path = constants.WORKING_DIRECTORY + '/' + application.name + '/'
      + appsToLaunch[application.name].version + '/';
    application.ymlPath = path + application.name + '.yml';
    application.digestsPath = path + 'digests.json';
    details.push(application);
  }

  return details;
}

async function listVersionsForApp(app) {
  return await diskService.listDirsInDir(constants.WORKING_DIRECTORY + '/' + app);
}

async function moveFoldersToDir(fromDir, toDir) {
  await diskService.moveFoldersToDir(fromDir, toDir);
}

async function writeAppVersionFile(application, json) {
  return diskService.writeJsonFile(constants.WORKING_DIRECTORY + '/' + application, json);
}

function readUserFile() {
  return diskService.readJsonFile(constants.USER_FILE);
}

function readSettingsFile() {
  return diskService.readJsonFile(constants.SETTINGS_FILE);
}

function writeSettingsFile(json) {
  return diskService.writeJsonFile(constants.SETTINGS_FILE, json);
}

async function writeUserFile(json) {
  return diskService.writeJsonFile(constants.USER_FILE, json);
}

function settingsFileExists() {
  return diskService.readJsonFile(constants.SETTINGS_FILE)
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false));
}

function hiddenServiceFileExists() {
  return readHiddenService()
    .then(() => Promise.resolve(true))
    .catch(() => Promise.resolve(false));
}

async function readAppVersionFile(application) {
  return diskService.readJsonFile(constants.WORKING_DIRECTORY + '/' + application);
}

function readHiddenService() {
  return diskService.readUtf8File(constants.UMBREL_DASHBOARD_HIDDEN_SERVICE_FILE);
}

function readJWTPrivateKeyFile() {
  return diskService.readFile(constants.JWT_PRIVATE_KEY_FILE);
}

function readJWTPublicKeyFile() {
  return diskService.readFile(constants.JWT_PUBLIC_KEY_FILE);
}

function writeJWTPrivateKeyFile(data) {
  return diskService.writeKeyFile(constants.JWT_PRIVATE_KEY_FILE, data);
}

function writeJWTPublicKeyFile(data) {
  return diskService.writeKeyFile(constants.JWT_PUBLIC_KEY_FILE, data);
}

// Send a signal to shutdown
async function shutdown() {
  await diskService.writeFile(constants.SHUTDOWN_SIGNAL_FILE, 'true');
}

// Send a signal to relaunch the manager.
async function relaunch() {
  await diskService.writeFile(constants.RELAUNCH_SIGNAL_FILE, 'true');
}

// Read the contends of a file.
async function readUtf8File(path) {
  return await diskService.readUtf8File(path);
}

// Read the contents of a file and return a json object.
async function readJsonFile(path) {
  return await diskService.readJsonFile(path);
}

// Send a signal to perform a migration.
async function migration() {
  await diskService.writeFile(constants.MIGRATION_SIGNAL_FILE, 'true');
}

function readMigrationStatusFile() {
  return diskService.readJsonFile(constants.MIGRATION_STATUS_FILE);
}

async function writeMigrationStatusFile(json) {
  return diskService.writeJsonFile(constants.MIGRATION_STATUS_FILE, json);
}

// Send a signal to enable/disable SSH.
async function enableSsh(state) {
  await diskService.writeFile(constants.SSH_SIGNAL_FILE, state);
}

function readSshSignalFile() {
  return diskService.readFile(constants.SSH_SIGNAL_FILE);
}

module.exports = {
  deleteItemsInDir,
  deleteUserFile,
  deleteFoldersInDir,
  moveFoldersToDir,
  fileExists,
  getBuildDetails,
  listVersionsForApp,
  readSettingsFile,
  readUserFile,
  writeAppVersionFile,
  writeSettingsFile,
  writeUserFile,
  settingsFileExists,
  hiddenServiceFileExists,
  readAppVersionFile,
  readHiddenService,
  readJWTPrivateKeyFile,
  readJWTPublicKeyFile,
  writeJWTPrivateKeyFile,
  writeJWTPublicKeyFile,
  shutdown,
  relaunch,
  readUtf8File,
  readJsonFile,
  writeMigrationStatusFile,
  readMigrationStatusFile,
  migration,
  enableSsh,
  readSshSignalFile
};
