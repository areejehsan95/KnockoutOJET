define([
  "require",
    "../accUtils",
    "exports",
    "ojs/ojbootstrap",
    "knockout", "ojs/ojfilepickerutils",
    'ojs/ojdatacollection-utils',
    "ojs/ojknockouttemplateutils",
    "ojs/ojarraydataprovider",
    "ojs/ojbufferingdataprovider",
    "ojs/ojflattenedtreedataproviderview", "ojs/ojarraytreedataprovider",
    "ojs/ojconverter-number",
    "ojs/ojconverter-datetime",
    "ojs/ojvalidator-numberrange",
    "text!../workingTest.json",
    'ojs/ojkeyset',
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
function (require,accUtils, exports, ojbootstrap_1, ko, FilePickerUtils, DataCollectionEditUtils, KnockoutTemplateUtils, ArrayDataProvider, BufferingDataProvider, FlattenedTreeDataProviderView,
  ArrayTreeDataProvider, ojconverter_number_1, ojconverter_datetime_1, NumberRangeValidator, deptData, keySet) {

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
       this.bomLevel = ko.observable(req.bomLevel);
       this.CustomParent = ko.observable(req.CustomParent);
      }

      function storedChilddata(req) {
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
       this.bomLevel = ko.observable(req.bomLevel);
       this.CustomParent = ko.observable(req.CustomParent);
    }
  

      var self = this;  
      var url = "js/workingTest.json";
      self.deptObservableArray = ko.observableArray();
      self.importObservableArray = ko.observableArray();
      self.tempChildrenArray = ko.observableArray();
      self.getTotalChildPrices = ko.observableArray();
      self.getTotalChildTax = ko.observableArray();
      self.dataprovider = ko.observable(); 
      self.dp = ko.observable(); 
      self.KnockoutTemplateUtils = KnockoutTemplateUtils;
     
      $.getJSON(url).then(function(data) {
        
          for (var i = 0; i < (data.length); i++) {
           // var sum = 0;
            var TotalChildPrices = 0;
            var TotalChildTax = 0;
            self.tempArray = ko.observableArray();
            var BomLevel = 0;
            if(parseInt(data[i].CustomParent) === -1){
              //parent
              BomLevel = 0;
              console.log("Bom level" + BomLevel);
            }

            if (data[i].children.length > 0)
            {
              BomLevel++;
            }
            var c = data[i].children;
            if(c.length > 0)
              c = c.children;
            for(var j = 0; j < data[i].children.length; j++) {
            console.log(data[i].children[j].id);
              self.tempArray.push(new storeddata({
                  id : data[i].children[j].id,
                  name : data[i].children[j].name,
                  short_desc : data[i].children[j].short_desc,
                  Price : data[i].children[j].Price,
                  Tax : data[i].children[j].Tax,
                  CustomParent : data[i].children[j].CustomParent,
                  bomLevel : BomLevel,
              }));
              TotalChildPrices = TotalChildPrices + data[i].children[j].Price;
              TotalChildTax = TotalChildTax + data[i].children[j].Tax;

              console.log(data[i].children[j]);
              if (data[i].children[j].children != null){
                console.log("Child exists");
                console.log(self.tempArray()[i]);

                self.thirdLevel = ko.observableArray();

                for(var k = 0; k < data[i].children[j].children.length; k++) {
                  console.log(data[i].children[j].id);
                    self.thirdLevel.push(new storeddata({
                        id : data[i].children[j].children[k].id,
                        name : data[i].children[j].children[k].name,
                        short_desc : data[i].children[j].children[k].short_desc,
                        Price : data[i].children[j].children[k].Price,
                        Tax : data[i].children[j].children[k].Tax,
                        CustomParent : data[i].children[j].children[k].CustomParent,
                        bomLevel : BomLevel+1,
                    }));
                    TotalChildPrices = TotalChildPrices + data[i].children[j].children[k].Price;
                    TotalChildTax = TotalChildTax + data[i].children[j].children[k].Tax;
                  }      

                self.tempArray()[i].children(self.thirdLevel());
                console.log(self.tempArray()[i]);
              }
            }

        self.getTotalChildPrices.push(TotalChildPrices);
        self.getTotalChildTax.push(TotalChildTax);
        self.tempChildrenArray.push(self.tempArray());
        console.log(self.tempChildrenArray()[i]);

            BomLevel = 0;
            self.deptObservableArray.push(new storeddata({
                id : data[i].id,
                name : data[i].name,
                short_desc : data[i].short_desc,
                Price : self.getTotalChildPrices()[i],
                Tax : self.getTotalChildTax()[i],
                children : self.tempChildrenArray()[i],
                CustomParent : data[i].CustomParent,
                bomLevel : BomLevel,
              }));
}
          console.log(new storedChilddata(self.deptObservableArray()[0]).Price());
          console.log(self.tempChildrenArray());
          console.log(self.deptObservableArray());
         
          self.dataprovider(new FlattenedTreeDataProviderView(new ArrayTreeDataProvider(self.deptObservableArray()), {keyAttributes: "id", }));
          console.log(self.dataprovider());
      });
  
      ////////////////////////////////////
      ///file import
      ////////////////////////////////////

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
            self.importObservableArray.removeAll();
            var buffer = new Uint8Array(fileReader.result);
            console.log(buffer);
            var work_book = XLSX.read(buffer, { type: 'array' });
           
            console.log(work_book);
           
            var sheet_name = work_book.SheetNames;
            console.log(sheet_name);
            var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });
            console.log(sheet_data);

            self.im = ko.observable();
            if (sheet_data.length > 0) {
              for (var row = 1; row < sheet_data.length; row++) {
                if (row == 0) {
                  //header
                  }
                  else {

                    if (sheet_data[row][7] == 0)  // 7 is bomlevel
                    {
                      self.importObservableArray.push(new storeddata({
                        id : sheet_data[row][0],
                        name : sheet_data[row][1],
                        Price : sheet_data[row][2],
                        Tax : sheet_data[row][3],
                        TotalPrice : sheet_data[row][4],
                        TotalSum : sheet_data[row][5],
                        CustomParent : sheet_data[row][6],
                        bomLevel : sheet_data[row][7],
                    //   children : sheet_data[row][cell],
                      }));
                    }
                    else{
                      var getParentId = sheet_data[row][6];
                      var getBomLevel = sheet_data[row][7]; // obviosuly this is not 0
                      
                      getParentId--;
                      console.log(getParentId);
                      console.log("level " + getBomLevel + " and Parent " + getParentId);
                      self.im(new FlattenedTreeDataProviderView(new ArrayTreeDataProvider(self.importObservableArray()), {keyAttributes: "id", }));
                      //var parent_row = row - 1; //row-1 =0th Item     items # starts with 0
                      self.im().dataProvider.treeData[getParentId].children.push(new storeddata({
                        id : sheet_data[row][0],
                        name : sheet_data[row][1],
                        Price : sheet_data[row][2],
                        Tax : sheet_data[row][3],
                        TotalPrice : sheet_data[row][4],
                        TotalSum : sheet_data[row][5],
                        CustomParent : sheet_data[row][6],
                        bomLevel : sheet_data[row][7],
                    //   children : sheet_data[row][cell],
                      }));
                      
                      console.log(self.im().dataProvider.treeData[getParentId].children);
                    }  
                }
                
                console.log(self.importObservableArray()); 
              }
               console.log(self.tempChildrenArray());
               console.log(self.importObservableArray());
               self.dp(new FlattenedTreeDataProviderView(new ArrayTreeDataProvider(self.importObservableArray()), {keyAttributes: "id", }));
               console.log(self.dp());
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

        this.expandAll = function() {
          self.dataprovider().setExpanded(new keySet.ExpandAllKeySet());
        };

        this.collapseAll = function() {
          self.dataprovider().setExpanded(new keySet.ExpandedKeySet());
      }.bind(this);
        
        this.exportFile = (event) => {
          var dl;
          var fn;
          var type = 'xlsx';
          var elt = document.getElementById('table');
          var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
          console.log(dl);
          return dl ?
            XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
            XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
        }
  

      ////////////////////////////////////
      ///   Edit
      ////////////////////////////////////
      
      // function to determine which renderer to use for
      // rendering depending on mode
      this.rowRenderer = function(context)
      {
        var mode = context['rowContext']['mode'];
        if (mode === 'edit')
        {
          return KnockoutTemplateUtils.getRenderer('row_template_editable', true)(context);
        }
          else if (mode === 'navigation')
        {
          return KnockoutTemplateUtils.getRenderer('row_template', true)(context);
        }
      };
  
      this.beforeRowEditEndListener = function(event)
      {
        console.log(event);
        var data = event.detail;
        var rowKey = data.rowContext.status.rowKey;
        var rowObj;

        self.dataprovider().fetchByKeys({keys: [rowKey]}).then(function(results)
        {
          console.log("row key" + rowKey);
          rowObj = results.results.get(rowKey);
          console.log(rowObj);
          console.log(self.dataprovider())
          console.log(rowObj.data.Price());
          // them both works the same 
          //console.log(rowObj['data']);
          document.getElementById('rowDataDump').value = (rowObj.data);
          //json me convert nahi horaha bhai jaan
          //document.getElementById('rowDataDump').value = (JSON.stringify(rowObj.data));
        });
         return DataCollectionEditUtils.basicHandleRowEditEnd(event, data);
       }.bind(this);

  


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