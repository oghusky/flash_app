import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AppContext from "../../store/AppContext";
import { Container } from "react-bootstrap";
import Buttons from "../../components/Buttons";
import UserAPI from "../../API/users";
import { Helmet } from "react-helmet";
export default function UserProfile() {
    const params = useParams();
    const { jwt } = useContext(AppContext);
    const [profile, setProfile] = useState({});
    const getUserInfo = async (id, jwt) => {
        try {
            const res = await UserAPI.getUserByID(id, jwt);
            return res.status === 200 ? setProfile(res.data.user) : null;
        } catch (e) {
            return e.message
        }
    }
    useEffect(() => {
        getUserInfo(params?.userID, jwt);
    }, [params, jwt]);

    return (
        <>
            <Helmet><title>{`Flash_App | ${profile?.userName}'s Profile`}</title></Helmet>
            <Container>
                <div className="my-3 p-3" style={{ backgroundColor: "#fff", borderRadius: "10px 10px 10px 10px" }}>
                    <div className="d-flex justify-content-between">
                        <h2>{profile?.userName}</h2>
                        <Link to={`/user/edit/${profile?._id}`}>
                            <Buttons btnText={"Edit Profile"} variant={"outline-primary"} />
                        </Link>
                    </div>
                    <p>Member since {new Date(profile?.createdAt).toLocaleDateString()}</p>
                </div>
            </Container>
        </>
    );
}