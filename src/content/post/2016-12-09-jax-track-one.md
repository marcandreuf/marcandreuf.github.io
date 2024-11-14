---
title: 1 Side notes JAX London 2016
description: Last October I had the great chance to attend to JAX London Conference 2016. I will publish a new series of schematic articles with all the notes taken during the sessions.
publishDate: 2016-12-09
updatedDate: 2024-09-15
heroImage: '../../content/post/_images/2016-12-09-jax-track-one/distributed-abstract.jpg'
heroAlt: 'abstract squared 3d buttons on a white surface'
noHero: false
tags:
  - architecture
  - distributed
  - JAX London
  - Microservices
category: Q.Assistance
toc: true
---


## Overview

Last October I had the great chance to attend to JAX London Conference 2016. I will publish a new series of schematic articles with all the notes taken during the sessions. The idea for this series is to simply present a list of links, main ideas and short notes that I believe summarise the content of each session. These notes are just the basic reference from where we could expand our investigations and discussions. Please feel free to add your comments below and I promise you to update the notes with full credits to any contributor.

## Sources
First of all, I have to reference the [JaxCenter](https://jaxenter.com) as the main publisher of the conference. Specifically, the following link is a good summary of the key insights of the conference.

**[10 software development insights from JAX London 2016 [VIDEO]](https://jaxenter.com/10-software-development-insights-from-the-jax-london-video-129578.html)**

## Notes for the 10th October 2016:

### 09:00 -- 17:00 [Developing microservices  Chris Richardson, Chris Richardson Consulting, Inc](https://jaxlondon.com/session/developing-microservices/)

-   Most of the content of the workshop comes from articles in the [Microservices.io,](http://microservices.io) the website with top content about Micro-service architecture patterns and best practices.
-   The key concept to approach Micro-services architectures with success is to balance out "organization + process + architecture" in order to support distributed solutions philosophy. This idea is expanded in this [article](https://blog.eventuate.io/2016/06/02/successful-software-development-organization-process-architecture-gluecon/).

> "Successful software development requires the right organizational structure, development processes, and software architecture."

### Books & articles referenced:

-   Mythical Man-Month, The: Essays on Software Engineering, Anniversary Edition.  Brooks Frederick
-   The Art of Scalability: Scalable Web Architecture, Processes, and Organizations for the Modern Enterprise. Martin L. Abbott, Michael T. Fisher
-   Martin Fowler Micro-services [article](http://www.martinfowler.com/articles/microservices.html).
-   Examples of Micro-services architectures:
    -   <http://techblog.netflix.com/>
    -   <http://highscalability.com/amazon-architecture>
    -   <http://www.addsimplicity.com/downloads/eBaySDForum2006-11-29.pdf>
    -   <http://bit.ly/msexample_soundcloud>
    -   <http://bit.ly/msexample_yelp>
    -   <http://bit.ly/msexample_uber>
    -   <http://bit.ly/msexample_capitalone>

### Drawbacks:

Using Micro-services architecture is not a free lunch. It is hard and all the drawbacks have to be properly evaluated by the hole team before implementing.

-   Increase in complexity due to dealing with new issues to solve like interprocess communication, partial failure against services not ready, private data per each micro-service which requires event-driven architecture.
-   Testing complexity for dist services requires more sophisticated test strategies.
-   System operations get more complex in order to deploy solutions.
-   There are powerful tools, PAAS, etc..Those require considerable learning curves. It may be required careful coordination across services for some features. And some other risks like high latency issues.

That was all for this session.

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!