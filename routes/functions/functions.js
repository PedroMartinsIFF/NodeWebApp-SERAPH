const spawn = require('child_process').spawn;
const process = spawn ('python3', ['../script1.py']);


function kops_create(value) {
    const { exec } = require("child_process");
        exec("kops create cluster \
        --state="+ value.field3+" \
        --node-count="+ value.field1+" \
        --master-size="+ value.field4+" \
        --node-size="+ value.field4+" \
        --zones=us-east-1a \
        --name="+ value.field5+" \
        --ssh-public-key=/home/ec2-user/.ssh/id_rsa.pub \
        --dns private \
         --master-count="+value.field2+" \
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
            dask_install();
            return 1;
        }
    });

}


function verify() {
    const { exec } = require("child_process");
        retorno = 0;
        exec("kops validate cluster", (error, stdout, stderr) => {
        if (error) {
            retorno = 0;
            console.log("Aguardando Validação");
            
 
        } 
        if (stdout) {
            console.log(`stdout: ${stdout}`);
            
            
            retorno = 1;
        }

        return retorno;
    });

}

function dask_install(){
    const { exec } = require("child_process");
    exec("helm install dask dask/dask -f values.yaml", (error, stdout, stderr) => {
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

function teste(){
    console.log("HEREEE")

    process.stdout.on('data', data => {
        console.log(data.toString());
    })

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
    kops_create: kops_create,
    verify: verify,
    verify_2: verify_2,
    delete: kops_delete,
    teste: teste
    
}

