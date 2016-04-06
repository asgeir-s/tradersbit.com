/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://p6n5vmzsjj.execute-api.us-west-2.amazonaws.com/dev';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.apiStreamsStreamIdSignalPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['x-authorization', 'streamId'], ['body']);
        
        var apiStreamsStreamIdSignalPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/api/streams/{streamId}/signal').expand(apiGateway.core.utils.parseParametersToObject(params, ['streamId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['x-authorization', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiStreamsStreamIdSignalPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.apiStreamsStreamIdSignalOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var apiStreamsStreamIdSignalOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/api/streams/{streamId}/signal').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(apiStreamsStreamIdSignalOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.meStreamsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['x-auth-token'], ['body']);
        
        var meStreamsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/me/streams').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['x-auth-token']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(meStreamsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.meStreamsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['x-auth-token'], ['body']);
        
        var meStreamsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/me/streams').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['x-auth-token']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(meStreamsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.meStreamsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var meStreamsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/me/streams').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(meStreamsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.meStreamsStreamIdApikeyGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['x-auth-token', 'streamId'], ['body']);
        
        var meStreamsStreamIdApikeyGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/me/streams/{streamId}/apikey').expand(apiGateway.core.utils.parseParametersToObject(params, ['streamId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['x-auth-token', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(meStreamsStreamIdApikeyGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.meStreamsStreamIdApikeyOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var meStreamsStreamIdApikeyOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/me/streams/{streamId}/apikey').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(meStreamsStreamIdApikeyOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.meStreamsStreamIdSignalPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['x-auth-token', 'streamId'], ['body']);
        
        var meStreamsStreamIdSignalPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/me/streams/{streamId}/signal').expand(apiGateway.core.utils.parseParametersToObject(params, ['streamId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['x-auth-token', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(meStreamsStreamIdSignalPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.meStreamsStreamIdSignalOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var meStreamsStreamIdSignalOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/me/streams/{streamId}/signal').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(meStreamsStreamIdSignalOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.meStreamsStreamIdSubscriptionPricePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['x-auth-token', 'streamId'], ['body']);
        
        var meStreamsStreamIdSubscriptionPricePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/me/streams/{streamId}/subscription-price').expand(apiGateway.core.utils.parseParametersToObject(params, ['streamId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['x-auth-token', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(meStreamsStreamIdSubscriptionPricePutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.meStreamsStreamIdSubscriptionPriceOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var meStreamsStreamIdSubscriptionPriceOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/me/streams/{streamId}/subscription-price').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(meStreamsStreamIdSubscriptionPriceOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var streamsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/streams').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var streamsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/streams').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsStreamIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['streamId'], ['body']);
        
        var streamsStreamIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/{streamId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['streamId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsStreamIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsStreamIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var streamsStreamIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/{streamId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsStreamIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsStreamIdSignalsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['streamId'], ['body']);
        
        var streamsStreamIdSignalsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/{streamId}/signals').expand(apiGateway.core.utils.parseParametersToObject(params, ['streamId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsStreamIdSignalsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsStreamIdSignalsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var streamsStreamIdSignalsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/{streamId}/signals').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsStreamIdSignalsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.subscribePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['x-re-captcha'], ['body']);
        
        var subscribePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/subscribe').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['x-re-captcha']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(subscribePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.subscribeOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var subscribeOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/subscribe').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(subscribeOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
