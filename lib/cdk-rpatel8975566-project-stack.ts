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
    const bucket = new s3.Bucket(this, 'RpatelBucket', {
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

    // Grant Lambda permissions
    bucket.grantReadWrite(func);
    table.grantReadWriteData(func);

    // Create Pipeline
    const pipeline = new pipelines.CodePipeline(this, 'RpatelPipeline', {
      pipelineName: 'rpatel-pipeline-8975566',
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub('RahiPatel1172/cdk-rpatel8975566-project', 'master'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
      }),
    });

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