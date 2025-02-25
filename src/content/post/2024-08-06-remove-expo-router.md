---
title: Remove Expo Router from Expo App
description: Solution to the incompatibility of the Coursera React Native Specialisation capstone project with the latest versions of the Expo framework.
publishDate: 2024-08-06
updatedDate: 2024-11-09
heroImage: '../../content/post/_images/2024-08-06-remove-expo-router/remove-expo-rotuer-post.png'
heroAlt: 'Ai generated. A person sitting in an office setup and working with computers on a desk.'
noHero: false
tags:
  - infrastructure
  - expo
  - android
  - react
category: Article
toc: true
---

## Overview

The issue originates from a discrepancy in the Coursera Capstone project for the React Native Specialisation course and the latest version of the Expo framework.

## The problem
In Module One, the lesson "Recap: React Native Project Set Up" instructs the students to create a React Expo app using the command Expo CLI command:

```bash
npx create-expo-app MyProject
```

This command creates a new app with the latest version of Expo. However, recent versions of Expo include the new navigation system with expo-router by default. This setup becomes an issue in Module Two, where the exercises require a project setup without an expo-router. This mismatch leads to confusion and technical difficulties for students as they progress through the capstone project.

## The solution
To address this issue, I **implemented a Pull Request [here](https://github.com/marcitqualab/react-native-coursera/pull/1/files)** to detail all the code changes to remove the expo-router and be able to follow up with the module Two exercises:


This Pull Request provides a fix for the issue by:
1. Removing the Expo Router plugin and its associated configurations
2. Implementing React Navigation to replace Expo Router
3. Modifying `app.json` to remove Expo Router-related configurations
4. Adding a new `App.js` file as the main entry point for the application
5. Updating project entry and dependencies in the package.json file


## Summary
By applying these changes, **students can align their projects with the requirements of the Module Two exercises, while starting from the app created in Module One.**

This solution not only resolves the immediate issue but also provides students with valuable experience in adapting to changes in development environments - a crucial skill in real-world software development.

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
