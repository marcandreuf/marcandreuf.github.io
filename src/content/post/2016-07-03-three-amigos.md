---
title: "The three QA amigos: SDTs, AEs and the VBEs"
description: A usual misunderstanding among many teams is to regard testing as one team without any specialization. Moreover, the biggest mistake that I have seen is to give the same job title to all "testers" regardless their skills and contributions.
publishDate: 2016-07-03
updatedDate: 2024-09-11
heroImage: '@/content/post/_images/2016-07-03-three-amigos/twoSets.png'
heroAlt: 'A diagram of two intersecting sets with SDETs on the left, business experts on the right and Test Automation in the intersecting area.'
noHero: false
tags:
  - testing
  - software quality
  - test automation
  - test framework
  - best practices
  - QA management
category: Q.Assistance
toc: true
---

## Overview

In the previous [post](2016-06-15-sqahoax) I discussed why we need Quality & Assurance (QA) experts instead of just Developers (DEVs) with QA background. This is a follow-up post where we will zoom into the details of the QA team member specializations. The QA team composition has the main goal to leverage the power of an efficient test automation framework, which should be constantly evolving and reporting valuable information about the project.

A usual misunderstanding among many teams is to regard testing as one team without any specialization. Moreover, the biggest mistake that I have seen is to give the same job title to all "testers" regardless their skills and contributions.

Without **S**pecific tasks, there is no **M**otivation to make **A**chievable and **R**elevant work in a **T**ime-bound manner. This was defined long time ago by the SMART criteria commonly attributed to Peter Drucker's [management by objectives](https://en.wikipedia.org/wiki/Management_by_objectives) concept. ([SMART criteria](https://en.wikipedia.org/wiki/SMART_criteria))


## The three amigos

So then how do we define specialisations? How should the QA experts collaborate? Well, we could just apply the ancestry principle of [divide and conquer](https://en.wikipedia.org/wiki/Divide_and_conquer). It is a natural condition that individuals feel more comfortable working in a small group with a well-defined specialization for a defined period of time. Occasional cross-functional collaborations are at the same time healthy and important to avoid knowledge stagnation.

Here, I would suggest the three types of QA roles which can maximise the testing performance.

On the left side of the spectrum, we have the Software Developers in Test (SDTs / SWEITS) which will work closely with the more technically advanced resources in order to build a Test Automated Framework (TAF). This TAF will have the necessary development infrastructure like a continuous deployment workflow. The main goal for the SDT role is to abstract all the complexities of the technology in order to enable the automation testing strategies. A key function will be to provide technical support to the rest of the QA team.

On the right side of the spectrum, there are the Validation Business Experts (VBEs) who are doing manual test explorations and logic validations. They provide user feedback and potential user support. These experts do not require a real technical IT development background and they focus exclusively on domain expertise verification. These are the advocates of the final product or service provided to the customers.

In the middle, the overlayed area is the Automation Experts. This role has a basic IT technical background in order to write automated test scripts using the Test Automation Framework (TAF) implemented by the SDTs. Thus, it is critical that the TAF provided is able to abstract all the high-level technical details and hands on a much-simplified layer at least one order of magnitude down in complexity, preferably much more. A very good way to achieve this simplification effort is to implement a test [Domain Specific Language (DSL)](http://martinfowler.com/dsl.html) layer. This would allow the AEs to quickly write and maintain all the suits of automated test cases just by learning the DSL instead of all the complexities of software development. The DSL learning curve is much lower because the AEs are familiar with core concepts of the business logic, thus they are familiar with the meanings and language flow.

This layout of roles should not be in silos. Instead, collaboration and freedom should be the norm in order to move from one side of the spectrum to the other, as people feel comfortable and capable to do the job. For example, an AE could implement new features or fix the TAF core solution if the technical skills are sufficient to perform the task. Or an SDT could and should do exploratory testing at a regular basis in order to get a better knowledge of the business domain which in turns will help a lot when expanding the scope of the TAF's Domain Specific Language.


## Summary

**Those three specializations of QA roles are the most effective way to build a Test Automation team that perfectly covers the main two pillars of automated testing.** The first one is to have a high-quality technical solution for testing and the other one is to make actual validation of the software under test. Test Automation does not directly transform into better Software Quality without the right set of roles taking care of running the show effectively.  

----
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
