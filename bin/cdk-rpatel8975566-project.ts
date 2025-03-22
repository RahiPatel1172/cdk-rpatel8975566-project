#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/lib/cdk-rpatel8975566-project-stack';

const app = new cdk.App();
new CdkStack(app, 'rpatel-8975566-pipeline-stack', {});
