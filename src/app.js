express = require('express');

app = express();
const bodyParser = require('body-parser');
const apiEmpRouter = require ('./sls.node.ex.router/Router');
const {LIST_CONSTANT} = require ('./sls.node.ex.utils/constant');
const {LIST_TABLE} = require ('./sls.node.ex.utils/common');
const dotenv = require('dotenv');
const envVar = dotenv.config();
if (envVar.error) throw new Error('envVar error', envVar.error);

app.use(bodyParser.json());
app.use('/api/v1/Empflags', apiEmpRouter);

module.exports = app;
