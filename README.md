# CDK Project - rpatel8975566

## Project Overview
In this project, I demonstrate AWS infrastructure as code using CloudFormation. It creates a serverless backend with:
- S3 Bucket for file storage
- DynamoDB Table for data persistence
- Lambda Function for business logic

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

3. Testing:
   ```bash
   npm run test
   ```

## Deployment Process

I implemented automated deployments using GitHub Actions. The workflow includes:

1. **Validation Stage**
   - Validates CloudFormation template
   - Checks AWS credentials
   - Verifies resource configurations

2. **Deployment Stage**
   - Deploys CloudFormation stack
   - Creates/updates AWS resources
   - Manages stack updates

3. **Verification Stage**
   - Confirms resource creation
   - Tests resource accessibility
   - Validates stack outputs

## CI/CD Implementation

### GitHub Actions Workflow
Due to AWS Academy lab environment limitations, I implemented CI/CD using GitHub Actions. The workflow:
- Automatically validates and deploys changes
- Manages AWS credentials securely
- Provides deployment logs and status
- Ensures consistent deployments

### Security Considerations
I implemented several security measures:
- AWS credentials stored as GitHub Secrets
- No hardcoded values in code
- Secure resource naming conventions
- Proper IAM role configurations

## Testing the Resources

1. Test Lambda Function:
   ```bash
   aws lambda invoke --function-name ${STACK_NAME}-lambda --payload '{}' response.json
   ```

2. Test DynamoDB:
   ```bash
   # Write item
   aws dynamodb put-item \
     --table-name ${STACK_NAME}-table \
     --item '{"id": {"S": "test1"}, "message": {"S": "Hello!"}}'

   # Read item
   aws dynamodb get-item \
     --table-name ${STACK_NAME}-table \
     --key '{"id": {"S": "test1"}}'
   ```

3. S3 Bucket:
   The bucket is created with secure settings:
   - Public access blocked
   - Server-side encryption enabled
   - Versioning enabled

## AWS Academy Lab Environment Note
While AWS CodePipeline is commonly used in production environments, I chose to implement GitHub Actions due to lab environment constraints. This provides equivalent functionality while working within the available permissions.


