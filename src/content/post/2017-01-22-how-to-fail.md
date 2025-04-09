---
title: How to FAIL in Test Automation
description: I started writing down some real-life notes about how to set up things for a miserably "failing" test automation strategy.
publishDate: 2017-01-22
updatedDate: 2024-09-26
heroImage: '@/content/post/_images/2017-01-22-how-to-fail/failure.jpg'
heroAlt: 'Scrabble game with failure word on a table.'
noHero: false
tags:
  - test automation
  - failure
  - strategy
category: Q.Assistance
toc: true
---


## Overview

To make a good use of my time while "waiting for the stars to align", which means waiting for some managers to remove "impediments", I started writing down some real-life notes about how to set up things for a miserably "failing" test automation strategy.

## Communication
Let's start with the communication details. **The first thing you should completely avoid is to talk to product owners or other people holding job titles that have the words "Manager", "Director", "Chief" or "God"**. If you are so unlucky that they would come to you and ask about what are you doing, under any circumstance, do not explain what are you going to do and how you can benefit them with your craftsmanship. A good enough reply would be something along the lines of "Oh, well.....blah blah blah" (Put a technical obscured verbose sentence here, which is so complicated that you don't even understand). And hold your face straight without any doubts or smiles until they fade away thinking that they are so big shots and you are such a big shit for them.

## Collaboration
**The next step after you avoid explaining any detail about what you are going to do is to avoid any collaboration with developers and manual testers.** They are so into another league of competences where they will never understand what you are trying to do. Do not waste time explaining to them what are your needs and how you could help the team to achieve a better outcome of their craft.

The developers are so busy creating what is popularly known as a technical debt. Nowadays everyone likes debt which is holding the world together. If you do not have debt, you are not human, so coders are full time dedicated to that goal. Do not disturb them.

**For the manual testing team, well, they are almost testing a completely different application.** Their testing has nothing to do with automation and again a complete waste of your time trying to align with them about what tests should and should not be automated. Do not even think about to disturb the peaceful manual boring procedural testing either.  

## Tester geek
**The last thing you must not do is to spend time trying to convince people on that Test Automation could help everyone on earth.** That is a "Taboo" subject and you risk your job, potentially your life if you even just think about it. If you keep trying to do the right thing, your teammates will see some sort of automation symbol in your eyes and you will be branded as a strange geek.

I will stop here for now because I am getting so excited that I could smash the laptop against the window and...

Keep safe. Keep playing the game. At the end of the day, most of the people are having an immense hilarious amount of unqualifiable fun!

This post is open for collaborations. I will add up any good contributions to this subject. I am sure that after all this time working on our beloved testing projects, we have learnt something, didn't we?

> *"Those who cannot learn from history are doomed to repeat it." *
>
> ***George Santayana***

## Summary
For those who want to avoid all these failures, where there is a professional resource to back up our miserable experiences. In chapter 9, [ RoI Robbers in test automation](https://www.amazon.com/Test-Automation-Real-World-Practical-ebook/dp/B015LMDJ1S/ref=sr_1_1?s=digital-text&ie=UTF8&qid=1484306427&sr=1-1&keywords=Test+Automation+in+the+Real+World) by Greg Paskal, has a superb list of points that have to be considered when building up a testing strategy.

-----

## Update by **Francesco Calvino**

To help the not-to-do list, make sure that your core application hasn't got any attribute like:

-   "readability" (the ability to read the code and understand what the app does just by reading the code)
-   "testability" (the ability to have elements properly and clearly identified on the page, log files that explain what error you just found has occurred and an application that is not coupled with the test data)
-   "stability" (the test environment should be stable and not going up or down like a yo-yo)

Also avoid decoupling where the tests should not be depending on the data that feeds said tests, and why not, you should not have instrumented builds. (instrumented is when your application is enriched with 3rd party tools that will enable automation tests to run) Although this is not a bad one, not having an instrumented build is the surest way to know that the application under test is NOT exactly the same as the application that you will ultimately ship to your customers. Thus, all your testing campaigns will be utterly useless.

For now, I think it is enough Marc....

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!