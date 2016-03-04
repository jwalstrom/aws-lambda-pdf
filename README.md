# aws-lambda-pdf
Convert a URL to PDF using wkhtmltopdf on AWS Lambda

Takes an url, [wkhtmlpdf options](http://wkhtmltopdf.org/usage/wkhtmltopdf.txt), destination bucket and returns the filename of the pdf uploaded to the specified S3 bucket.

## Input

```json
{
 "url": "https://pshfrm.me/d/d6a74757-ffda-4163-a41a-a433014c91f6",
 "options": {
   "printMediaType": true,
   "T": 10,
   "B": 10
 },
 "bucket": "rmpdf"
}
```

## Output

```json
{
    "filename": "tcvyg8n2hhy0t3xr.pdf"
}
```

## Configuration

1. Make sure AWS Lambda function has `PutObject` access to S3 bucket
2. The more memory the function has the quicker it is to render PDF
