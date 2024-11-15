---
title: 9 Side notes JAX London 2016
description: Quick notes from session 9 of JAX London 2016. Four Distributed Systems Reference Architectures preseneted by Tim Berglund.
publishDate: 2016-12-30
updatedDate: 2024-09-23
heroImage: '../../content/post/_images/2016-12-30-jax-track-nine/distributrd-system.jpg'
heroAlt: 'A woman sitting on the floor with her laptop and with books around her and a library shelf behind.'
noHero: false
tags:
  - JAVA
  - JAX London
  - developers
  - architecture
  - distributed
  - streaming
category: Q.Assistance
toc: true
---


## Overview

Session: [12th Oct -- 12:00 to 12:50  Four Distributed Systems Reference Architectures](https://jaxlondon.com/session/four-distributed-systems-reference-architectures/) by [**Tim Berglund**](http://timberglund.com/), DataStax

## Notes
-   Presentation s[lides.](http://cdn.oreillystatic.com/en/assets/1/event/164/Four%20distributed%20systems%20reference%20architectures%20Presentation.pdf)
-   Distributed systems characteristics:
    -   The computers operate concurrently
    -   The computers fail independently
    -   The computers do not share a global clock
-   **Sharding the architecture is ok, but sharding the DB is KO**
-   Bounded (batch) vs Unbounded (streaming)
    -   [Apache beam with Frances Perry](http://softwareengineeringdaily.com/2016/08/19/apache-beam-with-frances-perry/): Unbounded data streaming architectures podcast.
-   Streaming architectures:
    -   [Apache Beam](http://beam.incubator.apache.org/): Apache Beam is an open source, a unified programming model that you can use to create a data processing pipeline.
    -   [Apache Flink](https://flink.apache.org/): Flink's core is a streaming data flow engine that provides data distribution, communication, and fault tolerance for distributed computations over data streams.
    -   [Apache Storm](http://storm.apache.org/): Apache Storm is a free and open source distributed real-time computation system
    -   The future of streaming architectures: FAAS. Function as a Service. Extreme microservices.
    -   [Serverless.com](https://serverless.com): Build applications comprised of microservices that run in response to events.
-   And much more details into [Academy Datastax](https://academy.datastax.com)

That was all for this session. 

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
