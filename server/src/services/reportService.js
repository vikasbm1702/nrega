const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const logger = require('../utils/logger');

const createPDFReport = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks = [];

      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Add header
      doc.fontSize(20)
         .text('MGNREGA District Performance Report', {
           align: 'center'
         });

      doc.moveDown();

      // Add district info
      doc.fontSize(16)
         .text(`District: ${data[0].district}`)
         .text(`State: ${data[0].state}`);

      doc.moveDown();

      // Add summary table
      const latestData = data[data.length - 1];
      doc.fontSize(12)
         .text('Current Month Summary:')
         .moveDown(0.5);

      const summaryTable = {
        headers: ['Metric', 'Value'],
        rows: [
          ['Total Workers', latestData.totalWorkers],
          ['Total Expenditure', `₹${latestData.totalExpenditure.toLocaleString('en-IN')}`],
          ['Work Days Generated', latestData.workdaysGenerated],
          ['Average Daily Wage', `₹${latestData.wagesPerDay.toLocaleString('en-IN')}`]
        ]
      };

      drawTable(doc, summaryTable);
      doc.moveDown();

      // Add monthly trend
      doc.fontSize(14)
         .text('Monthly Trend:')
         .moveDown(0.5);

      const trendTable = {
        headers: ['Month/Year', 'Workers', 'Work Days', 'Expenditure'],
        rows: data.map(d => [
          `${d.month}/${d.year}`,
          d.totalWorkers,
          d.workdaysGenerated,
          `₹${d.totalExpenditure.toLocaleString('en-IN')}`
        ])
      };

      drawTable(doc, trendTable);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

const createCSVReport = async (data) => {
  try {
    const fields = [
      'state',
      'district',
      'month',
      'year',
      'totalWorkers',
      'totalExpenditure',
      'workdaysGenerated',
      'wagesPerDay'
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    // Convert CSV string to Buffer
    return Buffer.from(csv, 'utf-8');
  } catch (error) {
    logger.error('Error creating CSV report:', error);
    throw error;
  }
};

const drawTable = (doc, table) => {
  const startX = 50;
  let startY = doc.y;
  const cellPadding = 5;
  const cellWidth = (doc.page.width - 100) / table.headers.length;
  const cellHeight = 20;

  // Draw headers
  table.headers.forEach((header, i) => {
    doc.rect(startX + (i * cellWidth), startY, cellWidth, cellHeight)
       .stroke();
    doc.text(
      header,
      startX + (i * cellWidth) + cellPadding,
      startY + cellPadding,
      { width: cellWidth - (2 * cellPadding) }
    );
  });

  startY += cellHeight;

  // Draw rows
  table.rows.forEach(row => {
    row.forEach((cell, i) => {
      doc.rect(startX + (i * cellWidth), startY, cellWidth, cellHeight)
         .stroke();
      doc.text(
        cell.toString(),
        startX + (i * cellWidth) + cellPadding,
        startY + cellPadding,
        { width: cellWidth - (2 * cellPadding) }
      );
    });
    startY += cellHeight;
  });

  doc.y = startY + 10;
};

const createReport = async (data, format) => {
  try {
    if (format === 'pdf') {
      return await createPDFReport(data);
    } else if (format === 'csv') {
      return await createCSVReport(data);
    } else {
      throw new Error('Unsupported format');
    }
  } catch (error) {
    logger.error('Error creating report:', error);
    throw error;
  }
};

module.exports = {
  createReport
};