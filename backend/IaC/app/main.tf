terraform {
  required_providers {
    aws = {
      version = "~> 3.27"
      source  = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket  = "elmsterraform"
    key     = "app-state/states"
    region  = "us-west-1"
    encrypt = true
  }
}
provider "aws" {
  region = "us-west-1"
}
