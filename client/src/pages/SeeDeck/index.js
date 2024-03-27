import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import DeckAPI from "../../API/decks";
import AppContext from "../../store/AppContext";
import { Helmet } from 'react-helmet';
import Buttons from "../../components/Buttons";
import Modals from "../../components/Modals";
import QuestionAPI from "../../API/questions";
import deleteSVG from "../../SVG/delete.svg";
export default function SeeDeck() {
    const params = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState({});
    const [questionID, setQuestionID] = useState("");
    const { setAppMsg, user, jwt } = useContext(AppContext);
    const [deleteQuestionModalShow, setDeleteQuestionModalShow] = useState(false);
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
    const handleClose = () => setDeleteQuestionModalShow(false);
    const handleQuestionDeleteClick = qid => {
        setQuestionID(qid);
        setDeleteQuestionModalShow(true);
    };
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
    const handleDeleteDeckClick = did => {
        console.log("Delete Deck: ", did)
    }
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
                            <div className="d-flex justify-content-between my-1">
                                <Link to={`/deck/add_question/${params?.deckID}`}>
                                    <Buttons className={"w-100"} btnText={"Add Questions"} variant={"primary"} />
                                </Link>
                                <Buttons className={"w-100"} btnText={"Delete Deck"} variant={"outline-danger"} onClick={() => handleDeleteDeckClick(deck?._id)} />
                            </div>
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
        </>
    )
}