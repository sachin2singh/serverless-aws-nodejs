const app = require('./app');
const port = process.env.port || 9003;

app.listen(port, () => {
    process.stdout.write(`Mock api server listening on ${port} \n`);
});

module.exports = app;
