---
title: Automating bugs
description: Executing a set of SQL updates in order to prepare test data can be harmful. Legacy systems can be hard to maintain, improve, and expand because there is a general lack of understanding of the system.
publishDate: 2017-10-23
updatedDate: 2024-10-01
heroImage: '@/content/post/_images/2017-10-23-do-not-inject-test-data/bugs.jpg'
heroAlt: 'Two lady bugs on a green leaf '
noHero: false
tags:
  - test automation
  - developers
  - principles
  - culture
category: Q.Assistance
toc: true
---


## Overview

Executing a set of SQL updates in order to prepare test data can be harmful.

[Legacy systems](https://en.wikipedia.org/wiki/Legacy_system): "These systems can be hard to maintain, improve, and expand because there is a general lack of understanding of the system."

## Legacy projects
In a legacy, big messy project prevails the [Swiss cheese failure model.](https://whatsthepont.com/2015/08/03/the-james-reason-swiss-cheese-failure-model-in-300-seconds/) **In software development, the holes in the defence are the unknown concepts and the assumptions.** The unknowns of unknowns are too many and too big to be dismissed. The system is so large and untidy that no one really knows or have the documentation up to date to know how the system is actually working. Even worst is the situation where there are not any design documents or architectural guidelines. **In this situation, injecting updates to the DB as a context setup for exercising the code under test is going to be very counterproductive.**

In a legacy project where nothing is certainly known we are forced to make too many assumptions. Those assumptions are not engineering good practices, they are closer to art than science. The system is filled up with hacks, some of them surprisingly complicated and some of them astonishing useless. **In such real-world situation of legacy applications, it is very common to have the code highly coupled to the DB and even the same data.**

If all those invisible bad practices are spread everywhere throughout the system, and we prepare the DB by injecting clean simple and understandable "common sense" test data, it will not be realistic data, right?. **The test data won't match all the unknown tricks, workarounds and dirty "temporal" hacks of the code.** The business logic code is full of assumptions that our test data will not comply with. Let's say it this way, "test data will not follow the actual design".

Thus is it highly possible and easy to see now that we will end up adding more indirect bugs to the system than there actually are. Maybe our test pass, but we do not recognize what other parts of the system will be broken.

**The only effective way to efficiently test a legacy project is to train long-term expert manual testers which will learn all the tricks and hacks.** A.I still have a long time to go until it is ready to understand the legacy code.

At the same time of having manual business specialists validating the system. The team should start using Clean Code and Craftmanship best practices to refactor small modules, rewrite units of code covered with Unit tests and implement good layers of Integration, Components and System testing when possible. The team should focus on building tools, not just features.

To introduce automated testing for a legacy project the team would need to implement a good tested API to interact with the system. With those APIs better tools and automated scripts could be implemented to support the development team daily work. Also with those APIs, the QA engineers should be able to write better automated scripts to validate that the system behaves as expected by the stakeholders.

## Summary
In summary, reading data results from the database is not harmful. The problem starts when the data to be injected is assumed to be X, Y & Z just by reading the DB structure instead of injecting data by design. And By design means an automated and fully tested design, not just documentation in a Wiki.

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!