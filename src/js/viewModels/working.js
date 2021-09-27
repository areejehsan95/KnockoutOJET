/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define([
    "../accUtils",
    "require",
    "exports",
    "ojs/ojbootstrap",
    "knockout", "ojs/ojfilepickerutils",
    "ojs/ojknockouttemplateutils",
    "ojs/ojarraydataprovider", 
    "ojs/ojbufferingdataprovider",
    "ojs/ojflattenedtreedataproviderview", "ojs/ojarraytreedataprovider", 
    "ojs/ojconverter-number", 
    "ojs/ojconverter-datetime", 
    "ojs/ojvalidator-numberrange",  
    "text!../working.json",
    "ojs/ojknockout", 
    "ojs/ojfilepicker",
    'ojs/ojinputtext',   
    'ojs/ojdatetimepicker', 
    'ojs/ojselectcombobox', 
    'ojs/ojcheckboxset', 
    'ojs/ojvalidation-number', 
    'ojs/ojvalidation-datetime',
    "ojs/ojnavigationlist",
    "ojs/ojswitch",
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
    'ojs/ojbutton',
  ],
  function (accUtils, require, exports, ojbootstrap_1, ko,FilePickerUtils, KnockoutTemplateUtils, ArrayDataProvider, BufferingDataProvider, FlattenedTreeDataProviderView,
    ArrayTreeDataProvider, ojconverter_number_1, ojconverter_datetime_1, NumberRangeValidator, deptData) {
   
      function IncidentsViewModel() {
  
        function storeddata(req) {
          this.id = ko.observable(req.id);
          this.name = ko.observable(req.name);
          this.short_desc = ko.observable(req.short_desc);
          this.Price = ko.observable(req.Price);
          this.Tax = ko.observable(req.Tax);
          this.TotalPrice = ko.computed(function(){
            return this.Price()+ this.Tax();
          }, this);
          this.TotalSum = ko.computed(function(){
            if (parseInt(this.TotalPrice()) % 2 == 0)
                return "even";
            else
                return "odd";
         }, this);
         this.children = ko.observableArray(req.children);
        }
  
        var self = this;  
        var url = "js/working.json";
        self.deptObservableArray = ko.observableArray();
        self.dataprovider = ko.observable(); 
        self.KnockoutTemplateUtils = KnockoutTemplateUtils;
       
        $.getJSON(url).then(function(data) {
            //console.log(data.length);
            for (var i = 0; i < (data.length); i++) {
                // self.Price = ko.observable(data[i].Price);
                // self.Tax = ko.observable(data[i].Tax);
  
                // // 1st load pe computed chahiye
                // self.TotalPrice = ko.computed(function(){
                //     return self.Price()+ self.Tax();
                // });
                // self.TotalSum = ko.computed(function(){
                //    // return self.Price() + self.Tax() + self.TotalPrice();
                //    if (parseInt(self.TotalPrice()) % 2 == 0)
                //     return "even";
                // else
                //     return "odd";
                // });
                
                //console.log(self.TotalPrice());
                self.deptObservableArray.push(new storeddata({
                    id : data[i].id,
                    name : data[i].name,
                    short_desc : data[i].short_desc,
                    Price : data[i].Price,
                    Tax : data[i].Tax,
                    children : data[i].children,
                }));
            }
            console.log(self.deptObservableArray());
            //self.dataprovider(new BufferingDataProvider(new ArrayDataProvider(self.deptObservableArray()), {keyAttributes: "id", }));
            self.dataprovider(new FlattenedTreeDataProviderView(new ArrayTreeDataProvider(self.deptObservableArray()), {keyAttributes: "id", }));
            console.log(self.dataprovider());
        });
    
      // self.addRow = function() {       
      //   self.deptObservableArray.push({id: 0, name: '', short_desc: '', Price: 0, Tax: 0, StartDate: oj.IntlConverterUtils.dateToLocalIso(new Date()) , Primary: [] });       
      //   self.check.valueHasMutated();}
        
        this.editedData = ko.observable("");
        this.numberConverter = new ojconverter_number_1.IntlNumberConverter();
        this.rangeValidator = new NumberRangeValidator({ min: 100, max: 500 });
        this.validators = [this.rangeValidator];
        this.editRow = ko.observable();
  
        this.beforeRowEditListener = (event) => {
            this.cancelEdit = false;
            const rowContext = event.detail.rowContext;
            console.log(rowContext);
            var getId = rowContext.item.data.id;
            var origData = JSON.parse(deptData);          
           // console.log("price: " + rowContext.item.data.Price());
           // console.log(origData);
            self.origDataArray = ko.observableArray();
            for (var i = 0; i < (origData.length); i++) {
                if (origData[i].id == getId()) {
                self.origDataArray = origData[i];
                console.log(self.origDataArray);
                }
            }
//            this.originalData = Object.assign({}, self.origDataArray);
            this.originalData = Object.assign({}, rowContext.item.data);
            this.rowData = Object.assign({}, rowContext.item.data);


          
        };
  
        // handle validation of editable components and when edit has been cancelled
        this.beforeRowEditEndListener = (event) => {
            this.editedData("");
            const detail = event.detail;
            //console.log(detail.rowContext.item.data.id());
            if (!detail.cancelEdit && !this.cancelEdit) {
                if (this.hasValidationErrorInRow(document.getElementById("table"))) {
                event.preventDefault();
                }
                else {
                  console.log(this.isRowDataUpdated());
                if (this.isRowDataUpdated()) {
                    const key = detail.rowContext.item.data.id();
                    console.log("key: "+ key);
                    this.submitRow(key);
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
        //   console.log(editItem);
        //   console.log(editItem.item.data);
          this.dataprovider().setItemStatus(editItem, "submitting");
          for (let idx = 0; idx < this.deptObservableArray().length; idx++) {
            // console.log(this.deptObservableArray()[idx].id());
            // console.log(editItem.item.metadata.key);
            if (this.deptObservableArray()[idx].id() === editItem.item.metadata.key) {
                // console.log(this.deptObservableArray()[idx].id());
                // console.log(editItem.item.metadata.key);
                // console.log(JSON.stringify(editItem.item.data));
              this.deptObservableArray().splice(idx, 1, editItem.item.data);
              console.log(editItem.item.data);
              break;
            }
          }
          // Set the edit item to "submitted" if successful
         // console.log(editItem.item.data);
          this.dataprovider().setItemStatus(editItem, "submitted");
          this.editedData(editItem.item.data);
          console.log(this.editedData());
        };

        this.isRowDataUpdated = () => {
         // console.log(self.Price());
          const propNames = Object.getOwnPropertyNames(this.rowData);
        //   console.log(propNames.length);
        //   console.log(this.rowData.Price._latestValue);
        for (let i = 0; i < propNames.length; i++) {
            //console.log(this.rowData.Price._latestValue);
            //console.log(this.rowData.Tax._latestValue);
            if (this.rowData[propNames[i]] !== this.originalData[propNames[i]]) {
              console.log("CHANGED PROPS" + this.rowData[propNames[i]]);
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
            console.log(context.item.data.id);
          this.editRow({ rowKey: context.item.data.id });
        };
        this.handleDone = () => {
          this.editRow({ rowKey: null });
        };
        this.handleCancel = () => {
          this.cancelEdit = true;
          this.editRow({ rowKey: null });
        };
  
      this.connected = () => {
        accUtils.announce('Incidents page loaded.', 'assertive');
        document.title = "Incidents";
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
      return IncidentsViewModel;
    }
  
  );