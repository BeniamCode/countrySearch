import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/countries/_layout/hello')({
  component: () => <div>Hello /countries/_layout/hello!</div>
})