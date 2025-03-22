import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export class CdkRpatel8975566ProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const bucket = new s3.Bucket(this, 'RpatelBucket1', {
      bucketName: `rpatel-8975566-bucket-${this.account}`,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // Create DynamoDB table
    const table = new dynamodb.Table(this, 'RpatelTable', {
      tableName: 'rpatel-table-8975566',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create Lambda function
    const func = new lambda.Function(this, 'RpatelLambda', {
      functionName: 'rpatel-lambda-8975566',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const AWS = require('aws-sdk');
        const s3 = new AWS.S3();
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        exports.handler = async (event) => {
          console.log('Lambda executed by rpatel8975566!');
          
          // Get bucket info
          const bucketParams = {
            Bucket: process.env.BUCKET_NAME
          };
          const bucketInfo = await s3.getBucketVersioning(bucketParams).promise();
          
          // Save execution record to DynamoDB
          const timestamp = new Date().toISOString();
          const dbParams = {
            TableName: process.env.TABLE_NAME,
            Item: {
              id: timestamp,
              executionTime: timestamp,
              requestId: event.requestContext?.requestId || 'direct-invoke'
            }
          };
          await dynamodb.put(dbParams).promise();
          
          return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: 'Success from rpatel8975566!',
              timestamp: timestamp,
              requestId: event.requestContext?.requestId || 'direct-invoke',
              bucketInfo: {
                name: process.env.BUCKET_NAME,
                versioning: bucketInfo.Status || 'Enabled'
              },
              dynamoTable: process.env.TABLE_NAME
            })
          };
        };
      `),
      environment: {
        BUCKET_NAME: bucket.bucketName,
        TABLE_NAME: table.tableName,
      },
      timeout: cdk.Duration.seconds(30),
      memorySize: 256
    });

    // Grant Lambda permissions
    bucket.grantReadWrite(func);
    table.grantReadWriteData(func);

    // Output the resource names
    new cdk.CfnOutput(this, 'BucketName', {
      value: bucket.bucketName,
      description: 'The name of the S3 bucket',
    });

    new cdk.CfnOutput(this, 'TableName', {
      value: table.tableName,
      description: 'The name of the DynamoDB table',
    });

    new cdk.CfnOutput(this, 'LambdaName', {
      value: func.functionName,
      description: 'The name of the Lambda function',
    });
  }
}
