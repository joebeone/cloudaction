# [Alpha] Node scripts for generating AWS IAM policies in Terraform HCL format

## Purpose

This command-line program provides an simple easy-to-use interface for generating AWS IAM policies in Terraform HCL format. With the program, you can:

- List all available AWS services
- View the actions available for a specific service
- Generate a Terraform HCL policy file for a specific service with a given list of actions

## Features

 Generate AWS IAM policies in Terraform HCL format:

- Fast and easy way to create new policies
- Policies are generated with a clear and consistent format
- Policies are easy to read and maintain
- Consistent use of Terraform HCL format across multiple policies

## Installation and Usage

To use the program, follow these steps:

1. Clone the project to your local machine
2. Install the required dependencies by running `npm install` from the project directory
3. Open the command line and navigate to the project directory
4. Start the program by running the command `node main.js`
5. Select an option from the menu
6. Follow the prompts to input any required information, such as the name of the service and the list of actions

## Example

How to use the program to generate a Terraform HCL policy file:

1. Open the command line and navigate to the project directory
2. Start the program by running the command `node main.js`
3. Select option 3 from the menu to create an HCL policy file
4. When prompted, enter the name of the service for the policy file
5. When prompted, enter a comma-separated list of the actions for the policy file
6. The program will generate a Terraform HCL policy file with the given service name and actions

```bash
$ node main.js

Select an option:
1. List all services
2. View actions for a service
3. Create an HCL policy file
4. Exit

Option: 3

Enter service name: AWS EC2
Enter actions (comma-separated): ec2:DescribeInstances, ec2:StartInstances, ec2:StopInstances

HCL policy file created: policy_AWSEC2_2022-05-09T14-53-01.tf

```

## Dependencies

The program requires the following dependencies:

- Node.js v12 or later
- `fs` (built-in)
- `readline` (built-in)

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## To Do:
- Add Conditions configuration to HCL. Currently generates blank condition. 
