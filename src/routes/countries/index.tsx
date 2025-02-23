import React, { useState, useCallback } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { z } from 'zod';

// Define the type for a country
interface Country {
  name: {
    common: string;
  };
  cca3: string;
}

// Zod schema for country name validation
const countryNameSchema = z.string().regex(/^[a-zA-Z\s]*$/, {
  message: "Only letters and spaces are allowed"
});

//Create the route '/countries' and its component 
export const Route = createFileRoute('/countries/')({
  component: CountrySearchPage
});

function CountrySearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data: countries, isLoading, error } = useQuery<Country[], Error>({
    queryKey: ['countries', searchTerm],
    queryFn: async () => {
      if (searchTerm.length < 2) return [];
      const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(searchTerm)}`);
      if (response.status === 404) {
        return []; // Return an empty array if no countries are found
      }
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      return response.json();
    },
    enabled: searchTerm.length >= 2, //The query is only valid for searchs 2 or more characters
  });

  // Function to format country name for URL
  const formatCountryNameForUrl = (name: string) => {
    return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
  };

  // Handle input change with Zod validation
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    try {
      countryNameSchema.parse(input);
      setSearchTerm(input);
      setValidationError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0].message);
      }
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Search for a Country
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Enter a country name..."
              className="pl-10 pr-4 py-2 w-full rounded-full focus:ring-0 focus:ring-offset-0"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          {validationError && (
            <p className="text-red-500 text-sm mt-1">{validationError}</p>
          )}

          {isLoading && <p className="text-gray-600">Searching countries...</p>}
          {error && <p className="text-red-600">Error: {error.message}</p>}
          
          <div className="mt-4 space-y-2">
            {countries && countries.length > 0 ? (
              countries.map((country: Country) => (
                <Link
                  key={country.cca3}
                  to="/countries/$countryName"
                  params={{ countryName: formatCountryNameForUrl(country.name.common) }}
                  className="block p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  {country.name.common}
                </Link>
              ))
            ) : (
              searchTerm.length >= 2 && !isLoading && !error && (
                <p className="text-gray-600">No countries found. Please try a different search term.</p>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CountrySearchPage;