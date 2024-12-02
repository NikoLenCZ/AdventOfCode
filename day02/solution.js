// --- Day 2: Red-Nosed Reports ---

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf8');
const reports = input.split('\n').map((line) => line.split(' ').map(Number));

const isReportSafe = (report) => {
  if (report.length < 2) return true;

  let isSafe = true;
  let isIncreasing = null;

  for (const [i, current] of report.slice(1).entries()) {
    const previous = report[i];
    const diff = current - previous;
    const absDiff = Math.abs(diff);

    if (absDiff < 1 || absDiff > 3) {
      isSafe = false;
      break;
    }

    if (isIncreasing === null) {
      isIncreasing = diff > 0;
    }

    if ((diff > 0) !== isIncreasing) {
      isSafe = false;
      break;
    }
  }

  return isSafe;
}

const safeReports = reports.filter(isReportSafe);
console.log(`There are ${safeReports.length} safe reports.`);


// --- Part Two ---


const isReportSafeWithDampener = (report) => {
  if (isReportSafe(report)) return true;
  
  for (const [i] of report.entries()) {
    const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
    if (isReportSafe(modifiedReport)) {
      return true;
    }
  }
  
  return false;
}

const safeReportsWithDampener = reports.filter(isReportSafeWithDampener);
console.log(`Now there are ${safeReportsWithDampener.length} safe reports.`);



