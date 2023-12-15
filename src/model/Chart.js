const mysql = require("mysql");
const dbConfig = require("../../config/database.js");

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

exports.getPatientChart = (req, res) => { // 환자 차트 조회
    const { patientId } = req.params;

    const query = `
        SELECT * FROM CHART
        WHERE PATIENT_ID = ${patientId}
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
};

// 환자 차트 추가
exports.addPatientChart = (req, res) => {
    const { userId, patientId, date, details, memo, examine, medicationTherapy, physicalTherapy } = req.body;

    const insertQuery = `
        INSERT INTO CHART (USER_ID, PATIENT_ID, DATE, DETAILS, MEMO, EXAMINE, MEDICATION_THERAPY, PHYSICAL_THERAPY)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        insertQuery,
        [userId, patientId, date, details, memo, examine, medicationTherapy, physicalTherapy],
        (error, results) => {
            if (error) {
                console.error('Error executing insert query:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).json({ message: 'Patient chart added successfully' });
            }
        }
    );
};

exports.updatePatientChart = (chartId, chartData) => {
    return new Promise((resolve, reject) => {
        const updateQuery = `
            UPDATE CHART
            SET
                USER_ID = ?,
                PATIENT_ID = ?,
                DATE = ?,
                DETAILS = ?,
                MEMO = ?,
                EXAMINE = ?,
                MEDICATION_THERAPY = ?,
                PHYSICAL_THERAPY = ?
            WHERE CHART_ID = ?
        `;

        connection.query(
            updateQuery,
            [
                chartData.userId,
                chartData.patientId,
                chartData.date,
                chartData.details,
                chartData.memo,
                chartData.examine,
                chartData.medicationTherapy,
                chartData.physicalTherapy,
                chartId
            ],
            (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            }
        );
    });
};

exports.deletePatientChart = (chartId) => {
    return new Promise((resolve, reject) => {
        const deleteQuery = `
            DELETE FROM CHART
            WHERE CHART_ID = ?
        `;

        connection.query(deleteQuery, [chartId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


