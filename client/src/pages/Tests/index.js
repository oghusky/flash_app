import { useContext, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import Buttons from "../../components/Buttons";
import AppContext from '../../store/AppContext';
import SearchInput from "../../components/SearchInput";
import favorited from '../../SVG/favheart.svg';
import unfavorited from '../../SVG/openWhiteHeart.svg';
import TestAPI from '../../API/tests';
import FavoriteAPI from '../../API/favorites';
export default function Tests() {
    const { tests, setTests, jwt, user } = useContext(AppContext);
    const getTest = useCallback(async userID => {
        try {
            if (userID) {
                const res = await TestAPI.getAllTests(userID);
                if (res && res.status === 200) setTests(res.data.tests);
            }
            const res = await TestAPI.getAllTests(userID);
            if (res && res.status === 200) setTests(res.data.tests);
        } catch (e) {
            return e.message;
        }
    }, [setTests])
    useEffect(() => {
        getTest(user?._id);
    }, [user?._id, getTest])
    const handleFavoriteClick = async testID => {
        try {
            const res = await FavoriteAPI.postFavoriteByUserIDAndDeckID({ testID }, jwt);
            if (res.status === 201) {
                const res = await TestAPI.getAllTests(user?._id);
                if (res && res.status === 200) {
                    setTests(res.data.tests);
                }
            }
        } catch (e) {
            return e.message;
        }
    }
    const handleUnfavoriteClick = async testID => {
        try {
            const res = await FavoriteAPI.deleteFavoriteByUserIDAndDeckID({ testID }, jwt);
            if (res.status === 200) {
                const res = await TestAPI.getAllTests(user?._id);
                if (res && res.status === 200) setTests(res.data.tests);
            }
        } catch (e) {
            return e.message;
        }
    }
    return (
        <>
            <Helmet><title>Flash_App | Tests</title></Helmet>
            <Container fluid>
                <div className='d-flex justify-content-around align-items-center'>
                    {
                        jwt ? <Link to="/create_test" className='text-center'>
                            <Buttons btnText={"Create"} btnAlign={"center"} variant={"dark"} className={"my-3"} />
                        </Link> : <Link to={"#"} className='text-center' ><Buttons btnText={"Login"} className={"my-3"} disabled /></Link>
                    }
                    <div>
                        <SearchInput />
                    </div>
                </div>
                <Row>
                    {tests?.map(test => (
                        <Col key={test?._id} lg={3} md={4} sm={6} xs={12} className={"my-2"}>
                            <div className='p-3' style={{ borderRadius: "10px 10px 10px 10px", backgroundColor: "#000", border: "1px solid rgba(0,0,0,0.15)" }}>
                                <div className='d-flex justify-content-between'>
                                    <p className='mb-0 pb-0' style={{ color: "#fff" }}><b>{test?.name}</b></p>
                                    {
                                        test?.isForAdults ?
                                            <p style={{ borderRadius: "50%", padding: "3px 4px" }}><b>18+</b></p>
                                            : <p style={{ backgroundColor: "#357bff", color: "#fff", borderRadius: "50%", padding: "3px 8px" }} ><b>{test?.user?.userName?.charAt(0).toUpperCase()}</b></p>
                                    }
                                </div>
                                {
                                    jwt && test?.isFavorited ?
                                        <div className='favorites-heart' onClick={() => handleUnfavoriteClick(test?._id)} style={{ cursor: "pointer" }}>
                                            <img src={favorited} alt={"favorited-heart"} />
                                        </div>
                                        : jwt && !test?.isFavorited ?
                                            <div className='favorites-heart' onClick={() => handleFavoriteClick(test?._id)} style={{ cursor: "pointer" }} >
                                                <img src={unfavorited} alt={"open-heart"} />
                                            </div>
                                            : null
                                }
                                <div className='d-flex justify-content-between mt-3'>
                                    <Link to={`/test/id/${test?._id}`}>
                                        <Buttons size={"sm"} btnText={"Preview"} variant={"primary"} />
                                    </Link>
                                    <Buttons size={"sm"} btnText={`${test?.questions?.length} ${test?.questions.length === 1 ? "Item" : "Items"}`} variant={"dark"} disabled />
                                </div>
                                <Link to={`/user/id/${test?.user._id}`} style={{ textDecoration: "none", color: "#fff" }}>
                                    <p className={"mt-3 mb-0 text"}>{test?.user?.userName ? `${test?.user?.userName}` : `${test?.user?.firstName} ${test?.user?.lastName}`}</p>
                                </Link>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}