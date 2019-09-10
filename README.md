<h1> Set up custom VPC in AWS </h1>
<h4> 1. Export AWS_DEFAULT_REGION=us-east-1 </h4>   // it sets the region at Virginia. If you change this you have to change the ami in ~/pulumi-project/create-instance/index.ts

<h4> 
   2. Create key pair following the process below: (for more detail refer to https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#retrieving-the-public-key)
</h4>
<ul> 
     <li>  aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text > MyKeyPair.pem  //create a key pair call MyKeyPair </li>
     <li>  chmod 400 MyKeyPair.pem    //config the authority </li>
     <li>  ssh-keygen -y -f MyKeyPair.pem  //get public key and store that in ~/.ssh/authorized_keys </li>
</ul>

<h4> 3. Configure ssh-agent on Mac (for more detail refer to https://aws.amazon.com/blogs/security/securely-connect-to-linux-instances-running-in-a-private-amazon-vpc/) 
</h4>
<ul>
    <li>  ssh-add -K myPrivateKey.pem </li>
    <li>  ssh-add –L </li>
</ul>
<h4> 4. Go to ~/pulumi-project/create-instance </h4>

<h4> 5. Run pulumi up </h4>

<h4> 6. Preview the update and press "yes" to start the deployment. </h4>

<h4> 7. After deployment, it should succesfully set up a VPC with two availability zones. Each availibility zone will have a public subnet and a private subnet with a Nat gateway in the public subnet. </h4>

<h4> 8. Also, it will deploy a ec2 instance with a security group in each public subnet and two ec2 instances with a security group in each private subnet. </h4>



<h1> Test the connection </h1>

<h4> 1. To access public instance, type: ssh -A ec2-user@<public instance’s DNS> </h4>

<h4> 2. Access to private instance from public instance, type: ssh -A ec2-user@<private instance’s private Ip> </h4>

<h4> 3. Access to google from private instance, type: ping 8.8.8.8 </h4>





