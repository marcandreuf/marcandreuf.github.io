---
title: 3 Side notes JAX London 2016
description: Quick notes from session 2 of JAX London 2016. Developing microservices with aggregates preseneted by By Chirs Richardson.
publishDate: 2016-12-16
updatedDate: 2024-09-17
heroImage: '../../content/post/_images/2016-12-16-jax-track-three/cube-aggregates.jpg'
heroAlt: 'a person with a laptop siting on a sofa with java and design books on his left side, the image taken from above the person.'
noHero: false
tags:
  - aggregates
  - cqrs
  - JAX London
  - event sourcing
  - architecture
category: Q.Assistance
toc: true
---

## Overview

Session link [11th Oct -- 10:00 to 10:50  Developing microservices with aggregates](https://jaxlondon.com/session/developing-microservices-with-aggregates/) [By Chirs Richardson](http://chrisrichardson.net/about.html)

## Notes

-   Jax Center articles about this session:
    -   [Developing applications with a micro-service architecture](https://jaxenter.com/developing-applications-with-a-micro-service-architecture-116926.html)
    -   [Domain-driven Design and micro-services](https://jaxenter.com/domain-driven-design-and-microservices-116672.html)
-   The service boundary enforces modularization:

> "[2 phase commit](https://en.wikipedia.org/wiki/Two-phase_commit_protocol) is not an option in Micro-service solutions."

-   An aggregate of micro-services is a cluster of objects treated like a unit.
    -   An Aggregate has a root service and it is treated like one module of the domain model.
-   Aggregate rules:
    -   Reference other aggregates via identity (primary key), instead of via object reference.
    -   One command by one aggregate. One transaction is contained within a service/aggregate.
    -   Atomic actions happen inside one aggregate/service.
-   Consistency across aggregates is achieved via an Event Driven Architecture:
    -   Publish events when things happen.
    -   The events trigger the next step.
    -   Multi-step workflows.
-   [Event sourcing](http://martinfowler.com/eaaDev/EventSourcing.html) is event-centric persistence:
    -   Events become the first class citizens.
    -   Store events in persistence layer as a long history.
    -   Fold / Reduce the list of events to get the current state.
    -   Command Query Responsibility Segregation ([CQRS)](http://martinfowler.com/bliki/CQRS.html) used to maintain views for querying.
    -   Audit log by definition of the solution.
-   Event store solution <http://eventuate.io/>
    -   Documentation on event sourcing and Micro-services
    -   Documented examples [here](http://eventuate.io/exampleapps.html).
-   **Micro-services are not easy**! It is fervently advised to review all the drawbacks of this new concept:
    -   Required to rewrite the application.
    -   Required considerable learning curve.
    -   Events evolve and change business requirements. Then a version system to work with legacy events will be required.
    -   Querying is challenging because it is required to maintain views for each kind of query by using CQRS.

That was all for this session. 

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
