import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/countries/_layout')({
  component: CountriesLayout,
})

function CountriesLayout() {
    return (
      <div>
<h1>hello from the Mama layout!</h1>
        <main>
          <Outlet /> 
        </main>
      </div>
    );
  }