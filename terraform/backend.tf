terraform {
  backend "s3" {
    bucket         = "mechanic-finder-terraform-state-851226124367"
    key            = "prod/terraform.tfstate"
    region         = "eu-north-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
