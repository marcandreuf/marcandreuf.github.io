---
title: Experiment-driven development
description: After years of practising in the test automation ecosystem, an axiom crystallized in my mind.
publishDate: 2016-10-26
updatedDate: 2024-09-14
heroImage: '@/content/post/_images/2016-10-26-experiment-driven-development/software-experiments.jpg'
heroAlt: 'Abstract water drop image.'
noHero: false
tags:
- coding
- estimations
- code quality
category: Q.Assistance
toc: true
---


## Overview

"The return of investment of a test automation framework is directly correlated to the quality of a solution before testing."

In other words, if the solution under test is properly implemented by applying good software practices, we are able to automate more tests and even with better test strategies. Sounds obvious, right? Then why so many teams get this point wrong? Why do developers not implement or even care about testable solutions?

## Where is software quality?

First, we have to dig into software development methodologies to find out software quality. This post comes from a personal epiphany while reading a great [article](http://www.codeproject.com/Articles/1130886/The-Software-Development-Process-Science-Engineeri?msg=5304985) by Marc Clifton. The key takeaway for me was how to apply [The Scientific method](https://en.wikipedia.org/wiki/Scientific_method) to the art of writing code.

Let's start by doing a reflection for a minute about the scientific method diagram provided by Wikipedia.

Please notice how the hypotheses step comes from any other development practices. Also, you can realise the half of the loop is about understanding and defining testable predictions. Good, let's continue our quality meditation.

In software development, the application of this method is realised in the form of agile methodologies like [Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) and [Behavior-driven development](https://en.wikipedia.org/wiki/Behavior-driven_development).

Then if the scientific method has been a positive revolution for the scientific world, why agile methodologies still dramatically fail for many teams? It is probably because the scientific core philosophy is missed or shadowed by the misconception quoted as "We write production code only, anything else is a waste of time!". In the scientific world, this quote would be something like "We produce valid theories only. Any other analysis is a waste of time!". Therefore, to get most of the scientific method in software development we need to work harder.

## What is productive work?

As pointed out in Marc Clifton's article, writing software is considered a creative art. Then wouldn't it be rather strange to see a painter to estimate three weeks in advance to use N number of drawing drafts, M hours of painting and X² toilet sessions in order to create the next masterpiece? Sounds silly? Well, this is what we do in software development planning and we still do not understand why our estimations consistently fail. We estimate 6.5 hours of productive time a day after eating and toilet time is discounted from the 8-hour work schedule. Thank god, some managers know we are human. Surprisingly, however, the actual productive time could be down to 1.5 hours per day. John Z. Somez supports this number and explains the misconception in section 4 "Productivity" of his brilliant book [*Soft Skills. The software developer's life manual*](https://www.manning.com/books/soft-skills)*.*

In the current accounted world we are forced, by a magic belief, to measure and quantify everything. It seems very difficult for us to move forward without counting. Well, civilization as we know it has evolved for about 6000 years without detailed accounting. Agile methodologies try to bring back that common sense of estimating by approximations rather than accounting hours in excel files. Did you notice how often those excel files change in order to try to grasp reality? With the core concept of the "Agile Manifest", estimations should be done by how much relative effort will be required, not how many hours.

## Code more and write less

Agile means lean and direct approach, not less work. "Please, do the freaking work!" This would be the very very lean resume of "[Do the Work by Steven Pressfield](http://www.goodreads.com/book/show/10645233-do-the-work)". **Software developers need time to focus on writing code, more draft code, more testing code, more learning code and non-production code in order to get the best quality production code**. There is no free meal. Without hard work, it is almost impossible to achieve good results. Here, hard work means doing all those things, which common people think is a waste of time. However, successful people know that it is necessary to do it diligently.

"I have not failed. I've just found 10,000 ways that won't work." -- Thomas A. Edison

Indeed, agile means write less documentation so that developers can spend more time writing non-productive code, understanding requirements and doing spikes. This is not a waste of time because the [Economies of scale](https://en.wikipedia.org/wiki/Economies_of_scale) principle will make programmers better and more efficient over time. However, writing documentation, especially when it is done in a quick, dirty and poor way that is usually done, is not helping anyone to improve their skills. Reading and writing good code should be enough as a technical documentation.

## Allow team members to be in the zone

Let's take a deeper look at this hard work within one of the agile methodologies called Scrum. Scrum defines the concept of doing refinement sessions, where all the team discuss one story at a time in order to clarify concepts and pull out "unknown unknowns". By applying the ideas stated above, we can forecast how to get a high-quality output from that meeting. The team should focus on talking about the issues and requirements with the goal to deliver a set of experiments (tests). This test suit is enough to verify that the issue will be fixed or the requirement implemented. No more technical documentation should be required. Instead, more time, a truly creative time, would be invested in order to find the best solution when people sit down and are [in the zone](http://dictionary.cambridge.org/dictionary/english/in-the-zone). Understanding the story is not the same as finding the solution! There would be multiple possible solutions for each story. All those solutions that pass the predefined set of experiments. In the next sprint, we will be able to expand or refine those experiments to improve the solution.


## Summary

The scientific method helped to improve science in the past. We should keep this philosophy present in our work because software development is experimenting with code. Only then does quality come as a result of hard work. Quality is not an objective by itself. It is not an achievable goal. It is not quantifiable. Quality is a consequence of our refined experimentation skills. With higher levels of quality, the verification tasks become seamlessly simple, more effective and of great value for the team.

In summary, **it is possible to get better quality results in software development. We just need to get back to the roots of the scientific method as a core philosophy for Agile methodologies.** We should remove any task that does not generate code in order to improve the performance of the team. If the company requires documentation to comply with regulations, let's have a professional writer in the team. If it is required to provide manual management data, let's have a professional secretary in the team. The same rule should apply to any other tasks which do not produce code. It is important to remember that software [architecture should be coded](http://www.codingthearchitecture.com/).  

----
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
