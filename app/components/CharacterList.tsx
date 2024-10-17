'use client'

import { useEffect, useState } from 'react';
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/react";
import CharacterItem from './CharacterItem';

type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
  };
  
  type CharacterListProps = {
    initialCharacters: Character[];
  };
  
  export default function CharacterList({ initialCharacters }: CharacterListProps) {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<string>('');


  const list1 = [
    { name: 'All Statuses', val: '' },
    { name: 'Alive', val: 'alive' },
    { name: 'Dead', val: 'dead' },
    { name: 'Unknown', val: 'unknown' },
  ];

  const list2 = [
    { name: 'All Genders', val: '' },
    { name: 'Male', val: 'male' },
    { name: 'Female', val: 'female' },
    { name: 'Genderless', val: 'genderless' },
    { name: 'Unknown', val: 'unknown' },
  ];

    // Eğer sayfa yeniden yüklendiğinde URL parametrelerinde bir filtre varsa, onları state'e aktaralım.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');
        const gender = params.get('gender');

        if (status) setStatusFilter(status);
        if (gender) setGenderFilter(gender);
        }, []);

  // Filtreleri URL'ye ekleyip sayfayı yeniden yükleme işlemi
  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    if (statusFilter) queryParams.append('status', statusFilter);
    if (genderFilter) queryParams.append('gender', genderFilter);

    // Yeni URL oluşturuluyor ve sayfa yönlendiriliyor
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.location.href = newUrl; // Sayfa yeniden yüklenir
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 mb-4">
        <div className="w-full md:w-1/3">
          <Select
            label="Select Status"
            placeholder="Choose a status"
            selectedKeys={statusFilter ? [statusFilter] : []}
            onSelectionChange={(keys) => setStatusFilter(keys.currentKey as string)}
          >
            {list1.map((item) => (
              <SelectItem className='dark:text-gray-700' key={item.val} value={item.val}>
                {item.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="w-full md:w-1/3">
          <Select
            label="Select Gender"
            placeholder="Choose a gender"
            selectedKeys={genderFilter ? [genderFilter] : []}
            onSelectionChange={(keys) => setGenderFilter(keys.currentKey as string)}
          >
            {list2.map((item) => (
              <SelectItem className='dark:text-gray-700' key={item.val} value={item.val}>
                {item.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <Button color="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {initialCharacters.length > 0 ? (
          initialCharacters.map((char: any) => (
            <div key={char.id}>
              <CharacterItem item={char} />
            </div>
          ))
        ) : (
          <p>No characters found</p>
        )}
      </div>
    </div>
  );
}
 