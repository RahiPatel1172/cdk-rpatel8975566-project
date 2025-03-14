import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { Construct } from 'constructs';
import { CdkRpatel8975566ProjectStack } from './cdk-rpatel8975566-project-stack';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a CodeCommit repository
    const repo = new codecommit.Repository(this, 'RpatelRepository', {
      repositoryName: 'rpatel-8975566-repo',
      description: 'Repository for CDK project by rpatel8975566',
    });

    const pipeline = new pipelines.CodePipeline(this, 'RpatelPipeline', {
      pipelineName: 'RpatelPipeline-8975566',
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.codeCommit(repo, 'main'),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });

    // Create a stage for deployment
    const deployStage = new cdk.Stage(this, 'DeployStage');
    // Create the application stack within the deployment stage
    new CdkRpatel8975566ProjectStack(deployStage, 'Deploy');
    // Add the stage to the pipeline
    pipeline.addStage(deployStage);

    // Output the clone URL for reference
    new cdk.CfnOutput(this, 'CodeCommitRepoURL', {
      value: repo.repositoryCloneUrlHttp,
      description: 'The URL to clone the repository',
    });
  }
}