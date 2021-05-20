import { getInput, setOutput, setFailed } from '@actions/core';
import { context } from '@actions/github';

try {
    const email = getInput('email');
    console.log(`Hello ${email}!`);
    setOutput("message", 'Success');
    const payload = JSON.stringify(context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    setFailed(error.message);
}