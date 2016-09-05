'use strict';

// Declare app level module which depends on filters, and services

angular.module('timeBill', [
  'ngRoute',
  'timeBill.controllers',
  'timeBill.daily',
  'timeBill.week',
  'timeBill.month',
  'timeBill.year',
  'timeBill.all',
  'timeBill.billType',
  'timeBill.filters',
  'timeBill.services',
  'timeBill.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.otherwise({
    redirectTo: '/daily/0'
  });

  $locationProvider.html5Mode(true);
});
