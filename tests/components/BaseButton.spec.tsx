/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import BaseButton from '../../src/components/BaseButton';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('BaseButton', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render button with text', () => {
    render(<BaseButton>some text</BaseButton>);

    const button = screen.getByTestId('base-button');
    const buttonTag = screen.getAllByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('some text');
    expect(button).toEqual(buttonTag[0]);
  });

  it('should render disabled button', () => {
    render(<BaseButton disabled />);

    const button = screen.getByTestId('base-button');

    expect(button).toHaveAttribute('disabled');
  });

  it('should render button with type="submit"', () => {
    render(<BaseButton submit />);

    const button = screen.getByTestId('base-button');
    const type = button.getAttribute('type');

    expect(type).toBe('submit');
  });

  it('should render link when href is provided', () => {
    render(<BaseButton href="/link" target="_blank" />);

    const button = screen.getByTestId('base-button');
    const buttonTag = screen.getAllByRole('link');
    const href = button.getAttribute('href');
    const target = button.getAttribute('target');

    expect(href).toBe('/link');
    expect(target).toBe('_blank');
    expect(button).toEqual(buttonTag[0]);
  });
});
