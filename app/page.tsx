import axios from 'axios';
import CharacterList from '@/app/components/CharacterList';


export default async function Home({ searchParams }: { searchParams: { status?: string; gender?: string } }) {
  const { status, gender } = searchParams; // URL parametrelerinden status ve gender alınıyor.

  const query = new URLSearchParams();
  if (status) query.append('status', status);
  if (gender) query.append('gender', gender);

  // Filtrelenmiş karakterleri sunucu tarafında alıyoruz
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/character/?${query.toString()}`);
  const initialCharacters = res.data.results;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Rick and Morty Characters</h1>
      <CharacterList initialCharacters={initialCharacters} />
    </div>
  );
}