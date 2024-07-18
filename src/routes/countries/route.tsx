
import { createFileRoute, Outlet } from '@tanstack/react-router';



export const Route = createFileRoute('/countries')({
  
  component: myLayout
});

function myLayout() {
 
  return (
    <div className="container mx-auto px-4 py-8">
 
<Outlet/>
    </div>
  );
}

export default myLayout;