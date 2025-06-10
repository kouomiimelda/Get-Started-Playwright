const config = {
    
        require: [
            'features/step_definitions/*.ts',
            'support/*.ts',
        ],
        format: [
            'pretty', 
            'json:reports/report.json', 
            'json:reports/cucumber-report/cucumber-report.json',
            'html:reports/cucumber-report/report.html',
        ],
        publishQuiet: false,
        requireModule: ['ts-node/register'],
        paths: ['features/**/*.feature'],
        worldParameters: {
            BASE_URL: 'http://test.icam-afrique.com',
        }
   
};

export default config;