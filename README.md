# frontend-app-learner-dashboard

The Learner Dashboard app is a microfrontend (MFE) course listing experience for the OpenEdx Learning Management System.  This experience was designed to provide a clean and functional interface to allow learners to view all of their open enrollments, as well as take relevant actions on those enrolments.  It also serves as host to a number of exposed "widget" containers to provide upsell and discovery widgets as sidebar/footer components.

## Quickstart

To start the MFE and enable the feature in LMS:

1. Start the MFE with `npm run start`. Take a note of the path/port (defaults to `http://localhost:1996`).

From there, simply load the configured address/port.  You should be prompted to log into your LMS if you are not already, and then redirected to your home page.

## Contributing

A core goal of this app is to provide a clean experimentation interface.  To promote this end, we have provided a silo'ed code directory at `src/widgets` in which contributors should add their custom widget components.  In order to ensure our ability to maintain the code stability of the app, the code for these widgets should be strictly contained within the bounds of that directory.

Once written, the widgets can be configured into one of our widget containers at `src/containers/WidgetContainers`.  This can include conditional logic, as well as optimizely triggers. It is important to note that our integration tests will isolate and ignore these containers, and thus testing your widget is the response of the creator/maintainer of the widget itself.

Some guidelines for writing widgets:
* Code for the widget should be strictly confined to the `src/widgets` directory.
* You can load data from the redux store, but should not add or modify fields in that structure.
* Network events should be managed in component hooks, though can use our `data/constants/requests:requestStates` for ease of tracking the request states.

## Resources
