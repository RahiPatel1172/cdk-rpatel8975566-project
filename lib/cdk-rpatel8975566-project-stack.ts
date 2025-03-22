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
      bucketName: `rpatel-8975566-bucket1-${this.account}`,
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

    // Create Lamda Function
     const myLambda = new lambda.Function(this, 'MyLambda', {
      functionName: 'cdk-lambda-rpatel',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
      exports.handler = async function(event) {
        console.log('Lambda invoked!');
        return { statusCode: 200, body: 'Hello, World!' };
      }
      `),
      environment: {
      BUCKET_NAME: bucket.bucketName,
      },
    });
  }
}
