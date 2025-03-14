# CDK Project - rpatel8975566

This project is an AWS CDK application that demonstrates the creation and management of AWS resources using Infrastructure as Code (IaC). The project includes a CI/CD pipeline using AWS CodePipeline for automated deployments.

## Architecture

The project creates the following AWS resources:
- S3 Bucket (`rpatel-8975566-bucket`)
- DynamoDB Table (`RpatelTable-8975566`)
- Lambda Function (`RpatelLambda-8975566`)
- AWS CodePipeline for CI/CD

## Prerequisites

- Node.js 18.x or later
- AWS CLI configured with appropriate credentials
- AWS CDK CLI (`npm install -g aws-cdk`)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/RahiPatel1172/cdk-rpatel8975566-project.git
   cd cdk-rpatel8975566-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy the stack:
   ```bash
   cdk deploy
   ```

## CI/CD Pipeline

The project includes an AWS CodePipeline that automatically deploys changes when code is pushed to the main branch. The pipeline:
1. Sources code from GitHub
2. Builds and synthesizes the CDK app
3. Deploys the infrastructure changes

## Project Structure

- `bin/` - CDK app entry point
- `lib/` - Stack definitions
- `test/` - Unit tests
- `cdk.json` - CDK configuration
- `buildspec.yml` - AWS CodeBuild specification

## Author

Created by rpatel8975566
