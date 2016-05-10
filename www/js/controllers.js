/**
 * @memberOf starter.controllers
 * @class starter.controllers
 * @description Controllers for the Ionic Starter App.
 */
angular.module('starter.controllers', ['forceng'])
    .controller('AppCtrl', 
        /**
         * @memberOf starter.controllers
         * @class AppCtrl
         * @description Application control to handle logout functions.
         */
        function ($scope, force, $state) {
        $scope.logout = function() {
            // TODO: Fix the login function
            //force.logout();
            force.discardToken();
            force.login().then(
                /** After login success function. */
                function () {
                    $state.go('app.contactlist');
                },
                function(error) {
                    alert("Login was not successful");
            });
        };
    })
    .controller('ContactListCtrl', 
        /**
         * @memberOf starter.controllers
         * @class ContactListCtrl
         * @description This controller makes a query from forceng for contacts and attaches them to the scope.
         */
        function ($scope, force) {
        force.query('select id, name, title from contact limit 50').then(
            /** After query success function. */
            function (data) {
                $scope.contacts = data.records;
            },
            function (error) {
                alert("Error Retrieving Contacts");
                console.log('Error Retrieving Contacts',error);
            });
    })
    .controller('ContactCtrl', 
    /**
     * @memberOf starter.controllers
     * @class ContactCtrl
     * @description This controller makes a query from forceng for contacts and attaches them to the scope.
     */
     function ($scope, $stateParams, force) {
        console.log('stateParams',$stateParams);
        force.retrieve('contact', $stateParams.contactId, 'id,name,title,phone,mobilephone,email').then(
            function (contact) {
                $scope.contact = contact;
            });
    })
    .controller('EditContactCtrl', 
    /**
     * @memberOf starter.controllers
     * @class EditContactCtrl
     * @description This controller makes a query from forceng for contacts and attaches them to the scope.
     */
     function ($scope, $stateParams, $ionicNavBarDelegate, force) {
        force.retrieve('contact', $stateParams.contactId, 'id,firstname,lastname,title,phone,mobilephone,email').then(
            function (contact) {
                $scope.contact = contact;
            });
        $scope.save = function () {
            force.update('contact', $scope.contact).then(
                function (response) {
                    $ionicNavBarDelegate.back();
                },
                function() {
                    alert("An error has occurred.");
                });
        };
    })
    .controller('CreateContactCtrl', 
    /**
     * @memberOf starter.controllers
     * @class CreateContactCtrl
     * @description This controller makes a query from forceng for contacts and attaches them to the scope.
     */
    function ($scope, $stateParams, $ionicNavBarDelegate, force) {
        $scope.contact = {};
        $scope.save = function () {
            force.create('contact', $scope.contact).then(
                function (response) {
                    $ionicNavBarDelegate.back();
                },
                function() {
                    alert("An error has occurred.");
                });
        };
    })
    /**
     * @memberOf starter.controllers
     * @class AccountListCtrl
     * @description This controller makes a query from forceng for contacts and attaches them to the scope.
     */
    .controller('AccountListCtrl', function ($scope, force) {
        force.query('select id, name from account limit 50').then(
            function (data) {
                $scope.accounts = data.records;
            });
    })
    /**
     * @memberOf starter.controllers
     * @class AccountCtrl
     * @description This controller makes a query from forceng for contacts and attaches them to the scope.
     */
    .controller('AccountCtrl', function ($scope, $stateParams, force) {
        force.retrieve('account', $stateParams.accountId, 'id,name,phone,billingaddress').then(
            function (account) {
                $scope.account = account;
            });
    });
