const { validationResult } = require("express-validator");
const ChartService = require("../model/Chart");

// 환자 차트 조회
exports.getPatientChart = async (req, res) => {
    try {
        const { patientId } = req.params;
        const chart = await ChartService.getPatientChart(patientId);
        res.status(200).json(chart);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// 환자 차트 추가
exports.addPatientChart = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, patientId, date, details, memo, examine, medicationTherapy, physicalTherapy } = req.body;
        const chartData = { userId, patientId, date, details, memo, examine, medicationTherapy, physicalTherapy };

        const result = await ChartService.addPatientChart(chartData);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// 환자 차트 수정
exports.updatePatientChart = async (req, res) => {
    try {
        const { chartId } = req.params;
        const { userId, patientId, date, details, memo, examine, medicationTherapy, physicalTherapy } = req.body;
        const chartData = { userId, patientId, date, details, memo, examine, medicationTherapy, physicalTherapy };

        await ChartService.updatePatientChart(chartId, chartData);
        res.status(200).json({ message: 'Patient chart updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// 환자 차트 삭제
exports.deletePatientChart = async (req, res) => {
    try {
        const { chartId } = req.params;
        await ChartService.deletePatientChart(chartId);
        res.status(200).json({ message: 'Patient chart deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
