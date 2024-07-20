// controllers/csvController.js
const {readCsv, convertRawJsonToObject, printAgeGroup} = require('../utils/csv');
const {bulkUploadToDb} = require('../repositories/user.repository');

// Function to read data from CSV
exports.csvToJson = async (req, res) => {
    const filePath = process.env.CSV_FILE_PATH;
    const rawJson = await readCsv(filePath);
    const userDetails = convertRawJsonToObject(rawJson);
    await bulkUploadToDb(userDetails);
    printAgeGroup(userDetails);
    return res.status(200).json(userDetails);
};
