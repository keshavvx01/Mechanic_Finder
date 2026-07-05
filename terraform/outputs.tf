output "ec2_public_ip" {
  value = aws_instance.mechanic_finder.public_ip
}

output "ec2_public_dns" {
  value = aws_instance.mechanic_finder.public_dns
}

output "security_group_id" {
  value = aws_security_group.mechanic_finder_sg.id
}

output "elastic_ip" {
  value = aws_eip.mechanic_finder.public_ip
}
