import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import TestAPI from "../../API/tests";
import AppContext from "../../store/AppContext";
import { Helmet } from 'react-helmet';
import Buttons from "../../components/Buttons";
import Modals from "../../components/Modals";
import deleteSVG from "../../SVG/delete.svg";
import favorited from '../../SVG/favheart.svg'
import unfavorited from '../../SVG/openheart.svg'
import FavoriteAPI from "../../API/favorites";
export default function SeeTest() {
    const params = useParams();
    const navigate = useNavigate();
    const [test, setTest] = useState({});
    const [testsID, setTestsID] = useState("");
    const [questionID, setQuestionID] = useState("");
    const { setAppMsg, user, jwt } = useContext(AppContext);
    const [foundFavorite, setFoundFavorite] = useState(false);
    const [deleteTestModalShow, setDeleteTestModalShow] = useState(false);
    const [deleteQuestionModalShow, setDeleteQuestionModalShow] = useState(false);
    const getTest = useCallback(async (testID, userID) => {
        let res
        if (userID) res = await TestAPI.getTestById(testID, userID);
        else res = await TestAPI.getTestById(testID, "");
        if (res.status === 200) {
            setTest(res?.data?.test);
            if (res?.data?.favorite) setFoundFavorite(true);
        }
        else setAppMsg({ show: true, variant: "danger", text: res.response.data.msg });
    }, [setAppMsg])
    useEffect(() => {
        getTest(params?.testID, user?._id);
    }, [params?.testID, jwt, user?._id, getTest]);
    const handleClose = () => setDeleteQuestionModalShow(false);
    const handleTestModalClose = () => setDeleteTestModalShow(false);
    const handleQuestionDeleteClick = qid => {
        setQuestionID(qid);
        setDeleteQuestionModalShow(true);
    };
    const handleDeleteTestClick = did => {
        setTestsID(did);
        setDeleteTestModalShow(true);
    }
    // const handleSubmitDeleteQuestionClick = async () => {
    //     try {
    //         const res = await QuestionAPI.deleteQuestion(questionID, jwt);
    //         if (res.status === 200) {
    //             setDeleteQuestionModalShow(false);
    //             setTest(res.data.test);
    //         }
    //     } catch (e) {
    //         return e.message
    //     }
    // }
    const handleSubmitDeleteTestClick = async () => {
        try {
            const res = await TestAPI.deleteTestByTestID(testsID, jwt);
            if (res.status === 200) {
                navigate("/tests");
            }
        } catch (e) {
            return e.message;
        }
    }
    const handleFavoriteClick = useCallback(async testID => {
        try {
            const res = await FavoriteAPI.postFavoriteByUserIDAndDeckID(testID, jwt);
            if (res.status === 201) {
                const res = await TestAPI.getAllTests(user?._id);
                setFoundFavorite(true);
                if (res && res.status === 200) {
                    let res = await TestAPI.getTestById(testID, user?._id);
                    setTest(res.data.test);
                }
            }
        } catch (e) {
            return e.message;
        }
    }, [jwt, user?._id])
    const handleUnfavoriteClick = useCallback(async testID => {
        try {
            const res = await FavoriteAPI.deleteFavoriteByUserIDAndDeckID(testID, jwt);
            setFoundFavorite(false);
            if (res.status === 200) {
                let res = await TestAPI.getTestById(testID, user?._id);
                setTest(res.data.test);;
            }
        } catch (e) {
            return e.message;
        }
    }, [jwt, user?._id]);
    return (
        <>
            <Helmet>
                <title>Flash_App | {`${test?.name}`}</title>
            </Helmet>
            <Container>
                <Card className="my-3">
                    <Card.Header>
                        <div className="d-flex justify-content-between">
                            <h2>{test?.name}</h2>
                            <div>
                                {
                                    jwt && foundFavorite ? <img src={favorited} alt={"favorites-heart"} onClick={() => handleUnfavoriteClick(test?._id)} style={{ cursor: "pointer" }} />
                                        : jwt && !foundFavorite ? <img src={unfavorited} alt={"open-heart"} onClick={() => handleFavoriteClick(test?._id)} style={{ cursor: "pointer" }} />
                                            : null}
                            </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <p><small>{test?.isForAdults ? "May not be for children" : null}</small></p>
                        <p>{test?.questions?.length} Questions</p>
                        <p>Description: {test?.description}</p>
                        <p><small>Created by: <i>{test?.user?.firstName} {test?.user?.lastName} on {new Date(test?.createdAt).toLocaleDateString()}</i></small></p>
                        {test?.user?._id === user?._id ?
                            <div className="d-flex justify-content-between my-1">
                                <Link to={`/test/add_test_question/${params?.testID}`}>
                                    <Buttons className={"w-100"} btnText={"Add Questions"} variant={"primary"} />
                                </Link>

                                <Buttons className={"w-100"} btnText={"Delete Test"} variant={"outline-danger"} onClick={() => handleDeleteTestClick(test?._id)} />

                            </div>
                            : null}
                        <Link to={`/test/run/${params?.testID}`}>
                            <Button className="btn btn-dark my-1 w-100">Run &#x25B6;</Button>
                        </Link>
                    </Card.Body>
                </Card>
                {test?.questions?.length >= 1 ? (
                    <Card className="my-3">
                        <Card.Header>
                            Questions
                        </Card.Header>
                        <Card.Body>
                            {test?.questions?.map(q => (
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
                // save={<Buttons btnText={"Delete"} variant={"danger"} onClick={handleSubmitDeleteQuestionClick} />}
                closeVariant={"none"}
                saveVariant={"none"}
            />
            <Modals
                title="Are you sure you want to delete this test?"
                show={deleteTestModalShow}
                close={<Buttons btnText={"Cancel"} onClick={handleTestModalClose} variant={"outline-danger"} />}
                save={<Buttons btnText={"Delete"} variant={"danger"} onClick={handleSubmitDeleteTestClick} />}
                closeVariant={"none"}
                saveVariant={"none"}
            />
        </>
    );
}