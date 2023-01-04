/* eslint-disable quotes */
import { StrictDict } from 'utils';

const countryCodeUS = 'US';

const merchandisingKeys = StrictDict({
  execed: 'execed',
  execedDescription: 'execedDescription',
  masters: 'masters',
  mastersDescription: 'mastersDescription',
  bachelors: 'bachelors',
  bachelorsDescription: 'bachelorsDescription',
  bootcamps: 'bootcamps',
  bootcampsDescription: 'bootcampsDescription',
});

const messages = StrictDict({
  [merchandisingKeys.execed]: {
    id: 'TwoUWidget.execed',
    defaultMessage: 'Executive Education',
    description: 'The title for the link to the executive education page.',
  },
  [merchandisingKeys.execedDescription]: {
    id: 'TwoUWidget.execedDescription',
    defaultMessage: 'Short courses to develop leadership skills',
    description: 'The description for the link to the executive education page.',
  },
  [merchandisingKeys.masters]: {
    id: 'TwoUWidget.masters',
    defaultMessage: `Master's Degrees`,
    description: 'The title for the link to the masters page.',
  },
  [merchandisingKeys.mastersDescription]: {
    id: 'TwoUWidget.mastersDescription',
    defaultMessage: 'Online degree programs from top universities',
    description: 'The description for the link to the masters page.',
  },
  [merchandisingKeys.bachelors]: {
    id: 'TwoUWidget.bachelors',
    defaultMessage: `Bachelor's Degrees`,
    description: 'The title for the link to the bachelors page.',
  },
  [merchandisingKeys.bachelorsDescription]: {
    id: 'TwoUWidget.bachelorsDescription',
    defaultMessage: 'Begin or complete a degree; fully online',
    description: 'The description for the link to the bachelors page.',
  },
  [merchandisingKeys.bootcamps]: {
    id: 'TwoUWidget.bootcamps',
    defaultMessage: 'Boot Camps',
    description: 'The title for the link to the boot camps page.',
  },
  [merchandisingKeys.bootcampsDescription]: {
    id: 'TwoUWidget.bootcampsDescription',
    defaultMessage: 'Intensive, hands-on, project-based training',
    description: 'The description for the link to the boot camps page.',
  },
});

const merchandisingItems = [
  {
    key: merchandisingKeys.execed,
    title: messages[merchandisingKeys.execed],
    description: messages[merchandisingKeys.execedDescription],
    itemURL: 'https://www.edx.org/executive-education?vanguards_click=execed',
  },
  {
    key: merchandisingKeys.masters,
    title: messages[merchandisingKeys.masters],
    description: messages[merchandisingKeys.mastersDescription],
    itemURL: 'https://www.edx.org/masters?vanguards_click=masters',
  },
  {
    key: merchandisingKeys.bachelors,
    title: messages[merchandisingKeys.bachelors],
    description: messages[merchandisingKeys.bachelorsDescription],
    itemURL: 'https://www.edx.org/bachelors?vanguards_click=bachelors',
  },
  {
    key: merchandisingKeys.bootcamps,
    title: messages[merchandisingKeys.bootcamps],
    description: messages[merchandisingKeys.bootcampsDescription],
    itemURL: 'https://www.edx.org/boot-camps?vanguards_click=bootcamps',
  },
];

const getMerchandisingItems = (countryCode) => (
  countryCode === countryCodeUS ? merchandisingItems : merchandisingItems.slice(0, 3)
);

export { getMerchandisingItems, countryCodeUS };
