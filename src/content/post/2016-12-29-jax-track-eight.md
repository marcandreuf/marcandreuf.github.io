---
title: 8 Side notes JAX London 2016
description: Quick notes from session 8 of JAX London 2016. Cynefin for Developers preseneted by Liz Keogh.
publishDate: 2016-12-29
updatedDate: 2024-09-22
heroImage: '@/content/post/_images/2016-12-29-jax-track-eight/complex-head.jpg'
heroAlt: 'An abstract human head made of thick strings of various colors. The strings spand to the right in strainght lines from within the head like shape.'
noHero: false
tags:
  - JAVA
  - JAX London
  - developers
  - cynefin
  - complexity
category: Q.Assistance
toc: true
---


## Overview

Session: [12th Oct -- 10:30 to 11:20   Cynefin for Developers](https://jaxlondon.com/session/cynefin-for-developers/) [Liz Keogh](https://lizkeogh.com/about/), Consultant

## Notes

-   Liz keogh [blog](https://lizkeogh.com/)
-   [Cynefin post](https://lizkeogh.com/category/cynefin/)
-   [Cynefin for Devs post](https://lizkeogh.com/2012/03/11/cynefin-for-devs/)
-   [The cynefin framework](https://en.wikipedia.org/wiki/Cynefin_Framework) provides a typology of contexts that guide what sort of explanations or solutions for a given task might apply.
-   The framework is a set of guidelines to avoid chaos at work.
-   We want to answer the question

> "What will you be able to do that you can not do right now?"

-   Main ideas are resumed in the book [Waltzing With Bears: Managing Risk on Software Projects](https://www.amazon.com/Waltzing-Bears-Managing-Software-Projects/dp/0932633609)
-   Five domains of innovation cycle:
    -   **1 Obvious: cause and effect is direct**
        -   There are best practices defined to perform a task.
    -   **2 Complicated: cause and effect requires analysis**
        -   There are good practices for analysis to predict the outcome.
    -   **3 Complex: cause and effect can only be perceived in retrospect**
        -   Required a safe to fail environment.
        -   There are constantly emergent practices for analysis.
    -   **4 Chaotic: cause and effect at systems level**
        -   Quick action specific response is required.
        -   Reactive environment.
    -   **5 Disorder: not knowing what type of causality exists**
        -   Nobody really knows what is going on.
        -   Example: Estimate time and money for something never done before

-   Exist a tendency for projects to get complacency and fall from complex domain to a chaotic domain.
-   The task is to estimate complexity level and determine what domain is the project. Then take action according to the domain status.
    -   Example: in domain 1 or 2 we do not over analyse, we just take action.
-   Focus on the new things. "**Problems will come most likely from the new stuff."**
-   CThe common vision to focus on value: "[Hunt the value](http://agileprague.com/agile-business-analysis.htm)" Money of primary stakeholders.
-   Careful to break things down. We could get to the point to be unable to keep track of small things.
-   **The Agile method differentiation concept is to allow to discover unknown unknowns.**
-   [Escape Velocity: Free Your Company's Future from the Pull of the Past](https://www.amazon.com/Escape-Velocity-Free-Companys-Future/dp/0062040898). A guide to free your company's future from its past.
-   Estimate complexity with the [5 levels of ignorance](https://lizkeogh.com/2013/07/21/estimating-complexity/):
    -   Level 5 is "complete ignorance" and 1 is "everything is known".
    -   Do not automate stories in levels 4th and 5th, do spikes and understand first by trying / testing. (Create failing test cases)
    -   Convert 4th and 5th stories into 3th, 2on and 1st level stories.
    -   **Write "spiky code" before production code in levels 4th and 5th**. In lower levels we write production code.
    -   For stories in 1st level test manually just once. Do not BDD obvious stories, only create BDD test cases for complicated and maybe some complex stories. **Do not plan for obvious stories, just do it.**
    -   New things continuously coming is part of the game. **Reduce problems to fit within the boundaries of influence of the team**. Break dependencies outside of the team.
    -   **Legacy projects are in the 4th and 5th levels of ignorance.**

> "Teams can spike, learn from the spike, then take their learning into more stable production code later (Dan North calls this "[Spike and Stabilize](http://dannorth.net/2011/01/15/on-craftsmanship/)"). Risk gets addressed earlier in a project, rather than later. Fantastic!" [Liz Keogh](https://lizkeogh.com/about/)

That was all for this session.

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!