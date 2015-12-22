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

### Adding a Book Thing
Allowing users to add a book to their collection requires us to create a `Book` as a `Thing` in our apps universe. And oddly enough we call that `Thing` a collection or model depending on how you're referring to it.

Navigate to `models/book.js` and start with this.
```javascript
Books = new Meteor.Collection('books')
Books.attachBehaviour('timestampable')
Books.attachSchema({
  title: {
    type: String
  },
  author: {
    type: String,
    optional: true
  },
  pageCount: {
    type: Number,
    defaultValue: 0
  },
  currentPage: {
    type: Number,
    defaultValue: 0
  }
})

```
This is our Book `model`. It's a collection labeled `books`, the line after we declare `Books` as a thing we assign it a behaviour, `timestampable`. This puts a time stamp on who created the book, when they created it and if it's updated it'll tell us who updated it and when.

Finally we describe what a `Book` is made out of in our app. The `attachSchema` chunk of code creates a `schema`, an outline of what properties a book should have.

### Adding Books
Now that our app knows what a `Book` is we can let our users add one through a form.

Open up `client/books/form.js` and start typing in the following. It's a little larger than our login or sign up forms but it's very similar.

```html
<div layout layout-align="center center">
  <md-card flex-gt-sm="50">
    <md-card-header>
      <md-card-header-text>
        <span class="md-title" ng-show="!Book.model._id">Add Book</span>
        <span class="md-title" ng-show="Book.model._id">Edit Book</span>
      </md-card-header-text>
    </md-card-header>
    <md-divider></md-divider>
    <md-card-content>
      <form ng-submit="Book.save()" layout="column">
        <div layout layout-sm="column">
          <div layout>
            <md-input-container>
              <label>Title</label>
              <input type="text" ng-model="Book.model.title" ng-required="true">
            </md-input-container>
            <md-input-container>
              <label>Author</label>
              <input type="text" ng-model="Book.model.author">
            </md-input-container>
          </div>
        </div>
        <div layout layout-sm="column">
          <md-input-container>
            <label>Current Page</label>
            <input type="number" ng-model="Book.model.currentPage">
          </md-input-container>
          <md-input-container>
            <label>Page Count</label>
            <input type="number" ng-model="Book.model.pageCount">
          </md-input-container>
        </div>
        <div layout layout-align="end center">
          <md-button class="md-raised md-accent" type="submit">
            Save
          </md-button>
        </div>
      </form>
    </md-card-content>
  </md-card>
</div>
```
Typing along some patterns should be showing up to you, when we want our App to do something we often attach a capital cased word inside of an HTML element, like `Book.save()` or `Login.withPassword()`.

We need a way to get to our shiny new form, and we need to give it some behaviour with a `controller` as we did with `Login` and `SignUp`.

Back to our trusty `client/lib/config.js` file let's add another `state`.

```javascript
.state('app.createBook', {
  url: '/books/create',
  templateUrl: 'client/books/form.html',
  controller: 'BookCreateVM as Book'
})
```
Place that just under the similar looking block of code for `signup`.

At this point we're lying to our app, we didn't create a `BookCreateVM`, luckily our users don't have a link to the page so it won't throw an error. Let's right this wrong, in our `client/books/form.js` we'll start with a very similar block of code.

```javascript
App.controller('BookCreateVM', function($reactive, $scope, $state, $mdToast){
  $reactive(this).attach($scope)
})
```

Now our app won't throw an error if someone found the page. Let's add a link to it on our main template.

Right before our log out button we'll put an add book link.

```html
<md-button ui-sref="app.createBook">
  Add Book
</md-button>
```

Place that between the `<span flex></span>` and the button that says logout.

Clicking it will take you to the form you tapped out earlier.

Let's make that work.

Navigate to `client/books/form.js`.

We need to give it a `save` function and an object to write the user input to.

```javascript
App.controller('BookCreateVM', function($reactive, $scope, $state, $mdToast){
  $reactive(this).attach($scope)
  this.model = {}
  this.save  = () => {

  }
})
```

Updating it to make it look like this puts about half way there. Gave it a `model` which is an empty object, and a save function that doesn't do anything.

When the user saves the form we want them to `insert` a model into the apps `Book` collection.

The body of the save function will look like this for now.

```javascript
Books.insert(this.model, (err, success) => {
  if(err){
    console.log('uh oh somethign went wrong.')
    return console.log(err)
  }
  console.log('woo you made a book', success)
})
```

This tells the app to `insert` our model object. If it can't insert the book for some reason it'll get an `error` that we log to our browsers console. If it does insert it we'll get a congratulation message in our console instead.

We need just a few more things before we can wrap up this step. For one, we have security in place that will stop any user from adding or editing books. We need to permit logged in users to add or edit books.

In `server/publish-books.js` place this line.

```javascript
Books.permit(['insert', 'update', 'remove']).ifLoggedIn().apply()
```

If a user is logged in they can now insert, update and remove Books. But our form doesn't really let them know if their book was added or if it goofed.


Back in our `client/books/form.js` file we'll make a few modifications.

If the book doesn't save we'll show the user the error message, if it does we'll redirect them to the home page.

Your completed file should look like this now.

```javascript
App.controller('BookCreateVM', function($reactive, $scope, $state, $mdToast){
  $reactive(this).attach($scope)
  this.model = {}
  this.save  = () => {
    Books.insert(this.model, (err, success) => {
      if(err){
        return $mdToast.show($mdToast.simple().position('top right').textContent(err.message))
      }
      $state.go('app.main')
    })
  }
})
```

Try adding a book, if you end up on the home page everything is working!

But we still to let our users actually see the books they have.

Our books are stored on the server and never sent to the browser, we need to tell our App that it's okay to send a user the books they've added.

Back in `server/publish-books.js` we'll tell our App to do just that.

Add the following after that first line from earlier.

```javascript
Meteor.publish('books', function(){
  if(!this.userId){
    return this.ready()
  }
  return Books.find({
    createdBy: this.userId
  })
})
```

This tells our app that if there isn't a user it doesn't need to do anything, but if there is return all of the Books it can find created by that user.

Open `client/books/list.js` and add the following.

```javascript
App.controller('BookListVM', function($reactive, $scope, $state){
  $reactive(this).attach($scope)
  this.subscribe('books')
  this.helpers({
    list(){
      return Books.find({
        createdBy: Meteor.userId()
      })
    }
  })
})
```

We are `subscribing` to the `books` publication we added to the server file, and then inside of the `helpers` block we're telling it to find those books.

Let's create a page for the book list.

We'll repeat the process for creating a page that we used for login, sign up and adding a book. In our `client/lib/config.js` file we'll add another `state`.

Our html for the list looks like this

```html
<md-card ng-repeat="book in Books.list">
  <md-card-header>
    <md-card-header-text>
      <span class="md-title">{{book.title}}</span>
      <span class="md-subhead">{{book.author}}</span>
    </md-card-header-text>
  </md-card-header>
  <md-divider></md-divider>
  <md-card-content>
    <h3 style="text-align: center;">
      {{book.currentPage}}
    </h3>
    <div layout layout-align="center center">
      <span>{{book.currentPage}}</span>
      <md-slider min="0" max="{{book.pageCount}}" ng-model="book.currentPage" flex aria-label="{{book.title}} current page." ng-change="Books.updatePage(book)"></md-slider>
      <span>{{book.pageCount}}</span>
    </div>
  </md-card-content>
</md-card>
```

It's a `card` repeated for each book our user has. It shows us the title, the author, how many total pages and what page the user left off at. It has a slider to move their current page as they read it.

Now we need to let our users find that page. We'll update a few files so that a user sees this page when they expect to.

We want them to see it
- When they click the `52B` button in our toolbar.
- When they add a book.
- When they log in.

So we'll edit
- `client/app.html`
- `client/users/login.js`
- `client/books/form.js`

In our `app.html` we want to change the button for logged in users only. It's the second block that has the `ng-show` property.

Change
```html
<md-button ui-sref="app.main">
  52B
</md-button>
```
to

```html
<md-button ui-sref="app.listBooks">
  52B
</md-button>
```

In both the `login.js` and the `form.js` files we want to change the success action that starts with `$state.go`. It was taking them to `app.main`, but we want it to take them to `app.listBooks`.

Change `$state.go('app.main')` to `$state.go('app.listBooks')` in both files.

Now when we login or add a book we should see all of the books we have.

### Final Step
A user can add books, look at the books they have, but they can't change their current page.

Let's allow that.

In our book list page we had a line of code that looks like this:

```html
<md-slider min="0" max="{{book.pageCount}}" ng-model="book.currentPage" flex aria-label="{{book.title}} current page." ng-change="Books.updatePage(book)"></md-slider>
```

It's our slider for page position. It has a lot of properties compared to some other elements we've looked closly at. We're concerned with the bit inside of `ng-change`. This tells our app that when the slider it changes it should call `Books.updatePage(book)` for that book.

In our `client/books/list.js` file we'll add that function.


Our final file now looks like this.

```javascript
App.controller('BookListVM', function($reactive, $scope, $state){
  $reactive(this).attach($scope)
  this.subscribe('books')
  this.helpers({
    list(){
      return Books.find({
        createdBy: Meteor.userId()
      })
    }
  })
  this.updatePage = (book) => {
    Books.update(book._id, {
      $set: {
        currentPage: book.currentPage
      }
    })
  }
})
```

The addition is that last little bit.

It says, take the book you're being given, and in the database set it's current page to the users change.

Try it out.

You should now have an app that allows a user to add books and change their current page.

### Slightly less useless, but not yet useful.
While we did make an app that fulfills our original purpose of adding books and checking off how far we got into them it's not very useful. User's can't remove a book, or leave themselves a review of the book. It doesn't give special focus to the book they are reading right now or hide books they've finished.

### Next Episode
In the next tutorial we'll reflect on what we've written, and add those missing features.
