---
title: 6 Side notes JAX London 2016
description: Quick notes from session 6 of JAX London 2016. Event-driven Microservices preseneted by Jeremy Deane.
publishDate: 2016-12-27
updatedDate: 2024-09-20
heroImage: '@/content/post/_images/2016-12-27-jax-track-six/software-events.jpg'
heroAlt: 'abstract ...'
noHero: false
tags:
  - JAVA
  - architecture
  - Microservices
  - JAX London
  - events
category: Q.Assistance
toc: true
---

## Overview

Session: [11th Oct -- 15:15 to 16:05  Event-driven Microservices](https://jaxlondon.com/session/event-driven-microservices/) by [Jeremy Deane](https://www.linkedin.com/in/jdeane), Liberty Mutual


## Notes
-   [Presentation slides](http://www.slideshare.net/jtdeane/eventdriven-microservices)
-   [Demo code](https://github.com/jtdeane/event-driven-microservices)

### Key concepts:

-   Events happen all the time and there are different kinds of events.
-   We look for actionable events.
-   Messages are events.
-   [Micro-services is an architectural style](http://www.martinfowler.com/articles/microservices.html).
-   Micro-services allow for good scalable systems, but at the cost of complex delivery and backward maintainability.
-   [Do not refactor and implement new features at the same time](https://www.electricmonk.nl/log/2005/01/03/software-development-lesson-don-t-refactor-and-implement/).
-   Avoid single point of failure. One service per JVM. One Service discovery, Active MQ, A.Camel, ... per container.
-   Add id/tokens on each message/event as a technique to log tracking the event's route.

### Tools:

-   <http://akka.io/>  «resilient elastic distributed real-time transaction processing»
-   [Active MQ](http://activemq.apache.org/download.html): Apache Active MQ is an open source message broker written in Java together with a full Java Message Service (JMS) client.
-   [Apache Camel](http://camel.apache.org/): Apache Camel ™ is a versatile open-source integration framework based on known Enterprise Integration Patterns.
-   [Camel testing](http://camel.apache.org/testing.html) has good integration with main Java testing tools
-   As a starting point for Apache Camel route, processing use [Camel Spring Boot](http://camel.apache.org/spring-boot.html)

That was all for this session. 

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!