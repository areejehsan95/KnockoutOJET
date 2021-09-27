/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your grid ViewModel code goes here
 */
define([
  "../accUtils",
  'knockout', 'ojs/ojbootstrap', 'ojs/ojflattenedtreedatagriddatasource', 'ojs/ojjsontreedatasource', 'ojs/ojknockouttemplateutils',
    'ojs/ojdatacollection-utils', 'text!../gridData.json',
    'ojs/ojknockout', 'ojs/ojdatagrid', 'ojs/ojrowexpander', 'ojs/ojinputtext'
], function (
  accUtils,
  ko, Bootstrap, flattenedModule, JsonTreeDataSource,
    KnockoutTemplateUtils, DataCollectionEditUtils, jsonTreeData
) {
  function gridViewModel() {

    function storeddata(req) {
      this.id = ko.observable(req.id);
      this.name = ko.observable(req.name);
      this.resource = ko.observable(req.resource);
      this.start = ko.observable(req.start);
      this.end = ko.observable(req.end);
      this.sum = ko.observable(req.sum);
      this.avg = ko.observable(req.avg);
    }


    self.deptObservableArray = ko.observableArray();

    this.id = ko.observable();
    this.name = ko.observable();
    this.resource = ko.observable();
    this.start = ko.observable();
    this.end = ko.observable();
    this.sum = ko.observable();
    this.avg = ko.observable();

    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
      this.dataSource = ko.observable();
  
      var options = {
        rowHeader: 'name',
        columns: ['resource', 'start', 'end', 'sum', 'avg']
      };
      // function to determine which template to use for
      // rendering  depending on mode
      this.getCellTemplate = function (cellContext) {
        var mode;
        mode = cellContext.mode;
        if (mode === 'edit') {
          var getRow = cellContext.keys.row;
          var getCol = cellContext.keys.column;
          console.log("Row  : " + getRow);
          console.log("Col  : " + getCol);
          console.log(cellContext.data);

       //   console.log(cellContext)
       console.log(this.dataSource);
        //  var getStart = this.dataSource.FlattenedTreeDataGridDataSource.m_wrapped.data.children;
        //  console.log(getStart);
          return KnockoutTemplateUtils.getRenderer('edit_cell_template')(cellContext);
        } else if (mode === 'navigation') {
          return KnockoutTemplateUtils.getRenderer('cell_template')(cellContext);
        }
        return null;
      };
      // the DataCollectionEditUtils.basicHandleEditEnd is a
      // utility method which will handle validation of editable
      // components and also handle canceling the edit
      this.handleEditEnd = DataCollectionEditUtils.basicHandleEditEnd;
      
      var abc = JSON.parse(jsonTreeData);

      for (var i = 0; i < (abc.length); i++) {
        self.sum = parseInt(abc[i].attr.start) + parseInt(abc[i].attr.end);
      	self.deptObservableArray.push(new storeddata({
          id : abc[i].attr.id,
          name : abc[i].attr.name,
          resource : abc[i].attr.resource,
          start : abc[i].attr.start,
          end : abc[i].attr.end,
          sum : self.sum,
          avg : self.sum / 2,
      	}));
      }
      console.log(abc);
      console.log(self.deptObservableArray());

      self.deptObservableArray(new flattenedModule.FlattenedTreeDataGridDataSource(
        new JsonTreeDataSource(JSON.parse(jsonTreeData)), options));
       
      
      // this.dataSource(new flattenedModule.FlattenedTreeDataGridDataSource(
      //   new JsonTreeDataSource(ko.toJSON(self.deptObservableArray())), options));  
      // console.log(this.dataSource());


      // console.log(this.dataSource());
      // for(var i = 0; i < this.dataSource().m_wrapped.data.children.length; i ++) {
      //   var start = this.dataSource().m_wrapped.data.children[i].attr.start;
      //   var end = this.dataSource().m_wrapped.data.children[i].attr.end;
      //   console.log(start);
      //   console.log(end);
      //   var sum = parseInt(start) + parseInt(end);
      //   console.log(sum);
      // }
  

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    this.connected = () => {
      accUtils.announce("grid page loaded.", "assertive");
      document.title = "grid";
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
  return gridViewModel;
});
