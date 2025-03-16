import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { CdkRpatel8975566ProjectStack } from './cdk-rpatel8975566-project-stack';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create pipeline role with necessary permissions
    const pipelineRole = new iam.Role(this, 'PipelineRole', {
      assumedBy: new iam.ServicePrincipal('codepipeline.amazonaws.com'),
      roleName: `${this.stackName}-pipeline-role`,
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeStarFullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCodeBuildAdminAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCloudFormationFullAccess'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')
      ]
    });

    // Add inline policy for CodePipeline
    pipelineRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'codepipeline:*',
        'codestar-connections:*',
        'iam:PassRole',
        'sts:AssumeRole'
      ],
      resources: ['*']
    }));

    // Create the pipeline
    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: `${this.stackName}-pipeline`,
      role: pipelineRole,
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection(
          'RahiPatel1172/cdk-rpatel8975566-project',
          'master',
          {
            connectionArn: 'arn:aws:codeconnections:us-east-2:351435317420:connection/54355a3a-1aaf-4191-9d84-eea29a20cfcd'
          }
        ),
        commands: [
          'npm install -g aws-cdk',
          'npm ci',
          'npm run build',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cdk.out'
      }),
      selfMutation: true,
      crossAccountKeys: true
    });

    // Add deployment stage
    const deployStage = new cdk.Stage(this, 'Deploy', {
      env: {
        account: '351435317420',
        region: 'us-east-2'
      }
    });
    
    // Add application stack to deployment stage
    const appStack = new CdkRpatel8975566ProjectStack(deployStage, 'AppStack');
    
    // Add deployment stage to pipeline with manual approval
    pipeline.addStage(deployStage, {
      pre: [
        new pipelines.ManualApprovalStep('Approve')
      ]
    });
  }
} 