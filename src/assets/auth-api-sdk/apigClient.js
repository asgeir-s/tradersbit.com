/*
 * Copyright 2010-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

    
    var endpoint = 'https://dc3r5gsogb.execute-api.us-west-2.amazonaws.com/dev';
    var parser = document.createElement('a');
    parser.href = endpoint;

    //Use the protocol and host components to build the canonical endpoint
    endpoint = parser.protocol + '//' + parser.host;

    //Store any path components that were present in the endpoint to append to API calls
    var pathComponent = parser.pathname;
    if (pathComponent.charAt(0) !== '/') { // IE 9
        pathComponent = '/' + pathComponent;
    }

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
    
    
    
    apigClient.lolllolololoJsgeysmnejsgeGbdb57Post = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['scuset'], ['body']);
        
        var lolllolololoJsgeysmnejsgeGbdb57PostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/lolllolololo/jsgeysmnejsge/gbdb57').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['scuset']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(lolllolololoJsgeysmnejsgeGbdb57PostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.lolllolololoJsgeysmnejsgeGbdb57Options = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var lolllolololoJsgeysmnejsgeGbdb57OptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/lolllolololo/jsgeysmnejsge/gbdb57').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(lolllolololoJsgeysmnejsgeGbdb57OptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.publisherPostNewStreamGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var publisherPostNewStreamGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/publisher/post-new-stream').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(publisherPostNewStreamGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.publisherPostNewStreamPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var publisherPostNewStreamPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/publisher/post-new-stream').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(publisherPostNewStreamPostRequest, authType, additionalParams, config.apiKey);
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
    
    
    apigClient.streamsPostGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var streamsPostGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/post').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsPostGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsPostOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var streamsPostOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/post').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsPostOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsStreamIDGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['streamID'], ['body']);
        
        var streamsStreamIDGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/{streamID}').expand(apiGateway.core.utils.parseParametersToObject(params, ['streamID'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsStreamIDGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsStreamIDSignalsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['streamID'], ['body']);
        
        var streamsStreamIDSignalsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/{streamID}/signals').expand(apiGateway.core.utils.parseParametersToObject(params, ['streamID'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsStreamIDSignalsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsStreamIDSignalsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var streamsStreamIDSignalsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/{streamID}/signals').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsStreamIDSignalsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsStreamIDSubscribePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['x-re-captcha', 'streamID'], ['body']);
        
        var streamsStreamIDSubscribePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/{streamID}/subscribe').expand(apiGateway.core.utils.parseParametersToObject(params, ['streamID'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['x-re-captcha', ]),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsStreamIDSubscribePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.streamsStreamIDSubscribeOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var streamsStreamIDSubscribeOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/streams/{streamID}/subscribe').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(streamsStreamIDSubscribeOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
