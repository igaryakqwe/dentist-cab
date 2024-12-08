'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { api } from '@/lib/trpc/client';
import { CommandLoading } from 'cmdk';
import { FC } from 'react';

interface DentistSelectorProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const PatientSelector: FC<DentistSelectorProps> = ({
  selectedValue,
  setSelectedValue,
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const { data: doctors, isLoading } = api.users.getEmployee.useQuery();

  const filteredPatients = doctors?.filter((doctor) =>
    `${doctor.name} ${doctor.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const selectedPatient = doctors?.find(
    (patient) => patient.id === selectedValue
  );
  const selectedPatientName = `${selectedPatient?.name} ${selectedPatient?.surname}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedValue ? selectedPatientName : 'Обрати лікаря...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Шукати лікаря..."
            className="h-9"
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            {isLoading && <CommandLoading />}
            <CommandEmpty>Не знайдено</CommandEmpty>
            <CommandGroup>
              {filteredPatients?.map((patient) => (
                <CommandItem
                  key={patient.id}
                  value={patient.id}
                  onSelect={(currentValue) => {
                    setSelectedValue(
                      currentValue === selectedValue ? '' : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {patient.name} {patient.surname}
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedValue === patient.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PatientSelector;
