#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkRpatel8975566ProjectStack } from '../lib/cdk-rpatel8975566-project-stack';

const app = new cdk.App();
new CdkRpatel8975566ProjectStack(app, 'RpatelResourceStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});