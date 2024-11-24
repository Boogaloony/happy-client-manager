/**
 * OrganizationForm Component
 * 
 * @component
 * Form for creating and editing organizations
 * 
 * @description
 * This form handles the creation of new organizations with country-specific tax fields.
 * The form dynamically shows different tax number fields (EIN, VAT, ABN, GSTIN) based on:
 * 1. The selected country
 * 2. Whether the organization is cash-only
 * 
 * @database
 * Table: Organizations
 * - id: Primary key
 * - name: string (required)
 * - employees: integer
 * - country: string (required)
 * - isCashOnly: boolean
 * - status: enum ('active', 'inactive')
 * - vatNumber: string (nullable)
 * - abn: string (nullable)
 * - ein: string (nullable)
 * - gstin: string (nullable)
 * - createdAt: timestamp
 * - updatedAt: timestamp
 * 
 * Validations:
 * - Tax numbers format based on country
 * - Name uniqueness within system
 * 
 * Audit Requirements:
 * - Log all changes to tax information
 * - Track status changes
 * - Record creator and last modifier
 */

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { countryFields } from "@/data/mockData";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  employees: z.number().min(1),
  country: z.string(),
  isCashOnly: z.boolean(),
  vatNumber: z.string().optional(),
  abn: z.string().optional(),
  ein: z.string().optional(),
  gstin: z.string().optional(),
});

export function OrganizationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      employees: 1,
      country: "",
      isCashOnly: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const selectedCountry = form.watch("country");
  const isCashOnly = form.watch("isCashOnly");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter organization name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Employees</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="USA">United States</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="EU">European Union</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isCashOnly"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Cash Only</FormLabel>
                <FormDescription>
                  Mark if this organization operates on cash basis only
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {selectedCountry && !isCashOnly && countryFields[selectedCountry as keyof typeof countryFields]?.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
