const DynamodbStorage = require('../sls.node.ex.dao/sls-node-dao');

module.exports.getFeature = async (tableNamekey, key) => {
    const table = process.env[tableNamekey];
    const params = {
        TableName : table,
        Key: key
    };
    const dynamodb = new DynamodbStorage();
    const response = await dynamodb.getDoc(params);
    if (response.Item && response.Item.data)  {
        return response.Item.data;
    }
    return response; 
}
