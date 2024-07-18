import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


//Create file route for  `/countries/$countryName`
export const Route = createFileRoute('/countries/$countryName')({
  component: CountryDetailPage,
});

function CountryDetailPage() {
  const { countryName } = Route.useParams();
  
  const decodedCountryName = decodeURIComponent(countryName.replace(/-/g, ' ')); //return name to 

  const { data: countryData, isLoading, error } = useQuery({
    queryKey: ['country', decodedCountryName],
    queryFn: async () => {
      const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(decodedCountryName)}?fullText=true`);
      if (!response.ok) {
        throw new Error('Failed to fetch country data');
      }
      const data = await response.json();
      return data[0]; // Assuming the API returns an array with one country
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">An error occurred: {error instanceof Error ? error.message : 'Unknown error'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-4">
            <img
              src={countryData?.flags.svg}
              alt={`Flag of ${countryData?.name.common}`}
              className="h-8 w-auto"
            />
            {countryData?.name.common}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-2">
            <span className="font-semibold">Capital:</span> {countryData?.capital?.[0] || 'N/A'}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Population:</span> {countryData?.population?.toLocaleString() || 'N/A'}
          </p>
          <img
            src={countryData?.flags.svg}
            alt={`Flag of ${countryData?.name.common}`}
            className="w-full max-w-md h-auto mt-4 border"
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default CountryDetailPage;