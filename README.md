# Event Listing Mini APP

## Overview

This is a mini-application that lists events and shows detailed information for each event.

The application is using a custom WordPress plugin to manage event data, and Next.js for the front-end to display the events.

## Developed With

- [Visual Studio Code](https://code.visualstudio.com/)
- [Wordpress](https://wordpress.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Xampp](https://www.apachefriends.org/)

## Getting Started

### Back-end (Wordpress) Installation

---

1.  Prerequisites

    You can set up a local server environment to run PHP and MySQL services on a local machine.

    - [Xampp](https://www.apachefriends.org/)
    - [Wamp](https://www.wampserver.com/)
    - [Mamp](https://www.mamp.info/en/downloads/)
    - [LAMP](https://ubuntu.com/server/docs/lamp-applications)

2.  Database Configuration

    Log in to the MySQL server using a tool like phpMyAdmin, Navicat or the MySQL command.

    Create a new database for my WordPress installation.

    Choose a name for a database (e.g. "wp_events").

    ![event lists database](https://github.com/unicorn-talent/event-listing/assets/84963788/5b323b61-90a5-4d3a-a3b5-8dad154bf264)

3.  Wordpress Configuration

    Download WordPress project from [https://wordpress.org/download/](https://wordpress.org/download/).

    Run WordPress project by Apache service.
    [http://localhost/wordpress/wp-admin/setup-config.php](http://localhost/wordpress/wp-admin/setup-config.php)
    ![wordpress start](https://github.com/unicorn-talent/event-listing/assets/84963788/084d4dd0-9c4d-4f57-a89d-604744956dfb)
    ![image](https://github.com/unicorn-talent/event-listing/assets/84963788/dd9c1e4e-6d22-403b-a8be-4802f2485c8d)

    Configure WordPress installation as needed (e.g., database setup, permalinks).
    ![config database](https://github.com/unicorn-talent/event-listing/assets/84963788/e4010d43-a71c-407e-a170-76c285a68cc2)
    ![config site](https://github.com/unicorn-talent/event-listing/assets/84963788/00689b96-8fbd-475c-83c6-5aae887cedc5)

4.  Upload Customize Plugin

    Log in to WordPress website's admin dashboard. [http://localhost/wordpress/wp-admin/](http://localhost/wordpress/wp-admin/).

    Navigate to the Plugin Upload Page: In the left-hand menu, click on "Plugins" and then select "Add New". At the top of the page, click on the "Upload Plugin" button.

    Upload Custom Plugin: Click on the "Choose File" button and select the event-manager.zip file containing event-manager plugin. Once the file is selected, click on the "Install Now" button.
    ![upload plugin](https://github.com/unicorn-talent/event-listing/assets/84963788/85531488-7485-4e66-bdbe-9108df65efdd)

    Activate event-manager Plugin: After the plugin is uploaded, you will be redirected to a page where you can activate the plugin. Click on the "Activate Plugin" button to activate custom plugin.
    ![active plugin](https://github.com/unicorn-talent/event-listing/assets/84963788/6d78184b-9079-4770-b7b5-2a35308c683f)

5.  Add New Event on WP-admin

    Navigate to the Events Plugin Page: In the left-hand menu, click on "Events" and then select "Add New" at the top of the page.

    You can add new events with the custom fields. When creating or editing a post, you will see the custom fields for event_date, event_location, and event_description.
    ![custom field](https://github.com/unicorn-talent/event-listing/assets/84963788/bb6b108a-6599-4647-9423-44ef0d3e7cc8)

    Fill in the relevant information for each field, and publish or update the post.

### Front-end (Next.js) Installation

---

1.  Prerequisites

    Install Node.js and NPM or Yarn on system.

    - [Node.js](https://nodejs.org/en/download)
    - [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

2.  Front-end Setup

    Clone Next.js app from [Event-listing repository](https://github.com/unicorn-talent/event-listing.git).

    Navigate to the project directory.

3.  Environment Configuration

    Set API endpoint on .env.local file.

    ```
    NEXT_PUBLIC_API_URL=http://localhost/wordpress/wp-json/event-manager/
    ```

4.  Install Dependecies

    ```
    npm install
    # or
    yarn install
    ```

5.  Start the Development Server

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

1.  Back-end Functions:

    - Get All Events Function

      A function to retrieve all events from the WordPress database.

      - API endpoint

              http://localhost/wordpress/wp-json/event-manager/get-all-events

      - Function

        ```
        function get_all_events_callback() {
          ...
        }
        ```

      - Response

        ```
        {
          "code": 200,
          "message": "Success",
          "data": [
              {
                "id": 27,
                "title": "Food Truck Fair",
                "date": "2023-07-22",
                "location": "City Park"
              },
              ...
          ]
        }
        ```

    - Get Event By ID Function

      A function to retrieve an event by its ID from the WordPress database.

      - API endpoint

              http://localhost/wordpress/wp-json/event-manager/get-event/27

      - Function

        ```
        function get_event_by_id_callback($request) {
          ...
        }
        ```

      - Response

        ```
        {
          "code": 200,
          "message": "Success",
          "data": {
              "title": "Food Truck Fair",
              "date": "2023-07-22",
              "location": "City Park",
              "description": "Savor a variety of delicious dishes from local food trucks."
          }
        }
        ```

    - Get Event By Search Text Function

      A function to retrieve events by event title search from the WordPress database.

      - API endpoint

              http://localhost/wordpress/wp-json/event-manager/get-events-by-title?search_text=Food Truck

      - Function

        ```
        function get_events_by_title_callback($request) {
          ...
        }
        ```

      - Response

        ```
        {
          "code": 200,
          "message": "Success",
          "data": [
              {
                  "id": 27,
                  "title": "Food Truck Fair",
                  "date": "2023-07-22",
                  "location": "City Park"
              }
          ]
        }
        ```

2.  Front-end

        event-listing/
        │
        ├── app/
        │ ├── api.tsx
        │ ├── layout.tsx
        │ ├── not-found.tsx
        │ ├── page.tsx
        │ ├── global.css
        │ └── events/[slug]/
        │ │ └── page.tsx
        │
        ├── components/
        │ ├── BackButton.tsx
        │ ├── Error.tsx
        │ └── EventDetailField.tsx
        │
        ├── public/
        │
        ├── custom-plugin/
        │ └── event-manager.zip

3.  Exception

    ***

    If you have issues with custom post types and API endpoints, try saving your permalink structure again.

    `Ex: After activating a custom plugin, I call the endpoint and it returns a 404 error.`

    To do this, go to the "Settings" in your WordPress admin, click on "Permalinks," and then simply click the "Save Changes" button without making any changes.

    ***

    ***

    If there are no events to fetch in your WordPress database or some error occurred in the endpoint, you may see an error page on the frontend.

    ![error](https://github.com/unicorn-talent/event-listing/assets/84963788/e8dd8354-c83f-4a1a-84cc-219085f33d4f)

    ***

    ***

    If you called event detail page with an incorrect event ID, you amy see a not found page.

    ![not found](https://github.com/unicorn-talent/event-listing/assets/84963788/d2c1f350-3ae5-4a28-a79e-c210647f93b9)

    ***

![eventlist](https://github.com/unicorn-talent/event-listing/assets/84963788/4597d453-8b5a-4071-8a99-e7985eb3a762)
![eventdetail](https://github.com/unicorn-talent/event-listing/assets/84963788/a10d6a44-a064-4f7e-b432-60515457f1b0)
