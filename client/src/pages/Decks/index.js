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
    const { decks, setDecks, jwt } = useContext(AppContext);
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
                {jwt ? <Link to="/create_deck">
                    <Buttons btnText={"Create New Deck"} btnAlign={"center"} variant={"primary"} className={"my-3"} />
                </Link> : <Buttons btnText={"Login to create new deck"} className={"my-3"} disabled />}
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
                                {/* <p className='mt-0 pt-0'>{deck?.description}</p> */}
                                <div className='d-flex justify-content-between mt-3'>
                                    <Link to={`/deck/id/${deck?._id}`}>
                                        <Buttons size={"sm"} btnText={"Preview"} variant={"primary"} />
                                    </Link>
                                    <Buttons size={"sm"} btnText={`${deck?.questions?.length} ${deck?.questions.length === 1 ? "Item" : "Items"}`} variant={"dark"} disabled />
                                </div>
                                <Link to={`/user/id/${deck?.user._id}`} style={{ textDecoration: "none", color: "#000" }}>
                                    <p className={"mt-3 mb-0"}>{deck?.user?.userName ? `${deck?.user?.userName}` : `${deck?.user?.firstName} ${deck?.user?.lastName}`}</p>
                                </Link>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}