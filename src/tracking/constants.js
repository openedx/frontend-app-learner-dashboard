import { StrictDict } from 'utils';

export const categories = StrictDict({
  dashboard: 'dashboard',
  upgrade: 'upgrade',
  userEngagement: 'user-engagement',
  searchButton: 'search_button',
});

export const events = StrictDict({
  enterCourseClicked: 'enterCourseClicked',
  courseImageClicked: 'courseImageClicked',
  courseTitleClicked: 'courseTitleClicked',
  courseOptionsDropdownClicked: 'courseOptionsDropdownClicked',
  upgradeButtonClicked: 'upgradeButtonClicked',
  upgradeButtonClickedEnrollment: 'upgradeButtonClickedEnrollment',
  upgradeButtonClickedUpsell: 'upgradeButtonClickedUpsell',
  shareClicked: 'shareClicked',
  userSettingsChanged: 'userSettingsChanged',
  newSession: 'newSession',
  switchSession: 'switchSession',
  leaveSession: 'leaveSession',
  unenrollReason: 'unenrollReason',
  entitlementUnenrollReason: 'entitlementUnenrollReason',
  enterpriseDashboardModalOpened: 'enterpriseDashboardModalOpened',
  enterpriseDashboardModalCTAClicked: 'enterpriseDashboardModalCTAClicked',
  enterpriseDashboardModalClosed: 'enterpriseDashboardModalClosed',
});

const learnerPortal = 'edx.ui.enterprise.lms.dashboard.learner_portal_modal';

export const eventNames = StrictDict({
  enterCourseClicked: 'edx.bi.dashboard.enter_course.clicked',
  courseImageClicked: 'edx.bi.dashboard.course_image.clicked',
  courseTitleClicked: 'edx.bi.dashboard.course_title.clicked',
  courseOptionsDropdownClicked: 'edx.bi.dashboard.course_options_dropdown.clicked',
  upgradeButtonClicked: 'edx.bi.dashboard.upgrade_button.clicked',
  upgradeButtonClickedEnrollment: 'edx.course.enrollment.upgrade.clicked',
  upgradeButtonClickedUpsell: 'edx.bi.ecommerce.upsell_links_clicked',
  shareClicked: 'edx.course.share_clicked',
  userSettingsChanged: 'edx.user.settings.changed',
  newSession: 'course-dashboard.new-session',
  switchSession: 'course-dashboard.switch-session',
  leaveSession: 'course-dashboard.leave-session',
  unenrollReason: 'unenrollment_reason.selected',
  entitlementUnenrollReason: 'entitlement_unenrollment_reason.selected',
  enterpriseDashboardModalOpened: `${learnerPortal}.opened`,
  enterpriseDashboardModalCTAClicked: `${learnerPortal}.dashboard_cta.clicked`,
  enterpriseDashboardModalClosed: `${learnerPortal}.closed`,
  findCoursesClicked: 'edx.bi.dashboard.find_courses_button.clicked',
});

export const appName = 'learner-home';

export default eventNames;
