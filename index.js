'use strict'

const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const main = async () => {
    try {
        const email = core.getInput('email') || 'hienlh1298@gmail.com';
        console.log(`Hello ${email}!`);

        const res = await axios.post('https://simple-send-mail-service.herokuapp.com/send-mail', {
            email: email,
            title: 'Test email',
            body: 'Test email'
        });

        if (res.statusCode >= 400) {
            throw res.statusText
        }

        core.setOutput("message", 'Success');
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
    } catch (error) {
        console.log(error);
        core.setFailed(error);
    }
}

main();