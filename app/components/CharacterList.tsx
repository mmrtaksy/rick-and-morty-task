'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button, Spinner } from '@nextui-org/react';
import { Select, SelectItem } from "@nextui-org/select";
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
    const [characters, setCharacters] = useState(initialCharacters);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [genderFilter, setGenderFilter] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const fetchFilteredCharacters = async () => {
        setLoading(true);

        try {
            const query = new URLSearchParams();

            if (statusFilter) query.append('status', statusFilter);
            if (genderFilter) query.append('gender', genderFilter);

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/character/?${query.toString()}`);
            setCharacters(data.results);
        } catch (error) {
            console.error('Error fetching characters:', error);
            setCharacters([]); // Hata durumunda boş karakterler set edilir.
        }

        setLoading(false);
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
                        <SelectItem key="">All Statuses</SelectItem>
                        <SelectItem key="alive">Alive</SelectItem>
                        <SelectItem key="dead">Dead</SelectItem>
                        <SelectItem key="unknown">Unknown</SelectItem>
                    </Select>
                </div>

                <div className="w-full md:w-1/3">
                    <Select
                        label="Select Gender"
                        placeholder="Choose a gender"
                        selectedKeys={genderFilter ? [genderFilter] : []}
                        onSelectionChange={(keys) => setGenderFilter(keys.currentKey as string)}
                    >
                        <SelectItem key="">All Genders</SelectItem>
                        <SelectItem key="male">Male</SelectItem>
                        <SelectItem key="female">Female</SelectItem>
                        <SelectItem key="genderless">Genderless</SelectItem>
                        <SelectItem key="unknown">Unknown</SelectItem>
                    </Select>
                </div>

                <Button
                    color='primary'
                    onClick={fetchFilteredCharacters}
                    isDisabled={loading}
                >
                    {loading ? <Spinner size="sm" color="white"  /> : 'Apply Filters'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {characters.length > 0 ? (
                    characters.map((char) => (
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

