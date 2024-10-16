import { useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure
  } from "@nextui-org/modal";
import axios from 'axios';

export default function CharacterItem({ item }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [characterDetails, setCharacterDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchCharacterDetails = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/character/${item.id}`);
            setCharacterDetails(data);
            onOpen();
        } catch (error) {
            console.error('Error fetching character details:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 group">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-white/60 uppercase font-bold">Rick and Morty Characters</p>
                    <h4 className="text-white/90 font-medium text-xl">{item.name}</h4>
                </CardHeader>
                <div className="relative">
                    <Image
                        removeWrapper
                        alt={item.name}
                        className="z-0 w-full h-full object-cover"
                        src={item.image}
                    />
                    <div className="overlay absolute top-0 left-0 right-0 bottom-0 bg-black/70 group-hover:bg-black/50 transition-all duration-700"></div>
                </div>
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                            <p className="text-sm text-white">Status: {item.status}</p>
                            <p className="text-sm text-white">Gender: {item.gender}</p>
                        </div>
                    </div>
                    <Button radius="full" size="sm" onPress={fetchCharacterDetails} isLoading={loading}>
                        {loading ? 'Loading...' : 'Get Detail'}
                    </Button>
                </CardFooter>
            </Card>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader>
                        {characterDetails ? characterDetails.name : 'Character Details'}
                    </ModalHeader>
                    <ModalBody>
                        {characterDetails ? (
                            <div className="flex flex-col items-center">
                                <Image
                                    removeWrapper
                                    alt={characterDetails.name}
                                    className="z-0 w-full h-full object-cover mb-4"
                                    src={characterDetails.image}
                                />
                                <div className="details text-left">
                                <p><strong>Species:</strong> {characterDetails.species}</p>
                                <p><strong>Status:</strong> {characterDetails.status}</p>
                                <p><strong>Gender:</strong> {characterDetails.gender}</p>
                                <p><strong>Origin:</strong> {characterDetails.origin?.name}</p>
                                <p><strong>Location:</strong> {characterDetails.location?.name}</p>
                                </div>
                            </div>
                        ) : (
                            <p>Loading character details...</p>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={() => onOpenChange()}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
