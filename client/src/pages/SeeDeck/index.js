import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import DeckAPI from "../../API/decks";
import AppContext from "../../store/AppContext";
import { Helmet } from 'react-helmet';
import Buttons from "../../components/Buttons";

export default function SeeDeck() {
    const params = useParams();
    const [deck, setDeck] = useState({});
    const { setAppMsg, user } = useContext(AppContext);
    const getDeck = async id => {
        const res = await DeckAPI.getDeckByDeckID(id);
        if (res.status === 200) {
            setDeck(res.data.deck);
        }
        else setAppMsg({ show: true, variant: "danger", text: res.response.data.msg });
    }
    useEffect(() => {
        getDeck(params?.deckID);
    }, [params?.deckID]);

    return (
        <>
            <Helmet>
                <title>Flash_App | {`${deck?.name}`}</title>
            </Helmet>
            <Container>
                <Card className="my-3">
                    <Card.Header>
                        <h2>{deck?.name}</h2>
                    </Card.Header>
                    <Card.Body>
                        <p><small>{deck?.isForAdults ? "May not be for children" : null}</small></p>
                        <p>{deck?.questions?.length} Questions</p>
                        <p>Description: {deck?.description}</p>
                        <p><small>Created by: <i>{deck?.user?.firstName} {deck?.user?.lastName} on {new Date(deck?.createdAt).toLocaleDateString()}</i></small></p>
                        {deck?.user?._id === user?._id ?
                            <Link className={"my-1"} to={`/deck/add_question/${params?.deckID}`}>
                                <Buttons className={"w-100"} btnText={"Add Questions"} variant={"primary"} />
                            </Link>
                            : null}
                        <Button className="btn btn-dark my-1 w-100">Run &#x25B6;</Button>
                    </Card.Body>
                </Card>
                {deck?.questions?.length >= 1 ? (
                    <Card className="my-3">
                        <Card.Header>
                            Questions
                        </Card.Header>
                        <Card.Body>
                            {deck?.questions?.map(q => (
                                <div key={q._id} className="my-3">
                                    <p className="py-0 my-0"><b>Q: {q?.question}</b></p>
                                    <p className="py-0 my-0"><b>A:</b> {q?.answer}</p>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                ) : null}

            </Container>
        </>
    )
}