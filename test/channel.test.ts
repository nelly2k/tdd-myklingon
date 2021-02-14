import * as cdk from '@aws-cdk/core';
import '@aws-cdk/assert/jest';

describe('Given that communication channel is needed', () => {
    describe('When changes are allowed', () => {
        it('Then requester can create a new record', () => {
            const stack = new cdk.Stack();

            new Channel(stack, 'api', {
                isReadOnly: false
            });

            expect(stack).toHaveResource("AWS::ApiGateway::Method", {
                HttpMethod: 'POST'
            })
        });
    });
});