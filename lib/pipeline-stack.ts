import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { CdkRpatel8975566ProjectStack } from './cdk-rpatel8975566-project-stack';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'RpatelPipeline', {
      pipelineName: 'RpatelPipeline-8975566',
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.gitHub('RahiPatel1172/cdk-rpatel8975566-project', 'main'),
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
  }
}