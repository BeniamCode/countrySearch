import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/countries/$countryName')({
  component: CountryDetailPage,
});

// function CountryDetailPage() {
//   const { countryName } = Route.useParams();
  
//   const { data: countryData, isLoading, error } = useQuery({
//     queryKey: ['country', countryName],
//     queryFn: async () => {
//       const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch country data');
//       }
//       const data = await response.json();
//       return data[0]; // Assuming the API returns an array with one country
//     },
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>An error occurred: {error.message}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">{countryData?.name.common}</h1>
//       {/* Add more country details here */}
//     </div>
//   );
// }

function CountryDetailPage(){
  return <div>hello from contry detail page</div>
}