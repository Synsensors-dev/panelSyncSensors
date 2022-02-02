const cron = require('node-cron');

export const statusValidator =  () => {

    cron.schedule("* * * * * ", () => {
        console.log("Hello world");
    });
}