#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TddMyklingonStack } from '../lib/tdd-myklingon-stack';

const app = new cdk.App();
new TddMyklingonStack(app, 'TddMyklingonStack');
