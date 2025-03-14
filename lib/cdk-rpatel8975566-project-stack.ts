import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class CdkRpatel8975566ProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket with your ID
    const bucket = new s3.Bucket(this, 'RpatelS3Bucket', {
      bucketName: `rpatel-8975566-bucket-${this.account}`, // Globally unique name with account ID
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true, // Enable this to allow bucket deletion
    });

    // DynamoDB Table with your ID
    const table = new dynamodb.Table(this, 'RpatelDynamoTable', {
      tableName: 'rpatel-table-8975566',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST, // Use on-demand pricing
    });

    // Lambda Function with your ID
    const myLambda = new lambda.Function(this, 'RpatelLambda', {
      functionName: 'rpatel-lambda-8975566',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Lambda executed by rpatel8975566!');
          return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: 'Success',
              timestamp: new Date().toISOString(),
              requestId: event.requestContext?.requestId
            })
          };
        };
      `),
      environment: {
        BUCKET_NAME: bucket.bucketName,
        TABLE_NAME: table.tableName,
      },
    });

    // Grant Lambda access to resources
    bucket.grantReadWrite(myLambda);
    table.grantReadWriteData(myLambda);

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
      value: myLambda.functionName,
      description: 'The name of the Lambda function',
    });
  }
}