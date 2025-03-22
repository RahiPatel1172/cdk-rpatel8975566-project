#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkRpatel8975566ProjectStack } from '../lib/cdk-rpatel8975566-project-stack';

const app = new cdk.App();
new CdkRpatel8975566ProjectStack(app, 'rpatel-8975566-pipeline-stack', {});
