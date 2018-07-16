const BotDriver = require('botium-core').BotDriver;
const Capabilities = require('botium-core').Capabilities;
const Source = require('botium-core').Source;


function assert (expected, actual) {
  if (!actual || actual.indexOf(expected) < 0) {
    console.log(`ERROR: Expected <${expected}>, got <${actual}>`);
  } else {
    console.log(`SUCCESS: Got Expected <${expected}>`);
  }
}

const driver = new BotDriver()
  .setCapability(Capabilities.PROJECTNAME, 'core-CreateNewConversation')
  .setCapability(Capabilities.CONTAINERMODE, 'docker')
  .setCapability(Capabilities.BOTFRAMEWORK_API, true)
  .setCapability(Capabilities.BOTFRAMEWORK_APP_ID, 'f452a669-9f03-46f8-8832-7202087cf11b')
  .setCapability(Capabilities.BOTFRAMEWORK_CHANNEL_ID, 'facebook')
  .setCapability(Capabilities.CLEANUPTEMPDIR, false)
  .setSource(Source.GITURL, 'https://github.com/galton07/chatbot.git')
  .setSource(Source.GITDIR, 'Node/core-CreateNewConversation')
  .setSource(Source.GITPREPARECMD, 'npm install')
  .setCapability(Capabilities.STARTCMD, 'npm start')
  .setEnv('MICROSOFT_APP_ID', 'f452a669-9f03-46f8-8832-7202087cf11b')
  .setEnv('MICROSOFT_APP_PASSWORD', 'l!G-&nLaz8)5Yy-g')
  .setEnv('NODE_DEBUG', 'botbuilder')
  .setEnv('DEBUG', '*');

driver.BuildFluent()
  .Start()
  .UserSaysText('hi bot')
  .WaitBotSaysText((text) => assert('You\'ve been invited to a survey! It will start in a few seconds...', text))
  .WaitBotSaysText(null, 10000, (text) => assert('Hello... What\'s your name?', text))
  .UserSaysText('John')
  .WaitBotSaysText((text) => assert('Hi John, How many years have you been coding?', text))
  .UserSaysText('5')
  .WaitBotSaysText((text) => assert('What language do you code Node using?', text))
  .UserSaysText('CoffeeScript')
  .WaitBotSaysText((text) => assert('Got it... John you\'ve been programming for 5 years and use CoffeeScript.', text))
  .Stop()
  .Clean()
  .Exec()
  .then(() => {
    console.log('READY');
  })
  .catch((err) => {
    console.log('ERROR: ', err);
  });
