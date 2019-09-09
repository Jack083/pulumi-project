import {vpcId, vpcPublicSubnetIds, vpcPrivateSubnetIds} from '../custom-vpc/index';

const aws = require("@pulumi/aws");
const size = "t2.micro";     // t2.micro is available in the AWS free tier
const ami  = "ami-0ff8a91507f77f867"; // AMI for Amazon Linux in us-east-1 (Virginia)
const vpc = vpcId; 
const pubSubnet0 = vpcPublicSubnetIds[0];    
const priSubnet0 = vpcPrivateSubnetIds[0];   
const MyKeyPair = "MyKeyPair"


const pubGroup = new aws.ec2.SecurityGroup("pubsubnet-secgrp", {
    egress: [{
        cidrBlocks: ["0.0.0.0/0"],
        fromPort: 0,
        protocol: "-1",
        toPort: 0,
    }],
    ingress: [{
        protocol: "tcp", 
	fromPort: 22, 
	toPort: 22, 
	cidrBlocks: ["0.0.0.0/0"],
    }],
    vpcId: vpc,
    subnetId: pubSubnet0,
});

const priGroup = new aws.ec2.SecurityGroup("prisubnet-secgrp", {
    egress: [{
        cidrBlocks: ["0.0.0.0/0"],
        fromPort: 0,
        protocol: "-1",
        toPort: 0,
    }],
    ingress: [{
	protocol: "tcp", 
	fromPort: 22, 
	toPort: 22, 
	cidrBlocks: ["0.0.0.0/0"],
    }],
    vpcId: vpc,
    subnetId: priSubnet0,
});

const pubInstance = new aws.ec2.Instance("pubInstance-0", {
    instanceType: size,
    subnetId: pubSubnet0,
    securityGroups: [ pubGroup.id ], // reference the security group resource above
    ami: ami,
    keyName: MyKeyPair, 
});

const priInstance = new aws.ec2.Instance("priInstance-0", {
    instanceType: size,
    subnetId: priSubnet0,
    securityGroups: [ priGroup.id ],
    ami: ami,
    keyName: MyKeyPair,
});

const priInstance1 = new aws.ec2.Instance("priInstance-1", {
    instanceType: size,
    subnetId: priSubnet0,
    securityGroups: [ priGroup.id ], 
    ami: ami,
    keyName: MyKeyPair,
});
