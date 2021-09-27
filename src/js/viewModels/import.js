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
    "require",
    "../accUtils",
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
    "ojs/ojrowexpander",
  ],
    function (require, accUtils, exports, ojbootstrap_1, ko, FilePickerUtils, KnockoutTemplateUtils, ArrayDataProvider, BufferingDataProvider, FlattenedTreeDataProviderView,
      ArrayTreeDataProvider, ojconverter_number_1, ojconverter_datetime_1, NumberRangeValidator, deptData) {
  
      function BomViewModel() {
  
        this.fileNames = ko.observable();
  
        this.selectListener = (files) => {
          this.fileNames(Array.prototype.map.call(files, (file) => {
            return file.name;
          }));
          if(!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type))
        {
            document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';    
            return false;
        }
          console.log(files);
          var excelFile, fileReader = new FileReader();
          $("#result").hide();
          fileReader.onload = function (e) {
            var buffer = new Uint8Array(fileReader.result);
            console.log(buffer);
            var work_book = XLSX.read(buffer, { type: 'array' });
            console.log(work_book);
            var sheet_name = work_book.SheetNames;
            console.log(sheet_name);
            var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });
            console.log(sheet_data);
            if (sheet_data.length > 0) {
              var table_output = '<table class="table table-striped table-bordered">';
  
              for (var row = 0; row < sheet_data.length; row++) {
  
                table_output += '<tr>';
  
                for (var cell = 0; cell < sheet_data[row].length; cell++) {
  
                  if (row == 0) {
  
                    table_output += '<th>' + sheet_data[row][cell] + '</th>';
  
                  }
                  else {
  
                    table_output += '<td>' + sheet_data[row][cell] + '</td>';
  
                  }
  
                }
  
                table_output += '</tr>';
  
              }
  
              table_output += '</table>';
  
              document.getElementById('excel_data').innerHTML = table_output;
            }
          }
          excelFile = files[0];
          if (excelFile.type === "application/vnd.ms-excel" || excelFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (excelFile.type === "" && (excelFile.name.endsWith("xls") || excelFile.name.endsWith("xlsx")))) {
            fileReader.readAsArrayBuffer(excelFile);
            console.log(fileReader);
          } else {
            $("#result").text("The format of the file you have selected is not supported. Please select a valid Excel file ('.xls, *.xlsx').");
            $("#result").show(1000);
          }
  
        };
  
        this.selectFiles = (event) => {
          FilePickerUtils.pickFiles(this.selectListener, {
            accept: [],
            capture: "none",
            selectionMode: "single",
          });
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
      return BomViewModel;
    }
  
  );