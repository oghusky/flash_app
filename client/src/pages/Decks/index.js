import { useContext, useEffect } from 'react';
// components
import { Helmet } from 'react-helmet';
import Buttons from '../../components/Buttons';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// API
import DeckAPI from '../../API/decks';
// context
import AppContext from '../../store/AppContext';

export default function Decks() {
    const { decks, setDecks } = useContext(AppContext);
    const getDeck = async () => {
        try {
            const res = await DeckAPI.getAllDecks();
            if (res && res.status === 200) setDecks(res.data.decks);
        } catch (e) {
            return e.message;
        }
    }
    useEffect(() => {
        getDeck();
    }, [])

    return (
        <>
            <Helmet><title>Flash_App | Decks</title></Helmet>
            <Container fluid>
                <Link to="/create_deck">
                    <Buttons btnText={"Create New Deck"} btnAlign={"center"} variant={"primary"} className={"my-3"} />
                </Link>
                <Row>
                    {decks?.map(deck => (
                        <Col key={deck._id} sm={6} xs={12} className={"my-2"}>
                            <div className='p-3' style={{ borderRadius: "10px 10px 10px 10px", backgroundColor: "#fff" }}>
                                <p className='mb-0 pb-0'><b>{deck.name}</b></p>
                                <p className='mb-0 pb-0'><small>{deck.isForAdults ? "This deck may not be appropriate for children" : null}</small></p>
                                <p className='mt-0 pt-0'>{deck.description}</p>
                                <Link to={`/user/id/${deck.user._id}`}>
                                    <p>{deck.user.userName ? `${deck.user.userName}` : `${deck.user.firstName} ${deck.user.lastName}`}</p>
                                </Link>
                                <div className='d-flex justify-content-between'>
                                    <Link to={`/deck/id/${deck._id}`}>
                                        <Buttons size={"sm"} btnText={"Preview"} variant={"primary"} />
                                    </Link>
                                    <Buttons size={"sm"} btnText={`${deck?.questions?.length} Items`} variant={"primary"} disabled />
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}