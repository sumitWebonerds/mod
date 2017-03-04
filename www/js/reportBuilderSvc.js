//
// Report Service
//
// This service provides a dummy document definition for the purpose of this sample.  In 
// my real world usage, I split documentDef creation from the reportPDF creation.  The RptBuilderSvc
// is used to receive inputs and return a JSON object w/ the report declarations.  This mock svc
// just creates some random progress matrix and draws a table to display.  The pdfMake.org site
// has a nice playground for drafting your report pieces.  My plan is to share the ionic-pdf
// so users can incorporate PDF generation and focus on creating their docDefs and using ionic-pdf
// to easily render
(function() {
    'use strict';
    // attach the factories and service to the [starter.services] module in angular
    angular.module('starter.services')
        .service('ReportBuilderSvc', reportBuilderService);
    
	function reportBuilderService() {
        var self = this;
        
        self.generateReport = _generateReport;            
        function _generateReport() {
            //create an array of progress for the (6) categories presented
            var completions = 
                [(0 * 100).toFixed(1),
                (0 * 100).toFixed(1),
                (0 * 100).toFixed(1),
                (0 * 100).toFixed(1),
                (0 * 100).toFixed(1),
                (0 * 100).toFixed(1)];
            //use this array for each row bar, and return the document declaration object
            // plz see the pdfMake.org site for examples of document definitions
			return { content: [
                { text: 'Casenotes',
                    style: 'subheader',
                    margin: [ 0, 12, 0, 0]
                },
               
                { table: {
                        headers: 1,
                        widths: [ 400, 75],
                        body: [
                            [{ text: 'Core Check Category', style:'tableHeader'}, 
                                { text: 'Completion', style:'tableHeader'}], 
                            [['English Requirement'
                                ], { text: completions[0] + '%', alignment: 'center' }],
                            [['Math Requirement',
                                ], { text: completions[1] + '%', alignment: 'center' }],
                            [['Science Requirement', 
                                ], { text: completions[2] + '%', alignment: 'center' }],
                            [['Additional Core Requirement',
                                ], { text: completions[3] + '%', alignment: 'center' }],
                            [['Social Science Requirement', 
                                ], { text: completions[4] + '%', alignment: 'center' }],
                            [['Elective Requirement'
                                ], { text: completions[5] + '%', alignment: 'center' }]
                        ]
                    }, 
                        pageBreak: 'after'
                    } ] };
		};
    }
})();