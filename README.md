# CDK Project - rpatel8975566

## Project Overview
In this project, I demonstrate AWS infrastructure as code using CloudFormation. It creates a serverless backend with:
- S3 Bucket for file storage (`rpatel-8975566-bucket-351435317420`)
- DynamoDB Table for data persistence (`rpatel-table-8975566`)
- Lambda Function for business logic (`rpatel-lambda-8975566`)

## Architecture
```
┌──────────────┐     ┌──────────────┐
│  S3 Bucket   │     │    Lambda    │
│   Storage    │◄────┤   Function   │
└──────────────┘     └──────┬───────┘
                            │
                     ┌──────▼───────┐
                     │   DynamoDB   │
                     │    Table     │
                     └──────────────┘
```

## Local Development
1. Prerequisites:
   - Node.js 
   - AWS CLI
   - AWS CDK CLI

2. Setup:
   ```bash
   npm install
   npm run build
   ```

## Deployment Process

The project uses AWS CodePipeline for automated deployments. The pipeline includes:

1. **Source Stage**
   - Monitors GitHub repository for changes
   - Uses CodeStar connection for GitHub integration
   - Triggers pipeline on code changes

2. **Build Stage**
   - Uses AWS CodeBuild
   - Installs dependencies
   - Builds and synthesizes CDK code
   - Generates CloudFormation template

3. **Deploy Stage**
   - Manual approval step for safety
   - Deploys CloudFormation stack
   - Creates/updates AWS resources
   - Validates stack outputs

## CI/CD Implementation

### AWS CodePipeline
The pipeline is configured to:
- Monitor the GitHub repository
- Build and validate changes
- Deploy to AWS with approval
- Manage infrastructure updates

### Security Features
- AWS CodeStar connection for secure GitHub integration
- IAM roles with least privilege
- Resource policies for S3 and DynamoDB
- Secure Lambda execution environment

## Testing the Resources

1. Test Lambda Function:
   ```bash
   aws lambda invoke \
     --function-name rpatel-lambda-8975566 \
     --region us-east-2 \
     --payload '{}' response.json
   ```

2. Test DynamoDB:
   ```bash
   # Write item
   aws dynamodb put-item \
     --table-name rpatel-table-8975566 \
     --region us-east-2 \
     --item '{"id": {"S": "test1"}, "message": {"S": "Hello!"}}'

   # Read item
   aws dynamodb get-item \
     --table-name rpatel-table-8975566 \
     --region us-east-2 \
     --key '{"id": {"S": "test1"}}'
   ```

3. Test S3 Bucket:
   ```bash
   # List contents
   aws s3 ls s3://rpatel-8975566-bucket-351435317420 --region us-east-2
   
   # Upload file
   aws s3 cp test.txt s3://rpatel-8975566-bucket-351435317420/ --region us-east-2
   ```

## Resource Configuration

### S3 Bucket
- Name: rpatel-8975566-bucket-351435317420
- Region: us-east-2
- Features:
  - Versioning enabled
  - Public access blocked
  - Server-side encryption

### DynamoDB Table
- Name: rpatel-table-8975566
- Region: us-east-2
- Configuration:
  - Partition key: id (String)
  - On-demand capacity

### Lambda Function
- Name: rpatel-lambda-8975566
- Region: us-east-2
- Runtime: Node.js 18.x
- Environment variables:
  - BUCKET_NAME
  - TABLE_NAME


