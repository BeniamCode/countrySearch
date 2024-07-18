import React, { useState, useCallback } from 'react';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
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

export const Route = createFileRoute('/countries')({
  
  component: CountrySearchPage
});

function CountrySearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const { data: countries, isLoading, error } = useQuery<Country[], Error>({
    queryKey: ['countries', searchTerm],
    queryFn: async () => {
      if (searchTerm.length < 2) return [];
      const response = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: searchTerm.length >= 2,
  });

  // Function to format country name for URL
  const formatCountryNameForUrl = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
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
 
<Outlet/>
    </div>
  );
}

export default CountrySearchPage;