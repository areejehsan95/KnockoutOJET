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
    function (require, accUtils, exports, ojbootstrap_1, ko,  FilePickerUtils, KnockoutTemplateUtils, ArrayDataProvider, BufferingDataProvider, FlattenedTreeDataProviderView,
      ArrayTreeDataProvider, ojconverter_number_1, ojconverter_datetime_1, NumberRangeValidator, deptData) {
  
      function IncidentsViewModel() {
  
        this.fileNames = ko.observable();
        this.selectListener = (files) => {
            this.fileNames(Array.prototype.map.call(files, (file) => {
            console.log(files);
            var excelFile,fileReader = new FileReader();
            $("#result").hide();
            fileReader.onload = function (e) {
                var buffer = new Uint8Array(fileReader.result);
                console.log(buffer);
                var workbook = new $.ig.excel.Workbook();
                $.ig.excel.Workbook.load(buffer, function () {
                    workbook = arguments[0];
                    setWorkbook();
                }, function (error) {
                        $("#result").text("The excel file is corrupted.");
                        $("#result").show(1000);
                    });
                }
                excelFile = files[0];
                if (excelFile.type === "application/vnd.ms-excel" || excelFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (excelFile.type === "" && (excelFile.name.endsWith("xls") || excelFile.name.endsWith("xlsx")))) {
                    fileReader.readAsArrayBuffer(excelFile);
                    console.log(fileReader);
                } else {
                    $("#result").text("The format of the file you have selected is not supported. Please select a valid Excel file ('.xls, *.xlsx').");
                    $("#result").show(1000);
                }
                console.log(file);
                return file.name;
            }));
        };
  
                function setWorkbook() {
                  if ($("#spreadsheet").igSpreadsheet !== undefined && workbook != null) {
                    //load specific workbook
                    $("#spreadsheet").igSpreadsheet("option", "workbook", workbook);
                  }
                }
                
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
      };
      this.disconnected = () => {
      };
      this.transitionCompleted = () => {
      };
    }
      return IncidentsViewModel;
    }
  );