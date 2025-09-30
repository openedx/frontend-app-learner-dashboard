# Course Card Progress Component

This component displays a progress bar for enrolled courses within the course card.

## Feature Flag

The progress bar is controlled by the `SHOW_PROGRESS_BAR` feature flag:

- **Default**: `false` (progress bar is hidden)
- **When enabled**: Shows progress bar for enrolled courses only

## Usage

### Enabling the Feature

Add to your environment configuration:

```javascript
// env.config.jsx or similar
const config = {
  // ... other config
  SHOW_PROGRESS_BAR: true,
};
```

### Development/Testing

To enable locally for testing:

```bash
# Set environment variable
export SHOW_PROGRESS_BAR=true

# Or add to .env file
echo "SHOW_PROGRESS_BAR=true" >> .env
```

## Behavior

- **Shows only for enrolled courses**: Non-enrolled courses won't display progress
- **Fetches real progress data**: Uses the course's `progressUrl` to get actual progress
- **Loading states**: Shows loading indicator while fetching data
- **Graceful fallback**: Shows 0% if API call fails
- **Responsive design**: Adapts to course card layout

## Styling

The progress bar:
- Spans the full width of the course card
- Positioned between course details and action buttons
- Uses color-coded variants (info/warning/success) based on completion
- Includes a subtle shadow and rounded corners

## API Integration

The component automatically:
1. Checks enrollment status via Redux hooks
2. Fetches progress from the course's `progressUrl`
3. Handles multiple progress response formats
4. Updates in real-time based on course data changes

## Performance

- Only renders when feature flag is enabled
- Only fetches data for enrolled courses
- Minimal performance impact when disabled