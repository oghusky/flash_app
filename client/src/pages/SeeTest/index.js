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
    const [deleteDeckModalShow, setDeleteDeckModalShow] = useState(false);
    const [deleteQuestionModalShow, setDeleteQuestionModalShow] = useState(false);
    return (
        <div>See Test</div>
    );
}