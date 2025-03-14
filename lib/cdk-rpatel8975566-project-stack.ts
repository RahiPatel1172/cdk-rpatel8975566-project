import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class CdkRpatel8975566ProjectStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket with your ID
    const bucket = new s3.Bucket(this, 'RpatelS3Bucket', {
      bucketName: `rpatel-8975566-bucket`, // Globally unique name
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // DynamoDB Table with your ID
    const table = new dynamodb.Table(this, 'RpatelDynamoTable', {
      tableName: 'RpatelTable-8975566',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Function with your ID
    const myLambda = new lambda.Function(this, 'RpatelLambda', {
      functionName: 'RpatelLambda-8975566',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Lambda executed by rpatel8975566!');
          return { statusCode: 200, body: 'Success' };
        };
      `),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    // Grant Lambda access to DynamoDB
    table.grantWriteData(myLambda);
  }
}