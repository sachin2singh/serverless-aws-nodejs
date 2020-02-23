const Router  = require('express');
const apiFeatureRouter = new Router();
const {getFeatureFlags} = require('../sls.node.ex.handler/sls-node-handler');
const {FEATURE_FLAGS_TABLE} = require ('../sls.node.ex.utils/common');
const {FEATURE_CONSTANT} = require ('../sls.node.ex.utils/constant');
const dotenv = require('dotenv');
const envVar = dotenv.config();
if (envVar.error) throw new Error('envVar error', envVar.error);

apiFeatureRouter.get('/:country/:partner?/:majorVersion?/:minorVersion?/:encodedUserId?', async (req, res, next) => {
  let docId = req.params.country.toUpperCase();
  if (req.params.partner) {
    docId = docId + '_' +req.params.partner.toUpperCase();
  } 
  if (req.params.majorVersion) {
    docId = docId + '_' + req.params.majorVersion.toUpperCase();
  } 
  if (req.params.minorVersion) {
    docId = docId + '_' + req.params.minorVersion.toUpperCase();
  }
  const key = {
        [FEATURE_CONSTANT.DOC_ID] : docId
      };
    const data = await getFeatureFlags(FEATURE_FLAGS_TABLE, key);
    res.status(200).json(data);
});
apiFeatureRouter.post ('/megatron/list.optimus.json', async (req, res, next) => {
    res.status(200).json({
      "status":"success"
    });
});

module.exports = apiFeatureRouter;

