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
