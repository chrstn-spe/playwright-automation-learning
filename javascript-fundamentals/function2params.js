function logTestResult(testName, passed) {  
    const result = passed ? '✓ PASS' : '✗ FAIL';  
    console.log(result + ' — ' + testName);
}
logTestResult('TC01 - Active filter shows correct todos', true);
logTestResult('TC02 - Delete removes todo from list', false);