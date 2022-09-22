import { render } from '@testing-library/react';

import ThemeToggler from './theme-toggler';

describe('ThemeToggler', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeToggler />);
    expect(baseElement).toBeTruthy();
  });
});
