function kops_create(value) {
    const { exec } = require("child_process");
        exec("kops create cluster \
        --state=${KOPS_STATE_STORE} \
        --node-count="+ value.field1+" \
        --master-size=t2.medium \
        --node-size=t2.medium \
        --zones=us-east-1a \
        --name=${KOPS_CLUSTER_NAME} \
        --ssh-public-key=/home/ec2-user/.ssh/id_rsa.pub \
        --dns private \
        --master-count "+value.field2 +" \
        --yes", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
            
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
                return;
        }
        if (stdout) {
            console.log(`stdout: ${stdout}`);
            return 0;
        }
                
    });
}

function verify_2() {
    const { exec } = require("child_process");
        exec("kops validate cluster", (error, stdout, stderr) => {
        if (error) {
            console.log("Aguardando Validação");
            return setTimeout(verify,180000);    
        } 
        if (stdout) {
            console.log(`stdout: ${stdout}`);
            return 1;
        }
    });

}


function verify() {
    const { exec } = require("child_process");
        exec("kops validate cluster", (error, stdout, stderr) => {
        if (error) {
            console.log("Aguardando Validação");
            return 0;   
        } 
        if (stdout) {
            console.log(`stdout: ${stdout}`);
            dask_install();
            return 1;
        }
    });

}

function dask_install(){
    const { exec } = require("child_process");
    exec("helm install dask dask/dask", (error, stdout, stderr) => {
    if (error) {
        console.log("Aguardando Validação");
        return 0;   
    } 
    if (stdout) {
        console.log(`stdout: ${stdout}`);
        return 1;
    }
});

}

function kops_delete() {
    const { exec } = require("child_process");
        exec("kops delete cluster --yes", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
            
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
                return;
        }
        if (stdout) {
            console.log(`stdout: ${stdout}`);
            return 0;
        }
                
    });
}

module.exports = {
    teste: teste,
    kops_create: kops_create,
    verify: verify,
    delete: kops_delete
    
}

