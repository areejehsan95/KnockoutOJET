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
    "ojs/ojbootstrap",
    "knockout",
    "ojs/ojflattenedtreedataproviderview",
    "ojs/ojarraytreedataprovider",
    "ojs/ojknockouttemplateutils",
    "ojs/ojarraydataprovider",
    "ojs/ojbufferingdataprovider",
    "ojs/ojconverter-number",
    "ojs/ojconverter-datetime",
    "ojs/ojvalidator-numberrange",
    "ojs/ojknockout",
    "ojs/ojrowexpander",
    "ojs/ojinputtext",
    "ojs/ojdatetimepicker",
    "ojs/ojselectcombobox",
    "ojs/ojcheckboxset",
    "ojs/ojtable",
    "ojs/ojtoolbar",
    "ojs/ojbutton",
    "ojs/ojmessages",
    "ojs/ojselectsingle",
    "ojs/ojformlayout",
    "ojs/ojlabelvalue",
], function (
    accUtils,
    require,
    exports,
    ojbootstrap_1,
    ko,
    FlattenedTreeDataProviderView,
    ArrayTreeDataProvider,
    KnockoutTemplateUtils,
    ArrayDataProvider,
    BufferingDataProvider,
    ojconverter_number_1,
    ojconverter_datetime_1,
    NumberRangeValidator,
    deptData
) {
  function NViewModel() {
    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

    var self = this;
    var url = "js/projectData.json";
    self.dataprovider = ko.observable();
    self.deptObservableArray = ko.observable();
    self.arrayTreeDataProvider = ko.observable();

    self.KnockoutTemplateUtils = KnockoutTemplateUtils;

    $.getJSON(url).then(function (data) {
      self.deptObservableArray = data;
      console.log(self.deptObservableArray);
      // self.dataprovider(new BufferingDataProvider(new ArrayDataProvider(self.deptObservableArray, {keyAttributes: "id", })));

      console.log(data);
      console.log(JSON.stringify(self.arrayTreeDataProvider()));

      self.arrayTreeDataProvider(
        new ArrayTreeDataProvider(self.deptObservableArray, {
          keyAttributes: "id",
        })
      );
      self.dataprovider(
        new FlattenedTreeDataProviderView(self.arrayTreeDataProvider())
      );

      console.log(self.arrayTreeDataProvider());
      console.log(self.dataprovider());
    });

    /*  var self = this;  
      var url = "js/departments.json";
      self.dataprovider = ko.observable(); 
      self.deptObservableArray = ko.observable(); 
      jQuery(document).ready(function($){
      $.getJSON(url).then(function(data) {
      self.deptObservableArray = data;
      console.log(self.deptObservableArray);
      self.dataprovider(new BufferingDataProvider(new ArrayDataProvider(self.deptObservableArray, {keyAttributes: "DepartmentId", })));
      console.log(self.dataprovider());
      }
    );
      });

    var purl = "js/projectData.json";
    self.arrayTreeDataProvider = ko.observable(); 
    self.projectObservableArray = ko.observable(); 

    self.KnockoutTemplateUtils = KnockoutTemplateUtils;
    $.getJSON(purl).then(function(data) {
      
    self.projectObservableArray = data;
    console.log(self.projectObservableArray);
   
    self.arrayTreeDataProvider(new FlattenedTreeDataProviderView(new ArrayTreeDataProvider(self.projectObservableArray, {keyAttributes: "attr.id", })));

    console.log(self.arrayTreeDataProvider());
    console.log(JSON.stringify(self.arrayTreeDataProvider()));
    }
  );


      this.departments = new ArrayDataProvider([
        { label: "Sales" },
        { label: "HR" },
        { label: "Marketing" },
        { label: "Finance" },
      ], { keyAttributes: "label" });
      this.editedData = ko.observable("");
      // // NUMBER AND DATE CONVERTER ////
      this.numberConverter = new ojconverter_number_1.IntlNumberConverter();
      this.dateConverter = new ojconverter_datetime_1.IntlDateTimeConverter({
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
      this.rangeValidator = new NumberRangeValidator({ min: 100, max: 500 });
      this.validators = [this.rangeValidator];
      this.editRow = ko.observable();
      this.beforeRowEditListener = (event) => {
        this.cancelEdit = false;
        const rowContext = event.detail.rowContext;
        this.originalData = Object.assign({}, rowContext.item.data);
        this.rowData = Object.assign({}, rowContext.item.data);
      };
      // handle validation of editable components and when edit has been cancelled
      this.beforeRowEditEndListener = (event) => {
        this.editedData("");
        const detail = event.detail;
        if (!detail.cancelEdit && !this.cancelEdit) {
          if (this.hasValidationErrorInRow(document.getElementById("table"))) {
            event.preventDefault();
          }
          else {
            if (this.isRowDataUpdated()) {
              const key = detail.rowContext.item.data.DepartmentId;
              console.log("key: "+key);
              this.submitRow(key);
              console.log("hello");
            }
          }
        }
      };
      this.submitRow = (key) => {
        this.dataprovider().updateItem({
          metadata: { key: key },
          data: this.rowData,
        });
        const editItem = this.dataprovider().getSubmittableItems()[0];
        this.dataprovider().setItemStatus(editItem, "submitting");
        for (let idx = 0; idx < this.deptObservableArray.length; idx++) {
          if (this.deptObservableArray[idx].DepartmentId ===
            editItem.item.metadata.key) {
            this.deptObservableArray.splice(idx, 1, editItem.item.data);
            break;
          }
        }
        // Set the edit item to "submitted" if successful
        this.dataprovider().setItemStatus(editItem, "submitted");
        this.editedData(JSON.stringify(editItem.item.data));
      };
      this.isRowDataUpdated = () => {
        const propNames = Object.getOwnPropertyNames(this.rowData);
        for (let i = 0; i < propNames.length; i++) {
          if (this.rowData[propNames[i]] !== this.originalData[propNames[i]]) {
            return true;
          }
        }
        return false;
      };
      // checking for validity of editables inside a row
      // return false if one of them is considered as invalid
      this.hasValidationErrorInRow = (table) => {
        const editables = table.querySelectorAll(".editable");
        for (let i = 0; i < editables.length; i++) {
          const editable = editables.item(i);
          editable.validate();
          // Table does not currently support editables with async validators
          // so treating editable with 'pending' state as invalid
          if (editable.valid !== "valid") {
            return true;
          }
        }
        return false;
      };
      this.handleUpdate = (event, context) => {
        this.editRow({ rowKey: context.item.data.DepartmentId });
      };
      this.handleDone = () => {
        this.editRow({ rowKey: null });
      };
      this.handleCancel = () => {
        this.cancelEdit = true;
        this.editRow({ rowKey: null });
      };


*/

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
  return NViewModel;
});
