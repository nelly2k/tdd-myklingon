

describe('Given that scope is provided', () => {
    describe('When security policy is defined', () => {
        test('and policy has a wildcard resource the warning is added', () => {
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