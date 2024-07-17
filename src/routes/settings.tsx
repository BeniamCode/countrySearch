import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings')({
  component: () => <div>This is the settings page!</div>
})