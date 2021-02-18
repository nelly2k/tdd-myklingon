import * as cdk from '@aws-cdk/core';
import '@aws-cdk/assert/jest';
import * as iam from '@aws-cdk/aws-iam';
import { SynthUtils } from '@aws-cdk/assert';

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
        
            expect(stack).toHaveWarning('Wildcard resources aren\'t allowed');
        });
    });
});

declare global {
    namespace jest {
      interface Matchers<R> {
        toHaveWarning(message: string): R;
      }
    }
}

expect.extend({
    toHaveWarning(received: cdk.Stack, message) {
        const synthResult = SynthUtils.synthesize(received);

        var pass = synthResult.messages
            .filter(x => x.level == 'warning')
            .some(x => x.entry.data == message);
        const output = pass ? 'Template has expected error' : 'Temaplte doesn\'t have an expected error';

        return {
            pass, message: () => output
          }
    }
});