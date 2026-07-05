resource "aws_eip" "mechanic_finder" {

  lifecycle {
    ignore_changes = all
  }
}
