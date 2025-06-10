import { formatterHelpers, Status } from '@cucumber/cucumber'
import { CucumberJSAllureFormatter, AllureRuntime } from "allure-cucumberjs";
import path from "path";

let index = {
  step : 0,
  stepError : 0,
  stepSkipped : 0,
  stepUndefined : 0,
  stepPassed : 0,
  stepDefault : 0,
  testCase : 0,
  testCasePassed : 0,
  testCaseError : 0,

};

const Colors = {
  cyan : '\x1b[36m',
  yellow : '\x1b[33m',
  reset : '\x1b[0m',
  red : '\x1b[31m'
}

export default class Reporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(options, new AllureRuntime({ resultsDir:path.resolve(__dirname, "reports/allure-results") }), {});
    options.eventBroadcaster.on('envelope',(envelope ) => {
      if (envelope.testCaseStarted) {
        if (envelope.testCaseStarted.workerId) {
          console.log(`the event has been fired from a worker with id ${envelope.testCaseStarted.workerId}`
          )
        } else {
          console.log('the event has been sent from the main thread')
        }
      }
      else if (envelope.testCaseFinished) {
        this.logTestCaseFinished(envelope.testCaseFinished);
      } else if (envelope.testRunFinished) {
        this.logTestRunFinished(envelope.testRunFinished);
      }
    });    
  }
 
  logTestCaseFinished(testCaseFinished) {
    const testCaseAttempt = this.eventDataCollector.getTestCaseAttempt(testCaseFinished.testCaseStartedId);
    index.testCase++;
    this.log(index.testCase+') Feature: ' + testCaseAttempt.gherkinDocument.feature.name + '\nScenario: ' + testCaseAttempt.pickle.name + '\n');
    testCaseAttempt.worstTestStepResult.status == Status.PASSED ? index.testCasePassed++ : index.testCaseError++
    this.stepMessage(testCaseAttempt);
    this.log('\n');
  }

  stepMessage(testCaseAttempt) {
    const parsed = formatterHelpers.parseTestCaseAttempt({
      cwd: this.cwd,
      snippetBuilder: this.snippetBuilder,
      supportCodeLibrary: this.supportCodeLibrary,
      testCaseAttempt
    });
    parsed.testSteps.forEach(testStep => {
      index.step++
      switch (testStep.result.status) {
        case Status.FAILED:
          this.log(`\t\t❌   `);
          index.stepError++
          break;
        case Status.PASSED:
          this.log(`\t\t✅   `);
          index.stepPassed++
          break;
        case Status.UNDEFINED:
          this.log(`\t\t⚠️    `);
          index.stepUndefined++
          break;
        case Status.SKIPPED:
            this.log(`\t\t➖   `);
            index.stepSkipped++
          break;
        default:
          this.log(`\t\tℹ️     `);
          index.stepDefault++
      }
      this.stepText(testStep, true);

    });
  }

  stepText(testStep, isLogColor) {
    if (isLogColor) {
      this.log(`${Colors.yellow}${testStep.keyword}${Colors.reset} `);
      this.log(`${Colors.cyan}${(testStep.text || '#')}${Colors.reset}\n`);
      if (testStep.result.message) {
        this.log(`\t\t\t\t${Colors.red}${testStep.result.message}${Colors.reset}\n`);
      }
      
    } else {
      this.log(`${testStep.keyword} `);
      this.log(`${(testStep.text || '#')}\n`);
      if (testStep.result.message) {
        this.log(`\t\t\t\t${testStep.result.message}\n`);
      }
    }
    if(testStep.attachments.length != 0 && testStep.text){
      this.log(`\t\t\t\t\t\t${testStep.attachments[0].body}\n`);
    }
  }

  logTestRunFinished(testRunFinished) {
    this.logTestCasesCount();
    this.logStepCount();
    this.log(`Test result : ${testRunFinished.success ?"Passed ✅":"Failed ❌"}\n`);
  }
  

  logTestCasesCount() {
    let firstIndexTC = true;
    this.log(`${index.testCase} scenarios (`);
    if (index.testCasePassed != 0) {
      firstIndexTC = false;
      this.log(`${index.testCasePassed} passed`);
    }
    if (index.testCaseError != 0) {
      firstIndexTC ? firstIndexTC = false : this.log(`, `);
      this.log(`${index.testCaseError} failed`);
    }
    this.log(`)\n`);
  }
logStepCount() {
    let firstIndexStep = true;
    this.log(`${index.step} steps (`);
    if (index.stepPassed != 0) {
      firstIndexStep = false;
      this.log(`${index.stepPassed} passed`);
    }
    if (index.stepError != 0) {
      firstIndexStep ? firstIndexStep = false : this.log(`, `);
      this.log(`${index.stepError} failed`);
    }
    if (index.stepSkipped != 0) {
      firstIndexStep ? firstIndexStep = false : this.log(`, `);
      this.log(`${index.stepSkipped} skipped`);
    }
    if (index.stepUndefined != 0) {
      firstIndexStep ? firstIndexStep = false : this.log(`, `);
      this.log(`${index.stepUndefined} undefined`);
    }
    if (index.stepDefault != 0) {
      firstIndexStep ? firstIndexStep = false : this.log(`, `);
      this.log(`${index.stepUndefined} unknow`);
    }
    this.log(`)\n`);
  }
}