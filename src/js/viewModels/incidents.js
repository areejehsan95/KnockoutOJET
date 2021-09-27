/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
 define(
  ['accUtils',
   'knockout',
   'jquery',
   'ojs/ojarraydataprovider',
   'ojs/ojhtmlutils',
   'ojs/ojresponsiveutils',
   'ojs/ojresponsiveknockoututils',
   'ojs/ojlabel',
   'ojs/ojselectsingle',
   'ojs/ojchart',
   'ojs/ojlistview',
   'ojs/ojavatar',
   'ojs/ojmodule-element'
  ],
  function (accUtils, ko, $, ArrayDataProvider, HtmlUtils, ResponsiveUtils, ResponsiveKnockoutUtils) {

    function DashboardViewModel() {
      var self = this;
       
      /**
       *  Declare Activity List observables and read data from JSON file
       */
      var url = "js/store_data.json";  //defines link to local data file

      self.activityDataProvider = ko.observable();  //gets data for Activities list
      self.itemsDataProvider = ko.observable();     //gets data for Items list

       // Activity selection observables
       self.activitySelected = ko.observable(false);
       self.selectedActivity = ko.observable();
       self.firstSelectedActivity = ko.observable();
             
       // Item selection observables
       self.itemSelected = ko.observable(false);
       self.selectedItem = ko.observable();
       self.firstSelectedItem = ko.observable();
  

      // Get local data from file using jQuery method and method to return a Promise
      $.getJSON(url).then(function(data) {
         // Create variable for Activities list and populate using key attribute fetch
         var activitiesArray = data;
         self.activityDataProvider(new ArrayDataProvider(activitiesArray, { keyAttributes: 'id' }));
          // Create variable for Items list and populate list using key attribute fetch
          //pehle se hi selected rakhni hain to uncomment else comment
          //var itemsArray = data[0].items;
          //self.itemsDataProvider(new ArrayDataProvider(itemsArray, { keyAttributes: 'id' }));
        }
      );

      /**
       * Handle selection from Activities list
       */
      self.selectedActivityChanged = function (event) {
        // Check whether click is an Activity selection or a deselection
        if (event.detail.value.length != 0) {
          // If selection, populate and display list
          // Create variable for items list using firstSelectedXxx API from List View
          var itemsArray = self.firstSelectedActivity().data.items;
          // Populate items list using DataProvider fetch on key attribute
          self.itemsDataProvider(new ArrayDataProvider(itemsArray, { keyAttributes: "id" }))
          // Set List View properties
          self.activitySelected(true);
          self.itemSelected(false);
          // Clear item selection
          self.selectedItem([]);
          self.itemData();
        } else {
           // If deselection, hide list
            self.activitySelected(false);
            self.itemSelected(false);
        }
      };

      /**
      * Handle selection from Activity Items list
      */
       self.selectedItemChanged = function (event) {
        // Check whether click is an Activity Item selection or deselection
        if (event.detail.value.length != 0) {
           // If selection, populate and display Item details
           // Populate items list observable using firstSelectedXxx API
           self.itemData(self.firstSelectedItem().data);
           self.itemSelected(true);
        } else {
          // If deselection, hide list
          self.itemSelected(false);
        }
      };

    



      
























      ///   END
      // Identify the screen size and display the content for that screen size
      var lgQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);

      self.large = ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
      self.moduleConfig = ko.pureComputed(function () {
        var viewNodes = HtmlUtils.stringToNodeArray(self.large() ? lg_xl_view : sm_md_view);
        return { view: viewNodes };
      });

      /**
       * End of oj-module code
       */
      

      // The following 3 functions are not addressed in this tutorial.
	  
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here. 
       * This method might be called multiple times - after the View is created 
       * and inserted into the DOM and after the View is reconnected 
       * after being disconnected.
       */
      self.connected = function() {
        accUtils.announce('Dashboard page loaded.', 'assertive');
        document.title = "Dashboard";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      self.disconnected = function() {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      self.transitionCompleted = function() {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);