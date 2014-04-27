// connect middleware
Oauth._requestHandlers['2'] = function (service, query, res) {
  // check if user authorized access
  if (!query.error) {
    // Prepare the login results before returning.  This way the
    // subsequent call to the `login` method will be immediate.

    // Run service-specific handler.
    var oauthResult = service.handleOauthRequest(query);
    var credentialSecret = Random.id();

    // Add the login result to the result map
    Oauth._loginResultForCredentialToken[query.state] = {
      credentialSecret: credentialSecret,
      result: {
        serviceName: service.serviceName,
        serviceData: oauthResult.serviceData,
        options: oauthResult.options
      }
    };
  }

  // Either close the window, redirect, or render nothing
  // if all else fails
  Oauth._renderOauthResults(res, query, credentialSecret);
};
