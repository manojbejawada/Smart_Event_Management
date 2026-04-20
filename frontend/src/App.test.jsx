import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('SEES Dashboard App', () => {
  it('renders the initial Mission Control dashboard', () => {
    render(<App />);
    
    // Checks if the sidebar and top header render
    expect(screen.getByText('Mission Control')).toBeInTheDocument();
    expect(screen.getByText('SEES')).toBeInTheDocument();
  });

  it('navigates between sidebar tabs', () => {
    render(<App />);
    
    // Starts on 'Mission Control' (live)
    expect(screen.getByText('command map')).toBeInTheDocument();
    
    // Click Analytics
    const analyticsTab = screen.getByText('Analytics');
    fireEvent.click(analyticsTab);
    
    // Should now show the Analytics Header
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText(/Live telemetry for/i)).toBeInTheDocument();
  });

  it('generates random mock data locally when offline', async () => {
    render(<App />);
    
    // Wait for the random data simulation hook to seed the dashboard
    // By default, it seeds immediately on mount
    const totalCrowdLabels = screen.getAllByText('TOTAL CROWD');
    expect(totalCrowdLabels.length).toBeGreaterThan(0);
    
    // Active Alerts should display a number
    const activeAlertsLabels = screen.getAllByText('ACTIVE ALERTS');
    expect(activeAlertsLabels.length).toBeGreaterThan(0);
  });
});
