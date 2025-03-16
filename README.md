# CDK Project - rpatel8975566

This project creates AWS resources using CloudFormation:
- S3 Bucket (`rpatel-8975566-bucket-234902362832`)
- DynamoDB Table (`rpatel-table-8975566`)
- Lambda Function (`rpatel-lambda-8975566`)

## Deployment Process

Due to AWS Academy lab environment limitations, the deployment process is manual:

1. Get fresh AWS Academy credentials from your lab environment
2. Configure AWS CLI with the credentials:
   ```bash
   aws configure
   ```

3. Deploy the stack:
   ```bash
   aws cloudformation deploy \
     --template-file template.yaml \
     --stack-name rpatel-8975566-stack \
     --capabilities CAPABILITY_NAMED_IAM
   ```

## Pipeline Limitations

The original plan included AWS CodePipeline, but due to AWS Academy lab limitations:
- CodePipeline cannot assume the LabRole
- GitHub integration requires additional permissions not available in the lab
- Temporary session tokens prevent automated deployments

### Alternative Deployment Methods

For this project, we use manual deployments through CloudFormation. In a production environment, you would:
1. Use AWS CodePipeline with proper IAM roles
2. Set up GitHub integration through CodeStar Connections
3. Configure automated deployments on code changes

## Testing the Resources

1. Test Lambda Function:
   ```bash
   aws lambda invoke --function-name rpatel-lambda-8975566 --payload '{}' response.json
   ```

2. Test DynamoDB:
   ```bash
   # Write item
   aws dynamodb put-item \
     --table-name rpatel-table-8975566 \
     --item '{"id": {"S": "test1"}, "message": {"S": "Hello!"}}'

   # Read item
   aws dynamodb get-item \
     --table-name rpatel-table-8975566 \
     --key '{"id": {"S": "test1"}}'
   ```

3. S3 Bucket:
   The bucket `rpatel-8975566-bucket-234902362832` is created with secure settings:
   - Public access blocked
   - Server-side encryption enabled
   - Versioning available

## Author

Created by rpatel8975566
