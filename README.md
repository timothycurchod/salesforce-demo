# Ionic Salesforce Starter Project




## Error retrieving contacts.

ionic.bundle.js:24977 GET http://localhost:8100/services/data/v33.0/query?q=select+id,+name,+title+from+contact+limit+50 404 (Not Found)(anonymous function) @ ionic.bundle.js:24977sendReq @ ionic.bundle.js:24770serverRequest @ ionic.bundle.js:24480processQueue @ ionic.bundle.js:29104(anonymous function) @ ionic.bundle.js:29120Scope.$eval @ ionic.bundle.js:30372Scope.$digest @ ionic.bundle.js:30188(anonymous function) @ ionic.bundle.js:30411completeOutstandingRequest @ ionic.bundle.js:19171(anonymous function) @ ionic.bundle.js:19447
forceng.js:356 Cannot GET /services/data/v33.0/query?q=select+id,+name,+title+from+contact+limit+50
(anonymous function) @ forceng.js:356(anonymous function) @ ionic.bundle.js:24517processQueue @ ionic.bundle.js:29104(anonymous function) @ ionic.bundle.js:29120Scope.$eval @ ionic.bundle.js:30372Scope.$digest @ ionic.bundle.js:30188Scope.$apply @ ionic.bundle.js:30480done @ ionic.bundle.js:24801completeRequest @ ionic.bundle.js:24999requestLoaded @ ionic.bundle.js:24940
controllers.js:19 Cannot GET /services/data/v33.0/query?q=select+id,+name,+title+from+contact+limit+50

None of the other functions work either.

The logout shows this error:
ionic.bundle.js:26771 TypeError: force.logout is not a function
    at Scope.$scope.logout (controllers.js:6)


But it does seem to log out.

Another error is this:
No access token. Login and try again.
ionic.bundle.js:24977 POST http://localhost:8100/services/data/v33.0/sobjects/contact/ 404 (Not Found)(anonymous function) @ ionic.bundle.js:24977sendReq @ ionic.bundle.js:24770serverRequest @ ionic.bundle.js:24480processQueue @ ionic.bundle.js:29104(anonymous function) @ ionic.bundle.js:29120Scope.$eval @ ionic.bundle.js:30372Scope.$digest @ ionic.bundle.js:30188Scope.$apply @ ionic.bundle.js:30480(anonymous function) @ ionic.bundle.js:65289defaultHandlerWrapper @ ionic.bundle.js:16764eventHandler @ ionic.bundle.js:16752triggerMouseEvent @ ionic.bundle.js:2953tapClick @ ionic.bundle.js:2942tapMouseUp @ ionic.bundle.js:3018


Trying to add a user:
forceng.js:356 Cannot POST /services/data/v33.0/sobjects/contact/





## Cannot GET /oauthcallback.html 

the file path location.
e.g. oauthcallback.html file should be in root folder so it can be found.

@ccoenraets Hi :) In your Ionic tutorial I get this error "Cannot GET /oauthcallback.html"
@montogeek did you copy oauthcallback.html in conference/www?
@ccoenraets Yes
@ccoenraets @montogeek That was it! I was copying those files to conference/templates

In the forgeng.js file, it has some notes on the setup.

    // if page URL is http://localhost:3000/myapp/index.html, oauthCallbackURL is http://localhost:3000/myapp/oauthcallback.html
    // To override default, pass oauthCallbackURL in init(props)
      oauthCallbackURL = baseURL + 'http://localhost:8100/salesforce/index.html',

This results in a different error:
error=redirect_uri_mismatch&error_description=redirect_uri%20must%20match%20configuration

oauthCallbackURL = baseURL + 'http://localhost:8100/salesforce/oauthcallback.html',

The url is: http://localhost:8100/ so following those instructions should give the above string.\

The console shows the problem:
useProxy: true
forceng.js:274 loginURL: https://login.salesforce.com
forceng.js:275 oauthCallbackURL: http://localhost:8100http://localhost:8100/salesforce/index.html

So using this setting fixes the console message: oauthCallbackURL = baseURL + '/salesforce/index.html',

But still same error:

redirect_uri_mismatch & error_description=
redirect_uri must match configuration

loginURL: https://login.salesforce.com
oauthCallbackURL: http://localhost:8100/salesforce/index.html

So now what is the configuration they are talking about?

This is in the app.config section:
    // baseURL (defined in the config.js module) is only there to support running the same app as a Mobile SDK
    // hybrid local and hybrid remote app (where the app is run from withing a Visualforce page). When running the
    // app inside a Visualforce page, you have to account for the path of the app's static resource. To accomplish
    // that, you create the config module from within the VF page (as opposed to importing config.js), and set
    // baseURL to the app's static resource path.

In the js folder there is a config.js file with this:

.constant('baseURL', 'http://localhost:8100/');

I added the value thee.

      oauthCallbackURL = baseURL + '/salesforce/index.html',

These settings will get us back to the original error:

oauthCallbackURL = baseURL + '/oauthcallback.html',
constant('baseURL', 'http://localhost:8100/');

Create a Facebook app here: https://developers.facebook.com/apps. In the advanced settings, make sure you declare a “Valid OAuth redirect URI”. For example, 
if during development you access your application from 
http://localhost/openfb/index.html, you must declare 
http://localhost/openfb/oauthcallback.html as a valid redirect URI. Also add https://www.facebook.com/connect/login_success.html as a Valid OAuth redirect URI for access from Cordova.

This will also throw up the autorization page but then lead to the same original error.
  .constant('baseURL', 'http://localhost:8100/salesforce/');

But then there is this in the console:
http://localhost:8100/salesforce/templates/menu.html Failed to load resource: the server responded with a status of 404 (Not Found)

So looks like the app name (salesforce) should not be in the baseurl.
But the notes for the config file say this:
  // baseURL should be left to empty string. This value is only used when you want to use the same app in a Visualforce
  // page where you have to account for the path to the static resource. In that case the config module is created from
  // within index.vf where the path to the static resource can be obtained.
  .constant('baseURL', '');
So that should be blank.  Still same result.

Since this is a trial, it may not be possible to set up the app on sf?
"This account is not authorized for access from any third-party accounts"

 create a remote Application .

Setup -->Create --> App-->Connected Apps-->Fill The Necessary Details --> mention CallBackURL as https://ap1.salesforce.com/services/oauth2/token ,Callback URL in salesforce is nothing but what Salesforce will callback with once the user authorizes access to his/her Salesforce account. Provide callback url as https://ap1.salesforce.com/services/oauth2/token

There is actually a page on this github:
https://github.com/ccoenraets/salesforce-mobile-sdk-angularjs-ionic/blob/master/www/oauthcallback.html

Putting that file in the www directory lets things proceeed.

