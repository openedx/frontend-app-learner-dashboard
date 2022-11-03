import { StrictDict } from 'utils';

export const buttonStates = StrictDict({
  default: 'default',
  pending: 'pending',
  error: 'error',
});

export const htmlProps = StrictDict({
  disabled: 'disabled',
  href: 'href',
  onClick: 'onClick',
  onChange: 'onChange',
  onBlur: 'onBlur',
  size: 'size',
});

export default {
  buttonStates,
  htmlProps,
};
