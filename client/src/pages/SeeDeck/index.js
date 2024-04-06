import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import DeckAPI from "../../API/decks";
import AppContext from "../../store/AppContext";
import { Helmet } from 'react-helmet';
import Buttons from "../../components/Buttons";
import Modals from "../../components/Modals";
import QuestionAPI from "../../API/questions";
import deleteSVG from "../../SVG/delete.svg";
import favorited from '../../SVG/favheart.svg'
import unfavorited from '../../SVG/openheart.svg'
import FavoriteAPI from "../../API/favorites";
export default function SeeDeck() {
    const params = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState({});
    const [decksID, setDecksID] = useState("");
    const [questionID, setQuestionID] = useState("");
    const { setAppMsg, user, jwt } = useContext(AppContext);
    const [foundFavorite, setFoundFavorite] = useState(false);
    const [deleteDeckModalShow, setDeleteDeckModalShow] = useState(false);
    const [deleteQuestionModalShow, setDeleteQuestionModalShow] = useState(false);
    const getDeck = useCallback(async (deckID, userID) => {
        let res
        if (userID) res = await DeckAPI.getDeckByDeckID(deckID, userID);
        else res = await DeckAPI.getDeckByDeckID(deckID, "");
        if (res.status === 200) {
            setDeck(res.data.deck);
            if (res?.data?.favorite) setFoundFavorite(true);
        }
        else setAppMsg({ show: true, variant: "danger", text: res.response.data.msg });
    }, [setAppMsg])
    useEffect(() => {
        getDeck(params?.deckID, user?._id);
    }, [params?.deckID, jwt, user?._id, getDeck]);
    const handleClose = () => setDeleteQuestionModalShow(false);
    const handleDeckModalClose = () => setDeleteDeckModalShow(false);
    const handleQuestionDeleteClick = qid => {
        setQuestionID(qid);
        setDeleteQuestionModalShow(true);
    };
    const handleDeleteDeckClick = did => {
        setDecksID(did);
        setDeleteDeckModalShow(true);
    }
    const handleSubmitDeleteQuestionClick = async () => {
        try {
            const res = await QuestionAPI.deleteQuestion(questionID, jwt);
            if (res.status === 200) {
                setDeleteQuestionModalShow(false);
                setDeck(res.data.deck);
            }
        } catch (e) {
            return e.message
        }
    }
    const handleSubmitDeleteDeckClick = async () => {
        try {
            const res = await DeckAPI.deleteDeckByDeckID(decksID, jwt);
            if (res.status === 200) {
                navigate("/decks");
            }
        } catch (e) {
            return e.message;
        }
    }
    const handleFavoriteClick = useCallback(async deckID => {
        try {
            const res = await FavoriteAPI.postFavoriteByUserIDAndDeckID({ deckID }, jwt);
            if (res.status === 201) {
                const res = await DeckAPI.getAllDecks(user?._id);
                setFoundFavorite(true);
                if (res && res.status === 200) {
                    let res = await DeckAPI.getDeckByDeckID(deckID, user?._id);
                    setDeck(res.data.deck);
                }
            }
        } catch (e) {
            return e.message;
        }
    }, [jwt, user?._id])
    const handleUnfavoriteClick = useCallback(async deckID => {
        try {
            const res = await FavoriteAPI.deleteFavoriteByUserIDAndDeckID({ deckID }, jwt);
            setFoundFavorite(false);
            if (res.status === 200) {
                let res = await DeckAPI.getDeckByDeckID(deckID, user?._id);
                setDeck(res.data.deck);;
            }
        } catch (e) {
            return e.message;
        }
    }, [jwt, user?._id])
    return (
        <>
            <Helmet>
                <title>Flash_App | {`${deck?.name}`}</title>
            </Helmet>
            <Container>
                <Card className="my-3">
                    <Card.Header>
                        <div className="d-flex justify-content-between">
                            <h2>{deck?.name}</h2>
                            <div>
                                {
                                    jwt && foundFavorite ? <img src={favorited} alt={"favorites-heart"} onClick={() => handleUnfavoriteClick(deck?._id)} style={{ cursor: "pointer" }} />
                                        : jwt && !foundFavorite ? <img src={unfavorited} alt={"open-heart"} onClick={() => handleFavoriteClick(deck?._id)} style={{ cursor: "pointer" }} />
                                            : null}
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <p><small>{deck?.isForAdults ? "May not be for children" : null}</small></p>
                        <p>{deck?.questions?.length} Questions</p>
                        <p>Description: {deck?.description}</p>
                        <p><small>Created by: <i>{deck?.user?.firstName} {deck?.user?.lastName} on {new Date(deck?.createdAt).toLocaleDateString()}</i></small></p>
                        {deck?.user?._id === user?._id ?
                            <div className="d-flex justify-content-between my-1">
                                <Link to={`/deck/add_question/${params?.deckID}`}>
                                    <Buttons className={"w-100"} btnText={"Add Questions"} variant={"primary"} />
                                </Link>

                                <Buttons className={"w-100"} btnText={"Delete Deck"} variant={"outline-danger"} onClick={() => handleDeleteDeckClick(deck?._id)} />

                            </div>
                            : null}
                        <Link to={`/deck/run/${params?.deckID}`}>
                            <Button className="btn btn-dark my-1 w-100">Run &#x25B6;</Button>
                        </Link>
                    </Card.Body>
                </Card>
                {deck?.questions?.length >= 1 ? (
                    <Card className="my-3">
                        <Card.Header>
                            Questions
                        </Card.Header>
                        <Card.Body>
                            {deck?.questions?.map(q => (
                                <div key={q._id} className="my-3 d-flex">
                                    <div className="flex-grow-1">
                                        <p className="py-0 my-0"><b>Q: {q?.question}</b></p>
                                        <p className="py-0 my-0"><b>A:</b> {q?.answer}</p>
                                    </div>
                                    {q.user === user._id ?
                                        <>
                                            <Button variant={"light"} onClick={() => handleQuestionDeleteClick(q._id)} className={"ml-1"}>
                                                <img src={deleteSVG} alt={"Delete SVG"} className={"p-3"} />
                                            </Button>
                                        </>
                                        : null}
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                ) : null}
            </Container>
            <Modals
                title="Are you sure you want to delete this question?"
                show={deleteQuestionModalShow}
                close={<Buttons btnText={"Cancel"} onClick={handleClose} variant={"outline-danger"} />}
                save={<Buttons btnText={"Delete"} variant={"danger"} onClick={handleSubmitDeleteQuestionClick} />}
                closeVariant={"none"}
                saveVariant={"none"}
            />
            <Modals
                title="Are you sure you want to delete this deck?"
                show={deleteDeckModalShow}
                close={<Buttons btnText={"Cancel"} onClick={handleDeckModalClose} variant={"outline-danger"} />}
                save={<Buttons btnText={"Delete"} variant={"danger"} onClick={handleSubmitDeleteDeckClick} />}
                closeVariant={"none"}
                saveVariant={"none"}
            />
        </>
    )
}