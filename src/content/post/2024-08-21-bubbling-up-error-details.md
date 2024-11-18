---
title: Handling error details in Node.js
description: This post explores how to manage errors in node js and bubble up the important error detials necessary for higher layers of abstraction.
publishDate: 2024-08-21
updatedDate: 2024-11-10
heroImage: '../../content/post/_images/2024-08-21-bubbling-up-error-details/bubble.jpg'
heroAlt: 'Ai generated. A person sitting in an office setup and working with computers on a desk.'
noHero: false
tags:
  - node.js
  - error handling
category: Resources
toc: true
---

## The problem
We want to **propagate some error details** from the internal modules to the front end or to the API exposed to our code's users.

One common method of propagating the error is passing it as the second parameter of the error constructor. However, obtaining the error details requires specific syntax.


## The solution
In Node.js, the [Error object](https://nodejs.org/api/errors.html#class-error) can propagate the cause property inside the options argument.

As an example, let's say we have the function `getUsers` that fetches a list of users, and another module consumes that function to generate the list of elements on the UI.


The service level module that fetches the data can handle the error like as follows:

```javascript

function getUsers() {
    try{
        // some code to fetch the users data
    }catch(error){
        // Lets say that we know the specific type of error that we want to extract some data from.
        if (error instanceof ClientResponseError) {
            const {response} = error;
            const responseMessages = Object.keys(response.data).map(key=>response.data[key]?.message);
            // We can create the cause object that we want to propagate to the error details. 
            const cause = {
                code: response.code,
                messages: responseMessages,
        }        
        // And we attach the cause to the error as a property of the options argument.
        throw new Error(`Server ${error.response.message}`, {cause});
      }
      // Any other error object we can propagate it inside the options.cause parameter 
      throw new Error(`Email already registered.`, {cause: error});
    }

```

Then, the consumer of the getUsers method can handle the error like as follows:

```javascript

function renderUsersList(){
    try{
        const users = getUsers();
        // Some code to render the users list
    }catch(error){
        console.log(`Error on users list render:`, error.message, error.cause);
        // We can re-propagate the error to other methods as well.
        throw new Error(`Error on users list rendering: ${error.message}`, {cause: error.cause});
    }
}

```

> Note that the `error.message` is the message of the error object, and `error.cause` is the `options.cause` object we created in the `getUsers` function.


## Summary

With this approach we can minimise the creation of custome error types that extend from Error and **we can use the defaulf Error object to propagate the important error details**.

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!




