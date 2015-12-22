# 0 - App in 30 Minutes
## Creating a simple app for reading 52 Books this coming year.

### Summary
We'll focus almost completely and the "What" and "How" this tutorial, follow along and write the code in your own editor. Avoid copying and pasting, retyping it will make you think about what you're typing.

This chapter isn't meant to teach you much about programming or app development. It's a primer to give you a base and familiarity. You shouldn't need to know much about programming to follow along, but it helps.

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

```javascript
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
```

If you left your preview running, after saving the file it should refresh and in place of your empty page you'll have the sentence "Hello World. I am App."

### User Sign Up and Login

Let's add some structure to our apps main template and then add a way for users to sign up and log in.

In your `client/lib/config.js` file we are going to change what template we are using.

Starting with the chunk of code that looks like this:

  ```javascript
  $stateProvider.state('app', {
    url: '/',
    template: 'Hello World. I am App.'
  })
  ```

Update it to look like this.

    ```javascript
    $stateProvider.state('app', {
      templateUrl: 'client/app.html'
    })
    .state('app.main', {
      url: '/',
      template: 'Main App Page'
    })
    .state('app.login', {
      url: '/login',
      templateUrl: 'client/users/login.html'
    })
    .state('app.signUp', {
      url: '/sign-up',
      templateUrl: 'client/users/signup.html'
    })
    ```

Open the `client.html` file and type up the following
```html
    <md-toolbar>
      <div class="md-toolbar-tools">
        <md-button ui-sref="app.main">
          52B
        </md-button>
        <span flex></span>
        <md-button ui-sref="app.login">
          Login
        </md-button>
        <md-button ui-sref="app.signUp">
          Sign Up
        </md-button>
      </div>
    </md-toolbar>
    <md-content>
      <ui-view></ui-view>
    </md-content>
```
You should have a toolbar now with 3 links inside of it.

Let's tackle changing that Sign Up page into a pretty little form.

Open up your `client/users/signup.html` file and fill it out thusly.
```html
    <md-card>
      <md-card-content>
        <form ng-submit="SignUp.withPassword()" layout="column">
          <md-input-container>
            <label>Email Address</label>
            <input type="email" ng-model="SignUp.user.email">
          </md-input-container>
          <md-input-container>
            <label>Password</label>
            <input type="password" ng-model="SignUp.user.password">
          </md-input-container>
          <md-button type="submit" class="md-raised md-primary">
            Sign Up
          </md-button>
          <div layout>
            <span flex></span>
            <a ui-sref="app.login">Already a user? Login here.</a>
          </div>
        </form>
      </md-card-content>
    </md-card>
```

This creates a `card` with a sign up form, it won't do anything yet.

Now open up `client/users/signup.js` and type this
```javascript
    App.controller('SignUpVM', function($reactive, $scope, $state, $mdToast){
      $reactive(this).attach($scope)
      this.user = {}
      this.withPassword = () => {
        Accounts.createUser(this.user, (err, success) => {
          if(err){
            return $mdToast.show($mdToast.simple().position('top right').textContent(err.reason))
          }
          $state.go('app.main')
        })
      }
    })
```
One last step before your form lets users sign up, back to our config locate the chunk of code for the sign up.
```javascript
    .state('app.signUp', {
      url: '/sign-up',
      templateUrl: 'client/users/signup.html'
    })
```
We're going to add a `property` to it's configuration that attaches our sign up code to the template we made.

Change it to look like this
```
    .state('app.signUp', {
      url: '/sign-up',
      templateUrl: 'client/users/signup.html',
      controller: 'SignUpVM as SignUp'
    })
```
If you're tapping along you might recognize that we created a `Thing` earlier that used the words `SignUpVM` and in our sign up form we had the word `SignUp` in a few different places.

Without going too deep, that `Thing` was our `controller` for the sign up page, it handles the interactions between the user, the app and the associated template.

Try signing up, if it works you should end up back on our home and and nothing will look too different yet.

Since we're signed up and signed in now we don't really want to see the sign up or login links any more, and we need a link to log out too.

We're going to create another `controller`, this one for our entire app. It'll provide the log out feature.

Make your `client/app.js` look like this.
```javascript
    App.controller('AppVM', function($reactive, $scope, $state){
      $reactive(this).attach($scope)
      this.helpers({
        currentUser(){
          return Meteor.user()
        }
      })
      this.logout = () => {
        Meteor.logout(() => $state.go('app.main'))
      }
    })
```

Before this `controller` affects the app template we need to attach it. The same way we did with the sign up controller, in `client/lib/config.js` find the chunk related to our app, it'll look like this
```javascript
    $stateProvider.state('app', {
      templateUrl: 'client/app.html'
    })
```
Update it with our controller property.
```javascript
    $stateProvider.state('app', {
      templateUrl: 'client/app.html',
      controller: 'AppVM as App'
    })
```
The above is what you should have.

Now that the controller is attached to our app anything we attach to the `AppVM` will be available to us through the `App` variable in our templates.

Speaking of, navigate to `client/app.html`, so that we can change what a user who is logged in sees.

Inside of the toolbar code, we're going to update it to this.
```html
    <md-toolbar>
      <div class="md-toolbar-tools" ng-hide="App.currentUser">
        <md-button ui-sref="app.main">
          52B
        </md-button>
        <span flex></span>
        <md-button ui-sref="app.login">
          Login
        </md-button>
        <md-button ui-sref="app.signUp">
          Sign Up
        </md-button>
      </div>
      <div class="md-toolbar-tools" ng-show="App.currentUser">
        <md-button ui-sref="app.main">
          52B
        </md-button>
        <span flex></span>
        <md-button ng-click="App.logout()">
          Logout
        </md-button>
      </div>
    </md-toolbar>
```
We added a directive `ng-hide` to the original element and made it equal to `App.currentUser`, then we created a new element that does the opposite, it has a `ng-show` directive assigned to the same thing. If our App has a user it'll hide the first toolbar and show the second, vice versa if there isn't a user.

Try clicking the logout button and watch the buttons change.

But now you're logged out and that login page is still empty, that's not great.

In our `client/users/login.js` file we're going to create another controller that will look very similar to our `RegisterVM`.
```javascript
    App.controller('LoginVM', function($reactive, $scope, $state, $mdToast){
      $reactive(this).attach($scope)
      this.user = {}
      this.withPassword = () => {
        Meteor.loginWithPassword(this.user.email, this.user.password, (err, success) => {
          if(err){
            return $mdToast.show($mdToast.simple().position('top right').textContent(err.reason))
          }
          $state.go('app.main')
        })
      }
    })
```
It has a minor change in comparison to our `RegisterVM`, hiding inside of the `this.withPassword` chunk we changed `Accounts.createUser` to `Meteor.loginWithPassword`, and instead of accepting just the `this.user` you have to give it `this.user.email` and `this.user.password`.

Our login form will be almost exactly like our register form, with another fairly small change.
```html
    <md-card>
      <md-card-content>
        <form ng-submit="Login.withPassword()" layout="column">
          <md-input-container>
            <label>Email Address</label>
            <input type="email" ng-model="Login.user.email">
          </md-input-container>
          <md-input-container>
            <label>Password</label>
            <input type="password" ng-model="Login.user.password">
          </md-input-container>
          <md-button type="submit" class="md-raised md-primary">
            Sign Up
          </md-button>
          <div layout>
            <span flex></span>
            <a ui-sref="app.signUp">Not a user? Sign up here.</a>
          </div>
        </form>
      </md-card-content>
    </md-card>
```
The only two differences here are that we changed references of `SignUp` to `Login` and changed our link at the bottom of the form to urge users to sign up if they aren't users.

### Useless to Slightly Less Useless
Now that our users can log in we should give them the features they were expecting. The ability to add books and look at the books they are planning on reading.
