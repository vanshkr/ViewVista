# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Issues faced :

1. Issue:
   During the account creation process, an issue arose where the email validation failed, despite valid data being present in the console. Further investigation in the headers tab revealed that the payload data was disordered.

   Resolution Steps :
   a. Identified disordered payload data causing email validation issues during account creation.
   b. Investigated and found the createUserAccount function responsible for receiving data.
   c. Discovered the need to adjust the function to receive the email parameter first, followed by additional parameters.
   d. Restructured the createUserAccount function to maintain the desired order of data.
   e. After the adjustment, the issue was successfully resolved, and email validation worked as expected.
   f. Recommend ensuring that the createUserAccount function is consistently structured to receive email as the first parameter for future reliability.

2. Issue:
   Encountering a 429 error (rate limit exceeded) while using Appwrite.

   Resolution Steps :
   a. Refered Appwrite documentation to find information about rate limits and their expiration.
   b. Examine the rate limit policies outlined in the Appwrite documentation to understand the limitations and conditions imposed.
