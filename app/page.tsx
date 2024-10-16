import axios from 'axios';
import CharacterList from '@/app/components/CharacterList';

export default async function Home() {
  // Sayfa ilk yüklendiğinde verileri getiriyoruz.
  const { data } = await axios.get(process.env.NEXT_PUBLIC_API_KEY + '/character');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Rick and Morty Characters</h1>
      <CharacterList initialCharacters={data.results} />
    </div>
  );
}
