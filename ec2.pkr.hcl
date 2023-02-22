variable "aws_region" {
  type = string
  default = "us-east-1"
}

variable "profile" {
    type = string
    default = "dev"
}

source "amazon-ebs" "amazon-linux-2" {
    profile = var.profile
  region      = var.aws_region
  instance_type = "t2.micro"
  ssh_username = "ec2-user"
  source_ami = "ami-0dfcb1ef8550277af"
  force_deregister = "true"
  ami_users = ["548224179101","158520471333"]

    ami_name = "my-app-ami-with-mysql"
  ami_description = "Amazon Linux 2 with MySQL installed for my app"
  launch_block_device_mappings {
    device_name = "/dev/xvda"
    volume_size = 8
    volume_type = "gp2"
    delete_on_termination = true
}
}
build {
  name    = "custom-ami-with-mysql"
  sources = ["source.amazon-ebs.amazon-linux-2"]

  provisioner "shell" {
    inline = [
      "sudo yum -y update",
      "sudo curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -",
      "sudo yum install -y nodejs",
      "sudo amazon-linux-extras install epel -y",
      "sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm -y",
      "sudo yum install mysql-community-server -y",
      "sudo systemctl enable mysqld",
      "sudo systemctl start mysqld",
      "password=$(sudo grep 'temporary password' /var/log/mysqld.log | awk {'print $13'})",
      "mysql --connect-expired-password -u root -p$password -e \"ALTER USER 'root'@'localhost' IDENTIFIED BY 'Chinna@1060';\"",
      "mkdir /home/ec2-user/webapp",
      "chown ec2-user:ec2-user /home/ec2-user/webapp",
    ]
  }
  provisioner "file" {
    destination = "/home/ec2-user/webapp"
    source = "./"
  }
 
  provisioner "shell" {
    inline = [
      "cd /home/ec2-user/webapp",
      "npm install",
      "sudo cp /home/ec2-user/webapp/webapp.service /lib/systemd/system/webapp.service",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable webapp",
      "sudo systemctl start webapp"
    ]
  }
}