# Ionic Salesforce Starter Project

A starter project for Ionic and Salesforce.


## Unit Tests

This will run the tests once:
```
$ gulp test
```

This will watch the files in the test directory and re-run the tests on change:
```
$ gulp watch
```


### Testing Environment Setup
```
$ npm install karma karma-jasmine karma-phantomjs-launcher --save-dev
$ npm install -g karma-cli
$ npm install 
$ bower install angular-mocks --save-dev
$ mkdir tests
$ cd tests
$ karma init
```
The config file is then in the karma.conf.js

## Error retrieving contacts

ionic.bundle.js:24977 
GET http://localhost:8100/services/data/v33.0/query?q=select+id,+name,+title+from+contact+limit+50 404 (Not Found)(anonymous function) 
...
controllers.js:19 Cannot GET /services/data/v33.0/query?q=select+id,+name,+title+from+contact+limit+50

None of the other functions work either.

## Logout Error
The logout menu item causes this error:
ionic.bundle.js:26771 TypeError: force.logout is not a function
    at Scope.$scope.logout (controllers.js:6)

But it does seem to log out.  After doing so there is this error:
No access token. Login and try again.
ionic.bundle.js:24977 POST http://localhost:8100/services/data/v33.0/sobjects/contact/ 404 (Not Found)(anonymous function) 

Trying this in the loguout function in the controller:
force.discardToken()
force.login()
This shows the allow dialog again, but causes the following error:
ionic.bundle.js:26771 ReferenceError: $state is not defined
    at controllers.js:9

##Trying to add a user

Adding a user cases the following funciton.
forceng.js:356 Cannot POST /services/data/v33.0/sobjects/contact/


## Getting Accounts
The request url used:
http://localhost:8100/services/data/v33.0/query?q=select+id,+name+from+account+limit+50
https://na1.salesforce.com/services/data/
headers.Target-URL: "https://ap2.salesforce.com"
This is the var that it should be using.



## Cannot GET /oauthcallback.html 

There is a [page on the github](https://github.com/ccoenraets/salesforce-mobile-sdk-angularjs-ionic/blob/master/www/oauthcallback.html) that has the file.
Putting that file in the www directory lets things proceeed.
Not sure why this wasn't included in the project seed.
