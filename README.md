Set up custom VPC in AWS
1. export AWS_DEFAULT_REGION=us-east-1    //set the region at Virginia. If you change this you have to change the ami in ~/pulumi-project/create-instance/index.ts

2. Create key pair following the process below: (for more detail refer to https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#retrieving-the-public-key)
    1. aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text > MyKeyPair.pem   //create a key pair call MyKeyPair
    2. chmod 400 MyKeyPair.pem    //config the authority
    3. ssh-keygen -y -f MyKeyPair.pem   //get public key

3. Configure ssh-agent on Mac (for more detail refer to https://aws.amazon.com/blogs/security/securely-connect-to-linux-instances-running-in-a-private-amazon-vpc/)
    1. ssh-add -K myPrivateKey.pem
    2. ssh-add –L

4. go to ~/pulumi-project/create-instance

5. Run pulumi up

6. Preview the update and press "yes" to start the deployment.


Test the connection

1. To access public instance, type: ssh -A ec2-user@<public instance’s DNS>

2. Access to private instance from public instance, type: ssh -A ec2-user@<private instance’s private Ip>

3. Access to google from private instance, type: ping 8.8.8.8





