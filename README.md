# Video Conferencing Feature

Implemented the video conference feature for job matching portal using Agora SDK which has a good open source community and prioritizing the budget, its cheaper as compared to other sdk like chime

## Prerequisites

- Node.js LTS

## Quick Start

This section shows you how to prepare, build, and run the sample application.

### Creating an account 

#### Obtaining an app ID

To build and run the sample application, get an App ID:
1. Create a developer account at [agora.io](https://dashboard.agora.io/signin/). Once you finish the signup process, you will be redirected to the Dashboard.
2. Navigate in the Dashboard tree on the left to **Projects** > **Project List**.
3. Save the **App ID** from the Dashboard for later use.
4. Generate a temp **Access Token** (valid for 24 hours) from dashboard page with given channel name, save for later use. This channel name will be used for video conferences and multiple channel name can be created through the agora console. 

5. In the **.env** file, add your app id obtained by creating a new project on [agora.io](https://dashboard.agora.io/signin/)  to the "REACT_APP_AGORA_APP_ID" env variable and add your temporary token given you have chosen to restrict access for your project (VALID FOR 24 hrs)

    ```bash
    SKIP_PREFLIGHT_CHECK=true

    REACT_APP_AGORA_APP_ID=<#YOUR Agora.io APP ID#>
    REACT_APP_AGORA_APP_TOKEN=<#YOUR Agora.io Temp Token#>
    REACT_APP_AGORA_LOG=true
    ```

### Installing The Required dependencies


1. Using the Terminal app, enter the `install` command in your project directory. This command installs libraries that are required to run the sample application. This will create a "node_modules" folder having all the required dependencies in your project directory
    ``` bash
    # install dependencies
    npm install
    ```
2. Start the application by entering the `run dev` or `run build` command.
    The `run dev` command is for development purposes.
    ``` bash
    # serve with hot reload at localhost:8080
    npm run dev
    ```
    The `run build` command is for production purposes.
    ``` bash
    # build for production with minification
    npm run build
    ```
3. Your default browser should open and display the sample application.
    **Note:** In some cases, you may need to open a browser and enter `http://localhost:3000` as the URL.


## External Help

- For any potential issues or general FAQ, take a look at [FAQ](https://docs.agora.io/en/faq)
- You can find full API documentation at [Document Center](https://docs.agora.io/en/)


## License

The MIT License (MIT)
