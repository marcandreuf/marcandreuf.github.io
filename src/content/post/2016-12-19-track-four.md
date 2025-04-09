---
title: 4 Side notes JAX London 2016
description: Quick notes from session 4 of JAX London 2016. Architectural Resiliency preseneted by Jeremy Deane.
publishDate: 2016-12-19
updatedDate: 2024-09-18
heroImage: '@/content/post/_images/2016-12-19-track-four/architecture-resilience.jpg'
heroAlt: 'abstract architecture of curbed columns'
noHero: false
tags:
  - architecture
  - resilience
  - JAX London
  - culture
category: Q.Assistance
toc: true
---

## Overview

Session: [11th Oct -- 11:30 to 12:20  Architectural Resiliency](https://jaxlondon.com/session/architectural-resiliency/)

## Notes
-   Jeremy Deane has quite a lot of content on line about this subject.
    -   [Why we need Resilient Software Design](https://jaxenter.com/need-resilient-software-design-115055.html)
    -   [What happens when you blame a developer for a problem?](https://jaxenter.com/what-happens-when-you-blame-a-developer-for-a-problem-121503.html)
    -   [Event-driven Microservices slides](http://www.slideshare.net/jtdeane/eventdriven-microservices)
    -   [Architectural Resiliency](https://prezi.com/07avshsn5waj/architectural-resiliency/)

-   Accumulating [innovation debt](https://blog.pbell.com/2013/03/19/innovation-debt/):

> "Innovation debt is the cost that companies incur when they don't invest in their developers"

-   Architecture & design ideas for resilience:
    -   Model for threads and failure. "What will we do if ... ?"
    -   Monitor and measure the results to track what is the actual improvement or deterioration.
        -   Meantime to Failure MTTF
        -   Meantime to Recovery MTTR
        -   Meantime to Deploy MTTD
        -   Meantime between failures MTBF
    -   Measures do not need to be exact numbers. We are looking for reference points or tendencies.
-   Model stateless & asynchronous micro-services
-   Do not use distributed transactions
-   Implement with [CWhatontinuous Delivery](http://martinfowler.com/books/continuousDelivery.html)
-   Have owners for each micro-service.
-   **Do not blame but motivate people to be accountable for each micro-service.**
-   Keep the service up to date with continuous improvement. Apply [Kanban](https://en.wikipedia.org/wiki/Kanban_(development)) principles.
-   Keep all logging of all services and applications with the same standard format. It reduces time to analyse failures.
-   Define recoverability behaviour for:
    -   [Circuit breaker](http://martinfowler.com/bliki/CircuitBreaker.html)
    -   [Throttle](http://camel.apache.org/throttler.html)
    -   Negative testing scenarios
    -   Penetration testing
    -   Chaos testing: [Simian Army](http://techblog.netflix.com/2011/07/netflix-simian-army.html)
    -   Document system external dependencies
    -   Practice disaster recovery scenarios (get in shape)
    -   Implement test harnesses like
-   The thing to do more:
    -   For the security features follow the Open Web Application Security Project [OWASP](https://www.owasp.org/index.php/Main_Page).
    -   It is paramount to  "Validate inputs and standardized outputs"
-   Micro-services with event sourcing and Command Query Responsibility Segregation CQRS is a much more resilience system.
    -   Follow the [12-factor method](https://12factor.net/) to build software-as-a-service apps.
-   If you are in the middle of taking a big decision about going or not to implement micro-service architecture,  it would help to read this good article. [Manage opportunity costs instead of risks](http://jeremiekubicek.com/making-big-decisions-the-difference-between-risk-and-opportunity-cost/)
-   Overall, to succeed working in a micro-services architecture it is **required a Blameless culture** in the terms of [Etsy's Winning Secret: Don't Play The Blame Game](http://www.businessinsider.com/etsy-chad-dickerson-blameless-post-mortem-2012-5)!

That was all for this session. 

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
