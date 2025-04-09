---
title: Integrating Google Sheets with Astro
description: A Simple Form Data Solution to learn and practice how to use Google Sheets as the backend for Astro web applications. For example to store simple forms data like contact forms or Call To Actions. 
publishDate: 2024-11-29
updatedDate: 2024-11-29
heroImage: '../../content/post/_images/2024-11-29-astro-google-sheets/documents-folder.jpg'
heroAlt: 'A photo of a person classifing documents into a paper documents folder.'
noHero: false
tags:
  - Astro
  - devops
  - automation
  - google-sheets
  - node.js
category: Tutorials
toc: true
---

# Integrating Google Sheets with Astro: A Simple Form Data Solution

## TLDR
- Learn how to connect Astro applications with Google Sheets API
- Implement a simple form that stores submissions in a Google Sheet
- Set up Google Cloud credentials and service accounts securely
- Use TypeScript for type-safe Google Sheets operations
- Github repo: https://github.com/marcandreuf/astro-google-sheet

## Overview
Storing form submissions or user data often requires setting up a complete backend database when building web applications. However, using Google Sheets as a lightweight database for more straightforward use cases or prototypes can be an elegant solution. [This repository](https://github.com/marcandreuf/astro-google-sheet) demonstrates integrating an Astro-based web application with Google Sheets API, allowing you to store and retrieve data directly from a spreadsheet.

## Understanding the Core Solution
[The repository](https://github.com/marcandreuf/astro-google-sheet) provides a streamlined implementation for connecting Astro with Google Sheets, focusing on two primary operations: appending new data and reading existing entries. Let's break down the key components and how they work together.

### Authentication Setup
The first crucial piece is the authentication mechanism. The code uses Google's service account credentials to authenticate requests:

```typescript
async function authenticate(): Promise<Auth.OAuth2Client> {
  const auth = new google.auth.GoogleAuth({
    keyFile: import.meta.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON as string,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return (await auth.getClient()) as Auth.OAuth2Client;
}
```

This function handles the authentication process using credentials stored in a JSON file. The path to this file is specified in your environment variables, keeping sensitive information secure and out of version control.

### Data Operations
The repository implements two primary operations:

1. **Appending Data**: The `appendData` function handles adding new entries to the sheet:
```typescript
async function appendData(
  auth: Auth.OAuth2Client,
  values: (string | number)[][]
): Promise<void> {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: import.meta.env.GOOGLE_SHEETS_ID as string,
      range: import.meta.env.WRITE_GOOGLE_SHEETS_RANGE as string,
      valueInputOption: "RAW",
      requestBody: { values },
    });
    console.log(`${result.data.updates?.updatedCells} cells updated.`);
  } catch (error) {
    console.error("Error appending data:", error);
  }
}
```

2. **Reading Data**: The `readData` function retrieves existing entries:
```typescript
async function readData(auth: Auth.OAuth2Client) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: import.meta.env.GOOGLE_SHEETS_ID as string,
    range: import.meta.env.READ_GOOGLE_SHEETS_RANGE as string,
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }
  return res;
}
```

### Form Implementation
The solution includes a simple form component that demonstrates both writing and reading operations:

- A POST handler processes form submissions and appends the data to the google sheet document
- The page loads existing entries and displays them in a list
- The form is intentionally minimal to focus on the Google Sheets integration

### Security Considerations
The implementation includes several security best practices:

1. Service account credentials are stored in environment variables
2. The `.auth` folder containing sensitive files is git-ignored
3. Scopes are explicitly defined to limit API access
4. Error handling is implemented for both reading and writing operations



## Setting it Up

To use this solution in your project, you'll need to:

1. Set up a Google Cloud Project and enable the Sheets API
2. Create a service account and download the json credentials file
3. Share your Google Sheet with the service account email
4. Configure environment variables with your sheet ID and ranges


The repository's README includes detailed setup instructions, making it easy to start your local instance ready for experimentation.


## Conclusion

This solution provides a practical approach to using Google Sheets as a simple database for Astro applications. This repo is a perfect setup for learning the basic steps to integrate an Astro web application with Google Sheets.

While only suitable for learning scenarios, this integration offers a quick and effective way to add data persistence to your Astro applications with minimal setup. 

------
Many thanks for reading, please leave a comment if you have any quality hint.

Keep on testing, better!
