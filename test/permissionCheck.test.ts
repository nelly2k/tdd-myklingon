import * as cdk from '@aws-cdk/core';
import '@aws-cdk/assert/jest';
import * as iam from '@aws-cdk/aws-iam';

describe('Given that scope is provided', () => {
    describe('When there is an allow policy', () => {
        test('and no resource restrictions then warning is added', () => {
            const stack = new cdk.Stack();

            const role = new iam.Role(stack, 'myrole.iamrole', {
                assumedBy: new iam.ServicePrincipal('sns.amazonaws.com'),
            });

            role.addToPolicy(new iam.PolicyStatement({
                resources: ['*'],
                actions: ['lambda:InvokeFunction'],
            }));

            cdk.Aspects.of(stack).add(new PermissionCheck());
        
            ???
        });
    });
});