# 0 - App in 30 Minutes
## Creating a simple app for reading 52 Books this coming year.

### Summary
We'll focus almost completely and the "What" and "How" this tutorial, follow along and write the code in your own editor. Avoid copying and pasting, retyping it will make you think about what you're typing.

This chapter isn't meant to teach you much about programming or app development. It's a primer to give you a base and familiarity. You shouldn't need to know much about programming to follow along.

### Avoiding Set Up with Cloud9
Cloud9 is an web app that let's your program online in your browser. Using it means you don't have to install Meteor or Git on your computer or choose a code editor. If you have those things feel free to skip this part.

Sign up for Cloud9(http://c9.io), and create a new workspace.

On the new workspace form, give it a name and then paste `https://github.com/cranesandcaff/fifty-two-b.git` into the `Clone from Git or Mercurial URL`.

Click the `Meteor` template and the button to create the work space.

### A Workspace
Your workspace is where your projects, editor and command line all exist. You should see a list of files on the left, a main window for the editor and at the bottom of your page should be a panel labeled `bash`. Click inside of that panel and type `meteor --port $IP:$PORT`, press enter and C9 will start your meteor app.

This might take a moment, it took a few for me. Go grab a coffee or something.

### Blank Slate
Eventually the bottom panel will tell you that your app is running. Super nifty. You can check a preview of your app by clicking the button up top appropriately labeled `preview`. It'll open a browser window inside of your current one running your app. Which should be completely blank right now.

### Your First Brush Strokes
I've set up your first template for you. The file `fifty-two-b.html` is a barebones html file with only a few lines of code. You can give it a look over if you'd like, but we won't be editing it.

I also created all of the folders and files you'll need, but they are empty right now. Locate the file `config.js` inside of the `client/lib/` directory.

*Directory is the jargon for folder*

Type the following into that file. Seriously, type it out. It's tempting to copy and paste it especially if you don't know what any of it does but typing it helps you think about what you're doing. Fixing errors related to typos is also really helpful, even if it's super frustrating. We'll go in depth on what's happening here in a future episode.

    App = angular.module('fiftyTwoB', [
      'angular-meteor',
      'ngMaterial',
      'ngAnimate',
      'ngAria',
      'ui.router'
    ])

    App.config(function($stateProvider, $urlRouterProvider, $locationProvider){
      $locationProvider.html5Mode(true)
      $urlRouterProvider.otherwise('/')
      $stateProvider.state('app', {
        url: '/',
        template: 'Hello World. I am App.'
      })
    })

    function onReady(){
      angular.bootstrap(document, ['fiftyTwoB'])
    }

    if(Meteor.isCordova){
      angular.element(document).on('deviceready', onReady)
    } else {
      angular.element(document).ready(onReady)
    }

If you left your preview running, after saving the file it should refresh and in place of your empty page you'll have the sentence "Hello World. I am App."

Let's add some structure to our apps main template and then add a way for users to sign up and log in.
