install_kops(){

    if ! command -v kops &> /dev/null
    then
        echo 'Error: Kops is not installed. Installing Kops' >&2
        curl -LO https://github.com/kubernetes/kops/releases/download/$(curl -s https://api.github.com/repos/kubernetes/kops/releases/latest | grep tag_name | cut -d '"' -f 4)/kops-linux-amd64
        chmod +x kops-linux-amd64
        sudo mv kops-linux-amd64 /usr/local/bin/kops
    fi
}

install_kubectl(){

    if ! command -v kubectl &> /dev/null
    then
        echo 'Error: Kubectl is not installed. Installing Kubectl' >&2
        curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
        chmod +x ./kubectl
        sudo mv ./kubectl /usr/local/bin/kubectl
    fi
}

install_node(){

    if ! command -v node &> /dev/null
    then
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
        . ~/.nvm/nvm.sh
        nvm install node
    fi
}

install_awscli(){

    if ! command -v aws &> /dev/null
    then
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        unzip awscliv2.zip
        sudo ./aws/install
    fi

}


install_kops
install_kubectl
install_node
install_awscli