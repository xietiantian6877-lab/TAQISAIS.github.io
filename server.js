const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const app = express();

app.use(express.static(__dirname)); // 静态文件服务

app.get('/score', (req, res) => {
    const filePath = path.join(__dirname, 'score.xlsx');
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, {header:1});
        res.json(data);
    } catch (err) {
        res.json([]); // 没有文件时返回空数组
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});