const { resolve } = require('path');
require('dotenv').config({path: resolve(__dirname,"../.env.local")});

const { workerData, parentPort } = require('worker_threads');
const { spawn } = require('child_process');

const path = process.env.CWD || "/home/cyphr/buni/vanity/VanitySearch";
const cwd = resolve(path);
const threads = process.env.THREADS || '6';
const outputDir = resolve(__dirname, '../', process.env.VANITY_OUTDIR);

let bookingId, addresstype, praefix, praefix_cs, publickey, processor;
let CPUspeed, CPUspeedUnit, GPUspeed, GPUspeedUnit, percentage, halflife, error;

if (workerData) {
  bookingId = workerData.bookingId ? workerData.bookingId : '' ;
  addresstype = workerData.addresstype ? workerData.addresstype : '3' ;
  praefix = workerData.praefix ? workerData.praefix : '';
  praefix_cs = workerData.praefix_cs ? workerData.praefix_cs : false ;
  publickey = workerData.publickey ? workerData.publickey : '';
  processor = workerData.processor ? workerData.processor : 'CPU'; // CPU or GPU

  if (addresstype === '' || praefix === '' || publickey === '') {
    // error handling
    console.log(addresstype, praefix, publickey)
    console.error('Worker konnte auf Grund fehlender Startparameter nicht gestartet werden');
    process.exit();
  }
} else {
  // test data
  bookingId = 123;
  addresstype = '1';
  praefix = 'peter';
  praefix_cs = true;
  publickey = '02A85180759399E8738CE9522A92A39B2CA9CC28D5CA0955B3D37E1BAF7DF46F22';
  processor = 'CPU'
}

// ./VanitySearch -stop -t 6 -sp 02A85180759399E8738CE9522A92A39B2CA9CC28D5CA0955B3D37E1BAF7DF46F22 -c bc1queeen
let arguments = [];
// stop computing after found the first result
arguments.push('-stop');
// use 6 cores, later we can use -gpu
arguments.push('-t', threads);
// the given public key
arguments.push('-sp', publickey);
// case sensitive?
if (!praefix_cs) arguments.push('-c');
// cpu or gpu
if (processor === 'GPU') arguments.push('-gpu');
// output file
arguments.push('-o', outputDir + '/' + bookingId + '.txt');
// which praefix we have to search for
arguments.push(addresstype + praefix);

const vs = spawn('./VanitySearch', arguments, {cwd: cwd});

parentPort.postMessage({bookingId: bookingId, status: 'starts', arguments: arguments.join(' ')});

vs.stdout.on('data', (data) => {
  error = '';
  VanityOutputToValues(data.toString());

  // send stats to parent process
  if (parentPort !== null && error === '') {
      parentPort.postMessage({
        bookingId: bookingId,
        status: 'running', 
        CPUspeed, 
        CPUspeedUnit, 
        GPUspeed, 
        GPUspeedUnit, 
        percentage, 
        halflife,
      });
  }
});

vs.stderr.on('data', (data) => {
  console.log(data)
  parentPort.postMessage({bookingId: bookingId, status: 'error', data: data});
});

vs.on('close', (code) => {
  parentPort.postMessage({bookingId: bookingId, status: 'exited', code: code, error: error});
});


function VanityOutputToValues(string) {
  if (string.includes('Error')) {
    error = string;
    return;
  }
  // get only the calculation data
  if (string.substr(1, 1) !== '[') return;

  let values = string.split(']');
  // CPU speed and unit
  try {
    value0 = values[0].substr(2, values[0].length-2);
    let value0s = value0.split(' ');
    CPUspeed = parseFloat(value0s[0]);
    CPUspeedUnit = value0s[1];
  } catch (err) { console.error({bookingId: bookingId, error: err.message}) }

  // GPU speed
  try {
    value1 = values[1].substr(1, values[1].length-1);
    let value1s = value1.split(' ');
    GPUspeed = parseFloat(value1s[1]);
    GPUspeedUnit = value1s[2];
  } catch (err) { console.error({bookingId: bookingId, error: err.message}) }

  // percentage and halflife
  try {
    value4 = values[4].substr(1, values[4].length-1);
    let value4s = value4.split(' ');
    percentage = parseInt(value4s[0].substr(0, value4s.length));
    halflife = value4s[2];
  } catch (err) { console.error({bookingId: bookingId, error: err.message}) }
}