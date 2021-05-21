'use strict'

const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const main = async () => {
    try {
        const email = core.getInput('email') || 'hienlh1298@gmail.com';
        console.log(`Hello ${email}!`);

        const count = await getLastContributedCount();

        if (count === 0) {
            const res = await axios.post(
                'https://simple-send-mail-service.herokuapp.com/send-mail', {
                email: email,
                title: `Your current contributed count is ${count}`,
                body: `Your current contributed count is ${count}`,
            });

            if (res.statusCode >= 400) {
                throw res.statusText
            }

            core.setOutput("message", 'Success');
        } else {
            core.setOutput("message", 'You have contributed today, so we don\'t send any alert email.');
        }
    } catch (error) {
        console.log(error);
        core.setFailed(error);
    }
}

const getLastContributedCount = async () => {
    const url = `https://github.com/${github.context.repo.owner}`
    console.log(`Getting contributed count from ${url}`);

    const res = await axios.get(url, { headers: { accept: 'text/html' } });

    var body = res.data;
    var count = [];

    body = body.slice(body.indexOf('js-calendar-graph-svg') + 23);
    body = body.slice(0, body.indexOf('</svg>'));

    body.split("\n").slice(2).map(c => c.trim()).forEach(c => {
        let fill = c.match(/data-count="([0-9]+)"/);
        if (fill) {
            count.push(parseInt(fill[1]));
        }
    });
    count = count.slice(count.length - 1, count.length);

    console.log(`Last contributed count: ${count[count.length - 1]}`);
    return count[count.length - 1]
}

main();