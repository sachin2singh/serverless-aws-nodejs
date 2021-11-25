const AWS = require('aws-sdk'); 
const dotenv = require('dotenv');
const envVar = dotenv.config();
if (envVar.error) throw new Error('envVar error', envVar.error);
/*below values from .env file  */
const endpoint = process.env.DYNAMO_ENDPOINT;
const accessKeyId = process.env.DYNAMO_ACCESSKEY;
const secretAccessKey = process.env.DYNAMO_SECRET;
const region = process.env.DYNAMO_REGION; 

class DynamodbStorage{

    constructor () {
      if (process.env.host=== 'local') {
        console.log('Dynamodb config on' + ' -> ' + process.env.local + 'endpoint: ' +endpoint);
        AWS.config.update({
          region,
          endpoint,
          accessKeyId,
          secretAccessKey
        });
      }
      this.docClient = new AWS.DynamoDB.DocumentClient({ convertEmptyValues: true });
    }
    
    getDoc(docObject) {
      console.log('Dynamodb params : ' + ' -> ' + JSON.stringify(docObject));
        return new Promise((resolve, reject) => {
          this.docClient.get(docObject, (err, data) => {
            if (err) {
              console.log('Dynamodb error : ' + ' -> ' + JSON.stringify(err));
              reject(err);
            } else {
              console.log('Dynamodb Data : ' + ' -> ' + JSON.stringify(data));
              resolve(data);
            }
          });
        });
    }
}

module.exports = DynamodbStorage;
