'use strict';

var scenarioo = require('scenarioo-js');
var pages = require('./../webPages');

scenarioo.describeUseCase('Configure label colors', function () {

    scenarioo.describeScenario('Create, edit and delete label configurations', function () {
        var labelConfigurationsPage = new pages.labelConfigurationsPage();
        var homePage = new pages.homePage();

        labelConfigurationsPage.goToPage();
        scenarioo.docuWriter.saveStep('show label configurations');

        homePage.closeScenariooInfoDialogIfOpen();

        labelConfigurationsPage.assertNumConfigurations(0);

        labelConfigurationsPage.addLabelConfiguration('corner-case', 5);
        scenarioo.docuWriter.saveStep('add label configuration');

        labelConfigurationsPage.goToPage();
        labelConfigurationsPage.assertNumConfigurations(1);

        labelConfigurationsPage.updateLabelConfiguration(0, 'updated', 4);
        scenarioo.docuWriter.saveStep('update label configuration');

        labelConfigurationsPage.deleteLabelConfiguration(0);

        labelConfigurationsPage.goToPage();
        labelConfigurationsPage.assertNumConfigurations(0);
    });

});
