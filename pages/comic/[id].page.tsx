import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { getComic } from 'dh-marvel/services/marvel/marvel.service';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Comic } from 'interface/comic';
import Link from 'next/link';


interface ComicDetailPageProps {
    comicDetail: Comic;
}

const ComicDetailPage: NextPage<ComicDetailPageProps> = ({ comicDetail }) => {


    return (
        <LayoutGeneral>
            <Head>
                <title>Pagina de Detalle del Comic</title>
                <meta name="comicDetail" content="Pagina de Detalle del Comic" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BodySingle title={'COMIC DETAIL'}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    <Card
                        sx={{ width: '25rem', margin: '20px', display: 'flex', flexDirection: 'column' }}
                        key={comicDetail.id}
                    >
                        <CardMedia
                            sx={{ height: 200 }}
                            image={
                                comicDetail.images.length > 0
                                    ? `${comicDetail.images[0].path}.${comicDetail.images[0].extension}`
                                    : 'https://pbs.twimg.com/profile_images/1560508217867718657/8ak-Td6l_400x400.jpg'     //coloque esta imagen por defecto porque me parecio mejor
                            }
                            title={comicDetail.title}
                        />
                        <CardContent style={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {comicDetail.title}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Description:</strong>{comicDetail.textObjects.length >= 1 ? comicDetail.textObjects[0].text : 'Pendiente'}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Current Price:</strong> {comicDetail.price}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Previous Price:</strong> {comicDetail.oldPrice}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Stock:</strong> {comicDetail.stock}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                <strong>Characters:</strong>
                                {comicDetail.characters.items.length >= 1 || 0 ? (
                                    <ul>
                                        {comicDetail.characters.items.map((character, index) => {
                                            // Obtener los últimos 7 caracteres de la resourceURI
                                            const characterId = parseInt(character.resourceURI.slice(-7), 10);
                                            return (
                                                <li key={index}>
                                                    {/* Enlace al personaje con su ID */}
                                                    <Link href={`/personaje/${characterId}`} passHref>
                                                        <a>{character.name}</a>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <span>No Characters Associated</span>
                                )}
                            </Typography>


                        </CardContent>
                        <CardActions sx={{ justifyContent: 'space-around' }}>
                            <Button size="small" variant="contained" disabled={(comicDetail.stock !== undefined && comicDetail.stock < 1) || false}>
                                BUY
                            </Button>
                        </CardActions>
                    </Card>
                </div>

            </BodySingle>
        </LayoutGeneral>
    );
};

export default ComicDetailPage;

export const getServerSideProps: GetServerSideProps<ComicDetailPageProps> = async ({ query }) => {
    try {
        const id = parseInt(query.id as string) || 0; 
        const comicDetail = await getComic(id); // Utiliza la función getComic para obtener el detalle del cómic

        return {
            props: {
                comicDetail: comicDetail, // Pasa el detalle del cómic como prop
            },
        };
    } catch (error) {
        console.error('Error fetching comic detail:', error);
        return {
            props: {
                comicDetail: null, // En caso de error, devuelve null como detalle del cómic
            },
        };
    }
};
