import * as cdk from '@aws-cdk/core';
import '@aws-cdk/assert/jest';
import * as apigateway from '@aws-cdk/aws-apigateway';

interface ChannelProps {
    isReadOnly: boolean
}

class Channel extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string, props: ChannelProps) {
        super(scope, id);
        const api = new apigateway.RestApi(this, 'books-api');
        api.root.addMethod('POST');
    }
}

describe('Given that communication channel is needed', () => {
    let stack: cdk.Stack;

    beforeEach(() => {
        stack = new cdk.Stack();
    });

    describe('When changes are allowed', () => {
        it('Then requester can create a new record', () => {
            const stack = new cdk.Stack();

            new Channel(stack, 'api', {
                isReadOnly: false
            });

            expect(stack).toHaveResource("AWS::ApiGateway::Method", {
                HttpMethod: 'POST'
            });
        });
    });

    describe('When changes are not allowed', () => {
        it('Then requester cannot create a new record', () => {
            new Channel(stack, 'api', {
                isReadOnly: true
            });
            expect(stack).not.toHaveResource("AWS::ApiGateway::Method", {
                HttpMethod: 'POST'
            });
        });
    });
});