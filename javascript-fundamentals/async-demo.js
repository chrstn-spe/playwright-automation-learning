const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// function testWithoutAwait() {
//   console.log('1. Opening browser...');
//   delay(1000); // simulates waiting 1 second
//   console.log('2. Navigating to app...'); // runs immediately, doesn't wait!
//   console.log('3. Clicking button...'); // already clicking before page loaded!
// }

// testWithoutAwait();


async function testWithAwait() {
  console.log('1. Opening browser...');
  await delay(1000); // now we actually WAIT
  console.log('2. Navigating to app...');
  await delay(500); // wait again
  console.log('3. Clicking button...');
}

testWithAwait();


// // Rule 1: if a function uses await, it must be declared async
// async function myTest() { ... }

// // Rule 2: put await before any command that takes time
// await page.goto(url); // ✓ correct
// page.goto(url); // ✗ wrong — won't wait for page to load