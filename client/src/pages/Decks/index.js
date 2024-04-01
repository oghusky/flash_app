import { useCallback, useContext, useEffect } from 'react';
// components
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Buttons from '../../components/Buttons';
import { Container, Row, Col } from 'react-bootstrap';
import SearchInput from '../../components/SearchInput';
// API
import DeckAPI from '../../API/decks';
import FavoriteAPI from '../../API/favorites';
// context
import AppContext from '../../store/AppContext';
import favorited from '../../SVG/favheart.svg'
import unfavorited from '../../SVG/openheart.svg'
export default function Decks() {
    const { decks, setDecks, jwt, user } = useContext(AppContext);
    const getDeck = useCallback(async userID => {
        try {
            if (userID) {
                const res = await DeckAPI.getAllDecks(userID);
                if (res && res.status === 200) setDecks(res.data.decks);
            }
            const res = await DeckAPI.getAllDecks(userID);
            if (res && res.status === 200) setDecks(res.data.decks);
        } catch (e) {
            return e.message;
        }
    }, [setDecks])
    useEffect(() => {
        getDeck(user?._id);
    }, [user?._id, getDeck])
    const handleFavoriteClick = async deckID => {
        try {
            const res = await FavoriteAPI.postFavoriteByUserIDAndDeckID({deckID}, jwt);
            if (res.status === 201) {
                const res = await DeckAPI.getAllDecks(user?._id);
                if (res && res.status === 200) {
                    setDecks(res.data.decks);
                }
            }
        } catch (e) {
            return e.message;
        }
    }
    const handleUnfavoriteClick = async deckID => {
        try {
            const res = await FavoriteAPI.deleteFavoriteByUserIDAndDeckID({deckID}, jwt);
            if (res.status === 200) {
                const res = await DeckAPI.getAllDecks(user?._id);
                if (res && res.status === 200) setDecks(res.data.decks);
            }
        } catch (e) {
            return e.message;
        }
    }
    return (
        <>
            <Helmet><title>Flash_App | Decks</title></Helmet>
            <Container fluid>
                <div className='d-flex justify-content-around align-items-center'>
                    {
                        jwt ? <Link to="/create_deck" className='text-center'>
                            <Buttons btnText={"Create"} btnAlign={"center"} variant={"primary"} className={"my-3"} />
                        </Link> : <Link to={"#"} className='text-center' ><Buttons btnText={"Login to create new deck"} className={"my-3"} disabled /></Link>
                    }
                    <div>
                        <SearchInput />
                    </div>
                </div>
                <Row>
                    {decks?.map(deck => (
                        <Col key={deck?._id} lg={3} md={4} sm={6} xs={12} className={"my-2"}>
                            <div className='p-3' style={{ borderRadius: "10px 10px 10px 10px", backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.15)" }}>
                                <div className='d-flex justify-content-between'>
                                    <p className='mb-0 pb-0'><b>{deck?.name}</b></p>
                                    {
                                        deck?.isForAdults ?
                                            <p style={{ borderRadius: "50%", padding: "3px 4px" }}><b>18+</b></p>
                                            : <p style={{ backgroundColor: "#000", color: "#fff", borderRadius: "50%", padding: "3px 8px" }} ><b>{deck?.user?.userName?.charAt(0).toUpperCase()}</b></p>
                                    }
                                </div>
                                {
                                    jwt && deck?.isFavorited ?
                                        <div className='favorites-heart' onClick={() => handleUnfavoriteClick(deck?._id)} style={{ cursor: "pointer" }}>
                                            <img src={favorited} alt={"favorited-heart"} />
                                        </div>
                                        : jwt && !deck?.isFavorited ?
                                            <div className='favorites-heart' onClick={() => handleFavoriteClick(deck?._id)} style={{ cursor: "pointer" }} >
                                                <img src={unfavorited} alt={"open-heart"} />
                                            </div>
                                            : null
                                }
                                <div className='d-flex justify-content-between mt-3'>
                                    <Link to={`/deck/id/${deck?._id}`}>
                                        <Buttons size={"sm"} btnText={"Preview"} variant={"primary"} />
                                    </Link>
                                    <Buttons size={"sm"} btnText={`${deck?.questions?.length} ${deck?.questions.length === 1 ? "Item" : "Items"}`} variant={"dark"} disabled />
                                </div>
                                <Link to={`/user/id/${deck?.user._id}`} style={{ textDecoration: "none", color: "#000" }}>
                                    <p className={"mt-3 mb-0 text"}>{deck?.user?.userName ? `${deck?.user?.userName}` : `${deck?.user?.firstName} ${deck?.user?.lastName}`}</p>
                                </Link>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}