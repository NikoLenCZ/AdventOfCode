// --- Day 1: Historian Hysteria ---

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8').split('\n');
let left = [];
let right = [];

input.forEach((line) => {
  const [l, r] = line.split('   ').map(Number);
  left.push(l);
  right.push(r);
});

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

const totalDistance = left.reduce((acc, l, i) => acc + Math.abs(l - right[i]), 0);

console.log('total distance:', totalDistance);

// --- Part Two ---

const similarity = left.reduce((acc, l) => acc + right.filter((r) => r === l).length * l, 0);

console.log('similarity score:', similarity);