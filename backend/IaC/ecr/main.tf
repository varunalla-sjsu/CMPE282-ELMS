terraform {
  required_providers {
    aws = {
      version = "~> 3.27"
      source  = "hashicorp/aws"
    }
  }
}
provider "aws" {
  region = "us-west-1"
}
resource "aws_ecr_repository" "elms-repository" {
  name                 = "elms-repository"
  image_tag_mutability = "IMMUTABLE"
}

resource "aws_ecr_repository_policy" "aws_ecr_repository" {
  repository = aws_ecr_repository.elms-repository.name
  policy     = <<EOF
  {
    "Version": "2008-10-17",
    "Statement": [
      {
        "Sid": "adds full ecr access to the elms repository",
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetLifecyclePolicy",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]
      }
    ]
  }
  EOF
}