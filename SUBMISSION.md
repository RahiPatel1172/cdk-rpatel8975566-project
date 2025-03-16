# AWS CDK Project Submission
**Student ID:** 8975566  
**GitHub Repository:** https://github.com/RahiPatel1172/cdk-rpatel8975566-project.git

## 1. Project Overview
This project implements a serverless backend infrastructure using AWS CDK and CloudFormation, consisting of:
- S3 Bucket for secure file storage
- DynamoDB Table for data persistence
- Lambda Function for serverless computing

### Architecture Diagram
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

## 2. AWS Resources Implementation

### 2.1 S3 Bucket
- **Name:** ${STACK_NAME}-bucket-${AWS_ACCOUNT}
- **Security Features:**
  - Public access blocked
  - Server-side encryption enabled
  - Versioning enabled
- [Insert S3 Screenshot Here]

### 2.2 Lambda Function
- **Name:** ${STACK_NAME}-lambda
- **Runtime:** Node.js 18.x
- **Functionality:** Processes requests and interacts with S3 and DynamoDB
- [Insert Lambda Screenshot Here]

### 2.3 DynamoDB Table
- **Name:** ${STACK_NAME}-table
- **Schema:** Primary key 'id' (String)
- **Capacity:** On-demand (PAY_PER_REQUEST)
- [Insert DynamoDB Screenshot Here]

## 3. CI/CD Pipeline Implementation

### 3.1 GitHub Actions Workflow
Instead of AWS CodePipeline (due to AWS Academy limitations), we implemented a CI/CD pipeline using GitHub Actions that includes:

1. **Validation Stage**
   - Checks CloudFormation template
   - Validates AWS credentials
   - [Insert Validation Screenshot Here]

2. **Deployment Stage**
   - Deploys CloudFormation stack
   - Creates/updates AWS resources
   - [Insert Deployment Screenshot Here]

3. **Verification Stage**
   - Confirms resource creation
   - Tests resource accessibility
   - [Insert Verification Screenshot Here]

### 3.2 Pipeline Security
- AWS credentials stored as GitHub Secrets
- No hardcoded values in code
- Secure resource naming conventions

## 4. Implementation Notes

### 4.1 AWS Academy Considerations
- Used GitHub Actions instead of CodePipeline due to lab environment limitations
- Implemented secure credential management
- Maintained Infrastructure as Code best practices

### 4.2 Security Measures
- All resources follow AWS security best practices
- No public access to S3 bucket
- Proper IAM role configurations
- Secrets management via GitHub Secrets

## 5. Testing Evidence

### 5.1 Resource Testing
```bash
# Lambda Test
aws lambda invoke --function-name ${STACK_NAME}-lambda --payload '{}' response.json

# DynamoDB Test
aws dynamodb put-item --table-name ${STACK_NAME}-table \
  --item '{"id": {"S": "test1"}, "message": {"S": "Hello!"}}'

# S3 Bucket Verification
aws s3 ls s3://${STACK_NAME}-bucket-${AWS_ACCOUNT}
```
[Insert Test Results Screenshots Here]

## 6. Deployment Instructions
1. Clone repository
2. Configure AWS credentials
3. Run GitHub Actions workflow
4. Verify resource creation

[Insert Final Stack Status Screenshot Here] 