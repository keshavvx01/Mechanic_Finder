resource "aws_instance" "mechanic_finder" {
  ami                    = "ami-05bfa4a7765f38076"
  instance_type          = "t3.micro"
  key_name               = "mechanic-finder-key"
  subnet_id              = "subnet-049eb621226aa6209"
  vpc_security_group_ids = [
    aws_security_group.mechanic_finder_sg.id
  ]

  tags = {
    Name = var.project_name
  }

  lifecycle {
    ignore_changes = all
  }
}

