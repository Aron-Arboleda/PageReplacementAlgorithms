/**
 * This file is a unit test for the App component using the
 * React Testing Library. It ensures that the App component
 * renders correctly without errors.
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
