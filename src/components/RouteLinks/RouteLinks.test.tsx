import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RouteLinks from './RouteLinks';

describe('<RouteLinks />', () => {
  test('it should mount', () => {
    render(<RouteLinks />);
    
    const routeLinks = screen.getByTestId('RouteLinks');

    expect(routeLinks).toBeInTheDocument();
  });
});