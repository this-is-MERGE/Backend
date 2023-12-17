const mysql = require("mysql");
const dbConfig = require("../../config/database.js");

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

exports.getExamineData = (req, res) => {
    const { userId } = req.params;

    const query = `
        SELECT * FROM EXAMINE_DATA
        WHERE USER_ID = ?
    `;

    // Use the correct connection object (connection, not db)
    connection.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
};


exports.addExamineResult = (req, res) => {
    const { examineDataId, count, text, pdf, photo, video, memo } = req.body;

    const insertQuery = `
        INSERT INTO EXAMINE_RESULT (EXAMINE_DATA_ID, COUNT, TEXT, PDF, PHOTO, VIDEO, MEMO)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(insertQuery, [examineDataId, count, text, pdf, photo, video, memo], (error, results) => {
        if (error) {
            console.error('Error executing insert query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ message: 'Examine result added successfully' });
        }
    });
};

// 2. 검사 내역 추가
exports.addPatientTestResult = (req, res) => {
    const { patientId } = req.params;
    const { testType, result } = req.body;

    // Assuming getTestInputForm is defined elsewhere
    const testInputForm = getTestInputForm(testType);

    const insertQuery = `INSERT INTO test_results (patient_id, test_type, result) VALUES (?, ?, ?)`;

    // Use the correct connection object (connection, not db)
    connection.query(insertQuery, [patientId, testType, result], (error, results) => {
        if (error) {
            console.error('Error executing insert query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ message: 'Test result added successfully', testInputForm });
        }
    });
};



