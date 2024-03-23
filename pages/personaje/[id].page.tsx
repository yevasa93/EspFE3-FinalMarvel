import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { getCharacter } from 'dh-marvel/services/marvel/marvel.service';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CharacterDetail } from 'interface/personaje';
import { Box } from '@mui/material';


interface CharacterPageProps {
    character: CharacterDetail;
}

const CharacterPage: NextPage<CharacterPageProps> = ({ character }) => {


    return (
        <LayoutGeneral>
            <Head>
                <title>Pagina con detalle del personaje</title>
                <meta name="CharacterDetail" content="Pagina de detalle del personaje" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BodySingle title={'CHARACTER DETAIL'}>
                <Box style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    <Card
                        sx={{ width: '25rem', margin: '20px', display: 'flex', flexDirection: 'column' }}
                        key={character.id}
                    >
                        <CardMedia
                            sx={{ height: 200 }}
                            image={
                                character.thumbnail.path.length > 0
                                    ? `${character.thumbnail.path}.${character.thumbnail.extension}`
                                    : 'https://pbs.twimg.com/profile_images/1560508217867718657/8ak-Td6l_400x400.jpg'     //coloque esta imagen por defecto porque me parecio mejor
                            }
                            title={character.name}
                        />
                        <CardContent style={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {character.name}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Description:</strong>{character.description.length >= 1 ? character.description : 'Pending'}
                            </Typography>
                        </CardContent>

                    </Card>
                </Box>

            </BodySingle>
        </LayoutGeneral>
    );
};

export default CharacterPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        const id = parseInt(query?.id as string);
        const character = await getCharacter(id);
        
        return {
            props: {
                character
            },
        };
    } catch (error) {
        console.error('Error fetching character detail:', error);
        return {
            props: {
                character: null,
            },
        };
    }
};
