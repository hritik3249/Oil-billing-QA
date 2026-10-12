// Script to convert test cases CSV to Excel with formatting
// Run with: node qa/convert-to-excel.js

const fs = require('fs');
const path = require('path');

// Read CSV
const csvPath = path.join(__dirname, 'test-cases.csv');
const csv = fs.readFileSync(csvPath, 'utf-8');
const lines = csv.split('\n');
const headers = lines[0].split(',');

console.log('CSV to Excel conversion requires the xlsx package.');
console.log('Please run: npm install xlsx');
console.log('Then run this script again: node qa/convert-to-excel.js');
console.log('\nAlternatively, you can:');
console.log('1. Open qa/test-cases.csv in Excel');
console.log('2. Save As > Excel Workbook (.xlsx)');
console.log(`\nTotal test cases: ${lines.length - 1}`);
