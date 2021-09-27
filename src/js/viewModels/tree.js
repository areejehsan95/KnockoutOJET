/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define([
  "../accUtils",
  "require",
  "exports",
  "knockout",
  "ojs/ojbootstrap",
  "ojs/ojflattenedtreedataproviderview",
  "ojs/ojarraytreedataprovider",
  "ojs/ojknockouttemplateutils",
  "ojs/ojtable",
  "ojs/ojknockout",
  "ojs/ojrowexpander",
  "ojs/ojchart",
], function (
  accUtils,
  require,
  exports,
  ko,
  ojbootstrap_1,
  FlattenedTreeDataProviderView,
  ArrayTreeDataProvider,
  KnockoutTemplateUtils,
) {
  function AboutViewModel() {
    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

    var self = this;
    var url = "js/treedata.json";
    self.arrayTreeDataProvider = ko.observable();
    self.projectObservableArray = ko.observable();
    self.arrayTree = ko.observable();

    self.KnockoutTemplateUtils = KnockoutTemplateUtils;

    $.getJSON(url).then(function (data) {
      self.projectObservableArray = data;
      console.log(self.projectObservableArray);

      self.arrayTree = new ArrayTreeDataProvider(self.projectObservableArray, {
        keyAttributes: "attr.id",
      });
      //self.arrayTree(new ArrayTreeDataProvider(self.projectObservableArray, {keyAttributes: "attr.id", }));
      self.arrayTreeDataProvider(
        new FlattenedTreeDataProviderView(self.arrayTree)
      );

      console.log(self.arrayTreeDataProvider());
      console.log(JSON.stringify(self.arrayTreeDataProvider()));
    });

    //this.arrayTreeDataProvider = new ArrayTreeDataProvider(JSON.parse(jsonDataStr), { keyAttributes: "attr.id" });
    //this.dataProvider = ko.observable(new FlattenedTreeDataProviderView(this.arrayTreeDataProvider));

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    this.connected = () => {
      accUtils.announce("About page loaded.", "assertive");
      document.title = "About";
      // Implement further logic if needed
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    this.disconnected = () => {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    this.transitionCompleted = () => {
      // Implement if needed
    };
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return AboutViewModel;
});
