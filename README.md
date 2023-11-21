# frontend-app-learner-dashboard

The Learner Home app is a microfrontend (MFE) course listing experience for the Open edX Learning Management System (LMS).  This experience was designed to provide a clean and functional interface to allow learners to view all of their open enrollments, as well as take relevant actions on those enrollments.  It also serves as host to a number of exposed "widget" containers to provide upsell and discovery widgets as sidebar/footer components.

## Quickstart

To start the MFE and enable the feature in LMS:

1. Start the MFE with `npm run start`. Take a note of the path/port (defaults to `http://localhost:1996`).

From there, simply load the configured address/port.  You should be prompted to log into your LMS if you are not already, and then redirected to your home page.

## Contributing

A core goal of this app is to provide a clean experimentation interface.  To promote this end, we have provided a silo'ed code directory at `src/widgets` in which contributors should add their custom widget components.  In order to ensure our ability to maintain the code stability of the app, the code for these widgets should be strictly contained within the bounds of that directory.

Once written, the widgets can be configured into one of our widget containers at `src/containers/WidgetContainers`.  This can include conditional logic, as well as Optimizely triggers. It is important to note that our integration tests will isolate and ignore these containers, and thus testing your widget is the response of the creator/maintainer of the widget itself.

Some guidelines for writing widgets:
* Code for the widget should be strictly confined to the `src/widgets` directory.
* You can load data from the redux store, but should not add or modify fields in that structure.
* Network events should be managed in component hooks, though can use our `data/constants/requests:requestStates` for ease of tracking the request states.

 ## License

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

## Getting Help

If you're having trouble, we have discussion forums at
https://discuss.openedx.org where you can connect with others in the community.

Our real-time conversations are on Slack. You can request a `Slack
invitation`_, then join our `community Slack workspace`_.  Because this is a
frontend repository, the best place to discuss it would be in the `#wg-frontend
channel`_.

For anything non-trivial, the best path is to open an issue in this repository
with as many details about the issue you are facing as you can provide.

https://github.com/openedx/frontend-app-learner-dashboard/issues

For more information about these options, see the `Getting Help`_ page.

.. _Slack invitation: https://openedx.org/slack
.. _community Slack workspace: https://openedx.slack.com/
.. _#wg-frontend channel: https://openedx.slack.com/archives/C04BM6YC7A6
.. _Getting Help: https://openedx.org/community/connect

## Resources

* [Learner Home project info at the Open edX Wiki](https://openedx.atlassian.net/wiki/spaces/OEPM/pages/3575906333/Learner+Home)

## The Open edX Code of Conduct

All community members are expected to follow the `Open edX Code of Conduct`_.

.. _Open edX Code of Conduct: https://openedx.org/code-of-conduct/

## Reporting Security Issues

Please do not report security issues in public. Please email security@openedx.org.
