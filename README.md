# NodeWebApp-SERAPH

# Setting up

# Install Git

$ sudo yum install git -y

# Install Node

$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
$ . ~/.nvm/nvm.sh
$ nvm install node

# Install Kops on EC2

$ curl -LO https://github.com/kubernetes/kops/releases/download/$(curl -s https://api.github.com/repos/kubernetes/kops/releases/latest | grep tag_name | cut -d '"' -f 4)/kops-linux-amd64
$ chmod +x kops-linux-amd64
$ sudo mv kops-linux-amd64 /usr/local/bin/kops

# Install kubectl

$ curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
$ chmod +x ./kubectl
$ sudo mv ./kubectl /usr/local/bin/kubectl

# Create an S3 bucket in AWS

$ aws s3 mb s3://<bucket name> --region <region>

# Create an private hosted zone in AWS Route 53

# Configure environment variables

$ vi ~/.bashrc

Add the following content

export KOPS_CLUSTER_NAME=< Cluster name >
export KOPS_STATE_STORE=< S3 Bucket >

Run this command to update

$ source ~/.bashrc

# Create SSH key pair

$ ssh-keygen