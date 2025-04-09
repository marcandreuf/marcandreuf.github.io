---
title: Software QA Strategy?
description: Soon after, when the project is engaged and there is no room for discussions, we realise that what they understood for "strategy" is some kind of Apes plan proper of the mythical film Rise of the Planet of the Apes.
publishDate: 2017-01-30
updatedDate: 2024-09-27
heroImage: '@/content/post/_images/2017-01-31-software-qa-strategy/strategy.jpg'
heroAlt: 'Two persons discussing about some content on a book.'
noHero: false
tags:
  - test automation
  - failure
  - strategy
category: Q.Assistance
toc: true
---


## Overview

When some management teams announce "We defined a new QA strategy!", our natural reaction could be "Oh really? Why you ?"

Soon after, when the project is engaged and there is no room for discussions, we realise that what they understood for "strategy" is some kind of Apes plan proper of the mythical film ["Rise of the Planet of the Apes"](https://en.wikipedia.org/wiki/Rise_of_the_Planet_of_the_Apes).

So next time they present a "New strategy" we shall be a little bit more cautious. To that end, we will review the concept of Software Quality and Assurance (QA) strategy. We will be then more prepared to counter-attack the apes.

## The strategic issues
We should start doing a quick review of some word definitions. So let's see what is the meaning of the word "strategy"? The [official definition](http://dictionary.cambridge.org/dictionary/english/strategy) by Cambridge Dictionary is as follows:

"a detailed plan for achieving success in situations such as war, politics, business, industry, or sport, or the skill of planning for such situations"

Therefore, by applying this definition to the software QA situation, we could conclude, after some deliberations, that the strategy definition in this situation would be somehow similar to:

"A detailed plan for achieving success in software development or the skill of planning for such successful software development"

The key word in this second definition is "**successful**". In software engineering, we could quickly agree on a [simple definition](http://dictionary.cambridge.org/dictionary/english/success) of success which is "achieving the initially wanted or hoped customer expectations". In a more specific definition, we could admit something along the lines "the team's outcome needs to match at the end of the development process, with the initial stakeholders' expectations".

Hence, **the key item for success in any QA strategy is to have a clear vision of the stakeholder's requirements**. This is why Agile methodologies fervently recommend having the [three amigos meeting](https://youtu.be/NWer5DjTgvM) in the early steps of the development process. In this meeting, the stakeholders, the developers and the QA team refine the stories **TOGETHER**. Refine means that the three amigos talk about the solution and make sure to have a common and clear understanding of the subject without assumptions or vague definitions.

All right then, in regards to software QA strategies, we will question if there would be a user's request like "I as a user A want X number of issues at any point in time". Well, it seems a strange request, isn't it?

ALL RIGHT, GOT IT! **A software QA strategy could NEVER be successful if it is mainly focused on counting the number of issues, bugs or failing test cases of our solution.**

The quick answer, for the impatient reader, is that the QA strategy should be embedded into the development strategy. The following explanation for the avid reader is based on the concept known as [**SHIFT LEFT**](https://techbeacon.com/were-all-testers-now-5-steps-get-ready-shift-left-automation) strategy.

We are going to use a simple and commonly overused parallelism in software engineering: the typical construction building analogy. Yes, it is a controversial analogy that falls apart if taken too far. For the purpose of comparing strategies, we believe that this analogy still brings a lot of good resemblances.

Any good project begins with the three amigos meeting in order to define the shape and structure of the solution. Will it be a farm, an office building or a pet's house? The team gets a clean and well-defined idea of the final solution. At least an initial overview should be defined. The three amigos agree on those basic components of the construction that will hardly change over time. Here we are not yet talking about architecture, it is just a basic agreement of those hard assets like the land required, the orientation of the building or the basic functional features of the building.

Once a team has an initial vision of what it is required to build, QA Engineers should start the next face of the construction. By QA Engineers we refer to the lead developers and engineers responsible for building that initial structure.

The main goal in this step of the project would be to validate that the three amigos happy ideas are sounded. This team of experts work with the common aim to verify that the building is consistent and comply with all regulations. A testing strategy is defined in order to be able to find deviations from the original ideas. The construction fields have to be safe. The builders should have the proper tools set and so on.

**The QA engineers BUILD UP the technical part of the strategy while working on the battlefield**. With hands on the solutions. The technical part of the strategy cannot and should not be defined from an abstract management level. The QA engineers team should put their "builder hat" and work on the field finding the actual issues and practical solutions to build up an initial structure with the test harness appropriate for the project. The team prepares the land and builds up the initial structure with a safe scaffolding after the three amigos meeting has defined the basic requirements of the project.

At a practical level, the QA engineers team should write a set of failing test cases from unit to acceptance test level. Also, the team should build an initial and simple working script for an automatic build. The continuous delivery flow should be also completed in this step, even though it is initiated with the minimum steps. All functional and nonfunctional features of the solution should be covered by the test harness. This step collects all the requirements as a set of test suites. The team do not work on writing test plans, nor requirements documentation, they just focus on writing a test suite to be executed manually and/or automatically.


## The solution
In summary, the QA strategy for this face would be just defined by these two actions:

1\. Write failing test cases, of the required type, to cover newly discovered bugs at any point in time, from the first line of code all the way down to maintenance face of the project.\
2\. Write unit, integration and acceptance test cases for new features. Define all the required details in clear BDD and TDD style.

Lead developers implement the initial coding architecture to shape the solution. With sounded foundations and coded architectural services to hold the solution in place. They implement the end to end slides of the project structure in order to validate especially all those new technical requirements never implemented before. This team should cover all this initial architecture with a wide and detailed test suite. This test suite will become the foundations for the well-known [testing pyramid](https://www.joecolantonio.com/2015/12/09/why-the-testing-pyramid-is-misleading-think-scales/).

Once that initial structure and scaffolding of the building are in place we are able then to invite the development team to scale the solution up. In this face, the developers just focus on implementing failing test cases. Make those test cases pass will bring joy to the team and the progress can be monitored and estimated based on how many test cases have been or have to be passed yet.

**The development team work with the simple aim to pass all the TCs defined in the test suite.** The team implements and prepares all the required mockups and stubs to keep the test suite running as fast as possible. In this fashion, the development team can realise about bad decisions made earlier just by watching the evolution of the test results over time.

The team would be able then to adjust and redefine TCs in order to impact the project's progress. The team is able to safely grow the solution with certainty and with constant verification that the original ideas (the structure of the building) are within the safe range of possibilities and complies with the initial plans of the building. If the original TCs start failing it means that the architecture needs to be reviewed or the code fixed. Developers focus on implementing what has been requested and nothing else. The programmers focus efforts to pass failing test cases while doing refactoring when needed and evolving the architecture within the allowed boundaries.

As a result, team's motivation rises. Everyone is comfortable doing what they love. The three amigos write down the requirements in clear text and clean code. Lead developers put the basic structure in place. Developers implement code with the confidence of doing the right thing. As a result, stakeholders get what they originally wanted, even with all the last minute minor updates that disrupt the development team with joy.

What about estimations, planning and delivery? **Simple! DO NOT OVERESTIMATE OR PLAN, JUST DELIVER!**

In agile methodologies, the development team should make soft plans with potential dates to deploy. Then the team review the plan every week, which is different from delaying the plan one week at a time. Product owners can agree to only add the test cases that cover the required features per sprint. The team can then release the first successful automatic build that achieves the QA definition of done. The definition of done is a key part of the embedded QA strategy. For example, as one of the conditions of the definition of done could be that the test results achieve let's say 95% test cases pass, of which 0% are crítical, 2% medium and 3% low priority. If the solution has 80% of stability then the team only have to remove features from the sprint in order to release earlier. Just like a vehicle, while driving fast if the vehicle gets unstable it is recommended to reduce SPEED in order to reduce RISK and thus regain control.


## Conclusion

**In conclusion, a better and more efficient QA strategy consists of shifting left all the QA activities.** QA tasks should start at the very beginning of the development process by being embedded into the same process. This means that the QA strategy is embedded in the development strategy by providing, in advanced, clear and practical test case definitions. Without test suites defined in advance, the whole organisation falls down into a chaotic work style where no one knows certainly what is going on. The test suite, NOT THE TEST PLAN nor any other higher level document, can actually work as the road-map of the project. The test suite is the only tangible piece of work that developers can rely on when moving forward the project in order to know what is the actual progress of the project. **Once developers are in control of the code, any managerial body will also know the actual status of the project**. The opposite is not working at all, development team gets completely lost if plans are done from the stars and no one in the team knows the science to interpret those always changing constellations. Hence, shifting left cures all those bad QA strategy pains with relief and directly attacking the root cause of the issues.


------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!