---
title: 5 Side notes JAX London 2016
description: Quick notes from session 5 of JAX London 2016. Java Flight Recorder preseneted by Ola Westin from Oracle.
publishDate: 2016-12-23
updatedDate: 2024-09-19
heroImage: '../../content/post/_images/2016-12-23-jax-track-five/java-logo.jpg'
heroAlt: 'abstract ...'
noHero: false
tags:
  - JAVA
  - JAX London
category: Q.Assistance
toc: true
---

## Overview

[11th Oct -- 13:45 to 14:35  Java Flight Recorder -- Production Time Profiling On Demand](https://jaxlondon.com/session/java-flight-recorder-production-time-profiling-on-demand/) by [Ola Westin](https://jaxlondon.com/speaker/ola-westin/) From Oracle

## Notes

-   InfoQ [article](https://www.infoq.com/news/2016/10/Java-Flight-Recorder-Mission) about this session.
-   [Java flight recorder](https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm#JFRUH170): Java Flight Recorder (JFR) is a tool for collecting diagnostic and profiling data about a running Java application.
-   [Java mission control](http://download.oracle.com/technology/products/missioncontrol/updatesites/base/5.2.0/eclipse/): Oracle® Java Mission Control for Eclipse is a set of plug-ins for the Eclipse IDE designed to help develop, profile and diagnose applications running on the Oracle® Java HotSpot VM.
-   Key concepts:
    -   Configure durable events with thresholds levels to discard events within boundaries.
    -   Not tracking native calls yet.
    -   Configure continuous recording of the JVM with dump results on exit or on demand.
    -   Configure time-boxed recordings at a set time.
    -   With the tool [Jcmd](https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/tooldescr006.html) we can send commands to the JVM in order to control Java Flight Recordings, troubleshoot, and diagnose JVM and Java Applications.
    -   Using JMX it is possible to trigger recording sessions when thresholds are breached.
    -   Those tools can operate remotely from the JVM under test.

That was all for this session.

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
