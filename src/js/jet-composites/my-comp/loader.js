/**
  Copyright (c) 2015, 2021, Oracle and/or its affiliates.
  Licensed under The Universal Permissive License (UPL), Version 1.0
  as shown at https://oss.oracle.com/licenses/upl/

*/
define(['ojs/ojcomposite', 'text!./my-comp-view.html', './my-comp-viewModel', 'text!./component.json', 'css!./my-comp-styles.css'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('my-comp', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);